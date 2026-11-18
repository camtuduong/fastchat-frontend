import { act } from "react";
import { createRoot } from "react-dom/client";
import type { Editor } from "@tiptap/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatInput } from "./ChatInput";

vi.mock("@/features/chat/utils/Suggestion", () => ({
  createSuggestion: () => ({ items: () => [] }),
}));

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

let root: ReturnType<typeof createRoot> | undefined;
let container: HTMLDivElement | undefined;

afterEach(async () => {
  await act(async () => root?.unmount());
  container?.remove();
});

async function mountEditor() {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  const editorRef: { current: Editor | null } = { current: null };
  const onSubmit = vi.fn();

  await act(async () => {
    root!.render(
      <ChatInput
        message={null}
        setMessage={vi.fn()}
        editorRef={editorRef}
        onSubmit={onSubmit}
      />,
    );
  });

  expect(editorRef.current).not.toBeNull();
  return { editor: editorRef.current!, onSubmit };
}

async function typeText(editor: Editor, text: string) {
  await act(async () => {
    for (const character of text) {
      const { from, to } = editor.state.selection;
      const handled = editor.view.someProp("handleTextInput", (handler) =>
        handler(editor.view, from, to, character, () =>
          editor.state.tr.insertText(character, from, to),
        ),
      );
      if (!handled) {
        editor.view.dispatch(editor.state.tr.insertText(character, from, to));
      }
    }
  });
}

describe("ChatInput markdown shortcuts", () => {
  it.each([
    ["> ", "blockquote", "blockquote"],
    ["# ", "heading", "h1"],
    ["- ", "bulletList", "ul"],
    ["1. ", "orderedList", "ol"],
  ])("converts %j in EditorContent", async (shortcut, nodeType, selector) => {
    const { editor } = await mountEditor();
    await typeText(editor, shortcut);

    expect(editor.getJSON().content?.[0].type).toBe(nodeType);
    expect(container?.querySelector(`.tiptap ${selector}`)).not.toBeNull();
  });

  it("preserves mentions, highlight and typography", async () => {
    const { editor } = await mountEditor();
    expect(editor.schema.nodes.mention).toBeDefined();
    expect(editor.schema.marks.highlight).toBeDefined();
    await typeText(editor, "==hello==");
    expect(container?.querySelector("mark")?.textContent).toBe("hello");

    await act(async () => {
      editor.commands.clearContent();
    });
    await typeText(editor, "(c)");
    expect(editor.getText()).toBe("\u00a9");
  });

  it("keeps Enter to submit and Shift+Enter to create a paragraph", async () => {
    const { editor, onSubmit } = await mountEditor();
    await typeText(editor, "hello");

    await act(async () => {
      editor.view.dom.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(editor.getJSON().content).toHaveLength(1);

    await act(async () => {
      editor.view.dom.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          shiftKey: true,
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(editor.getJSON().content).toHaveLength(2);
  });
});