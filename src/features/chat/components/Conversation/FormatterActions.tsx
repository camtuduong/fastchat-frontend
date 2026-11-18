import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Link,
  ChevronsLeftRight,
  Quote,
  List,
  ListOrdered,
  CircleAlert,
} from "lucide-react";

type Props = {
  editorRef?: React.RefObject<Editor | null>;
};
const Style = {
  buttonStyle: (isActive?: boolean) =>
    cn(
      "cursor-pointer items-center hover:bg-composer-action-hover rounded-md bg-transparent p-2 text-composer-icon transition-colors duration-100 hover:text-composer-icon-hover [&_svg]:size-4",
      isActive ? "bg-composer-action-hover text-composer-icon-hover" : "",
    ),
};

export const FormatterActions = ({ editorRef }: Props) => {
  const active = useEditorState({
    editor: editorRef?.current ?? null,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      strike: editor?.isActive("strike") ?? false,
      link: editor?.isActive("link") ?? false,
      code: editor?.isActive("code") ?? false,
      blockquote: editor?.isActive("blockquote") ?? false,
      bulletList: editor?.isActive("bulletList") ?? false,
      orderedList: editor?.isActive("orderedList") ?? false,
    }),
  });

  const handleMarkActive = (mark: string) => {
    switch (mark) {
      case "bold":
        editorRef?.current?.chain().focus().toggleBold().run();
        break;
      case "italic":
        editorRef?.current?.chain().focus().toggleItalic().run();
        break;
      case "strike":
        editorRef?.current?.chain().focus().toggleStrike().run();
        break;
      case "link":
        editorRef?.current?.chain().focus().toggleLink().run();
        break;
      case "code":
        editorRef?.current?.chain().focus().toggleCode().run();
        break;
      case "blockquote":
        editorRef?.current?.chain().focus().toggleBlockquote().run();
        break;
      case "bulletList":
        editorRef?.current?.chain().focus().toggleBulletList().run();
        break;
      case "orderedList":
        editorRef?.current?.chain().focus().toggleOrderedList().run();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-1 transition duration-500 ease-in-out">
      <div className="flex gap-1">
        <button
          type="button"
          className={Style.buttonStyle(active?.bold)}
          onClick={() => handleMarkActive("bold")}
        >
          <Bold strokeWidth={editorRef?.current?.isActive("bold") ? 3 : 2} />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(active?.italic)}
          onClick={() => handleMarkActive("italic")}
        >
          <Italic
            strokeWidth={editorRef?.current?.isActive("italic") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(active?.strike)}
          onClick={() => handleMarkActive("strike")}
        >
          <Strikethrough
            strokeWidth={editorRef?.current?.isActive("strike") ? 3 : 2}
          />
        </button>
      </div>
      <Separator
        orientation="vertical"
        className="data-vertical:self-center data-[orientation=vertical]:h-6"
      />
      <div className="flex gap-1">
        <button
          type="button"
          className={Style.buttonStyle(active?.link)}
          onClick={() => handleMarkActive("link")}
        >
          <Link strokeWidth={editorRef?.current?.isActive("link") ? 3 : 2} />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(active?.code)}
          onClick={() => handleMarkActive("code")}
        >
          <ChevronsLeftRight
            strokeWidth={editorRef?.current?.isActive("code") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(active?.blockquote)}
          onClick={() => handleMarkActive("blockquote")}
        >
          <Quote strokeWidth={active?.blockquote ? 3 : 2} />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(active?.bulletList)}
          onClick={() => handleMarkActive("bulletList")}
        >
          <List
            strokeWidth={editorRef?.current?.isActive("bulletList") ? 3 : 2}
          />
        </button>
        <button
          type="button"
          className={Style.buttonStyle(active?.orderedList)}
          onClick={() => handleMarkActive("orderedList")}
        >
          <ListOrdered strokeWidth={active?.orderedList ? 3 : 2} />
        </button>
      </div>
      <Separator
        orientation="vertical"
        className="data-vertical:self-center data-[orientation=vertical]:h-6"
      />
      <button type="button" className={Style.buttonStyle(false)}>
        <CircleAlert strokeWidth={2} />
      </button>
    </div>
  );
};
