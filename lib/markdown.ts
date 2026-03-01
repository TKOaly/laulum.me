import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";

const STRICT_SANITIZE_SCHEMA = {
  tagNames: [
    "a",
    "blockquote",
    "br",
    "code",
    "del",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "li",
    "ol",
    "p",
    "pre",
    "strong",
    "table",
    "tbody",
    "td",
    "th",
    "thead",
    "tr",
    "ul",
  ],
  attributes: {
    a: ["href", "title"],
  },
  protocols: {
    href: ["http", "https"],
  },
};

export const renderMarkdownToSafeHtml = async (markdown: string) => {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, {
      sanitize: STRICT_SANITIZE_SCHEMA,
    })
    .process(markdown);

  return processedContent.toString();
};
