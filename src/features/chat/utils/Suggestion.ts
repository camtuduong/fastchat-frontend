import { ReactRenderer } from "@tiptap/react";
import { PluginKey } from "@tiptap/pm/state";
import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import {
  MentionList,
  type MentionListHandle,
} from "@/features/chat/components/Conversation/MentionList";
import { normalizeText } from "@/features/chat/constant";

const mentionPluginKey = new PluginKey("mention-suggestion");

export type MentionItem = {
  id: string;
  label: string;
  avatarUrl?: string;
};

export type MentionAttrs = { id: string | null; label?: string | null };

const MAX_SUGGESTIONS = 5;

// Bỏ dấu để gõ "van" vẫn tìm được "Văn"

// getItems được gọi mỗi lần user gõ, nên luôn đọc được dữ liệu mới nhất.
// onOpenChange báo popup đang hiển thị danh sách có kết quả hay không.
export const createSuggestion = (
  getItems: () => MentionItem[],
  onOpenChange?: (open: boolean) => void,
): Omit<SuggestionOptions<MentionItem, MentionAttrs>, "editor"> => ({
  pluginKey: mentionPluginKey,
  items: ({ query }) => {
    const keyword = normalizeText(query);
    return getItems()
      .filter((item) => normalizeText(item.label).includes(keyword))
      .slice(0, MAX_SUGGESTIONS);
  },

  render: () => {
    let reactRenderer:
      | ReactRenderer<
          MentionListHandle,
          SuggestionProps<MentionItem, MentionAttrs>
        >
      | undefined;

    const cleanup = () => {
      if (!reactRenderer) return;

      const element = reactRenderer.element;

      reactRenderer.destroy();
      element.remove();
      reactRenderer = undefined;
      onOpenChange?.(false);
    };

    return {
      onStart: (props: SuggestionProps<MentionItem, MentionAttrs>) => {
        const container = props.editor.view.dom.closest("[data-chat-input]");
        if (!container) return;

        reactRenderer = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        // Popup nằm phía trên và rộng bằng khung nhập
        Object.assign(reactRenderer.element.style, {
          position: "absolute",
          bottom: "100%",
          left: "0",
          width: "100%",
          marginBottom: "8px",
          zIndex: "50",
        });

        // Gắn ra ngoài khung nhập (đang overflow-y-auto) để popup không bị cắt
        (container.parentElement ?? container).appendChild(
          reactRenderer.element,
        );
        onOpenChange?.(props.items.length > 0);
      },

      onUpdate: (props: SuggestionProps<MentionItem, MentionAttrs>) => {
        reactRenderer?.updateProps(props);
        if (reactRenderer) onOpenChange?.(props.items.length > 0);
      },

      onKeyDown: (props) => {
        if (props.event.key === "Escape") {
          cleanup();
          return true;
        }

        return reactRenderer?.ref?.onKeyDown(props) ?? false;
      },

      onExit: cleanup,
    };
  },
});
