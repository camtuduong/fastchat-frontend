import type { JSONContent } from "@tiptap/react";

const getNodeText = (node: JSONContent): string => {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "mention") {
    return `@${node.attrs?.label ?? node.attrs?.id ?? ""}`;
  }
  return (node.content ?? []).map(getNodeText).join("");
};

const isEmptyParagraph = (node: JSONContent): boolean =>
  node.type === "paragraph" && getNodeText(node).trim() === "";

// Bỏ các paragraph rỗng ở đầu và cuối, giữ nguyên các node khác
export const trimEmptyParagraphs = (content: JSONContent): JSONContent => {
  if (!content.content) return content;
  const nodes = content.content;
  let start = 0;
  let end = nodes.length;
  while (start < end && isEmptyParagraph(nodes[start])) start++;
  while (end > start && isEmptyParagraph(nodes[end - 1])) end--;
  return { ...content, content: nodes.slice(start, end) };
};

// Mỗi paragraph tương ứng một dòng
export const getTextFromContent = (content: JSONContent | null): string => {
  if (!content) return "";
  return (content.content ?? []).map(getNodeText).join("\n");
};
