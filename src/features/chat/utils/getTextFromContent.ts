import type { JSONContent } from "@tiptap/react";

const getNodeText = (node: JSONContent): string => {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "mention") {
    return `@${node.attrs?.label ?? node.attrs?.id ?? ""}`;
  }
  return (node.content ?? []).map(getNodeText).join("");
};

// Mỗi paragraph tương ứng một dòng
export const getTextFromContent = (content: JSONContent | null): string => {
  if (!content) return "";
  return (content.content ?? []).map(getNodeText).join("\n");
};
