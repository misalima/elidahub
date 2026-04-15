"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";

// Import KaTeX and mhchem extension
// This ensures \ce is available in the KaTeX instance used by rehype-katex
import "katex/dist/contrib/mhchem";

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

/**
 * Pre-processes raw question text so that HTML rendering faithfully reproduces
 * what the teacher typed:
 *
 * 1. Leading spaces → U+00A0 (non-breaking space) so indentation is preserved
 *    (e.g. "          JOÃOZINHO" stays centred).
 *
 * 2. Extra blank lines → lines containing U+00A0 so that multiple blank lines
 *    produce proportional vertical space. Markdown collapses any number of
 *    consecutive blank lines into a single paragraph break; by inserting a
 *    U+00A0 line for each extra blank line, `remark-breaks` will emit a <br>
 *    for each one, giving teachers full control over spacing.
 */
function preprocessText(text: string): string {
  // Step 1: leading spaces → non-breaking spaces
  const withNbsp = text
    .split("\n")
    .map((line) => {
      const match = line.match(/^( +)/);
      if (!match) return line;
      return "\u00A0".repeat(match[1].length) + line.slice(match[1].length);
    })
    .join("\n");

  // Step 2: every blank line → a line with U+00A0 so remark-breaks emits a
  // real <br>, creating a 1:1 mapping between blank lines typed and blank
  // lines rendered. "\n\n" (1 blank line) → "\n\u00A0\n" → <br>&nbsp;<br>.
  // For N blank lines, we get N U+00A0 lines → N visible blank lines.
  return withNbsp.replace(/\n(\n+)/g, (_match, extras: string) => {
    // First \n stays as-is (remark-breaks turns it into <br>).
    // Each additional \n becomes a U+00A0 line + \n so remark-breaks adds
    // another <br> for that line, making the blank line visible.
    return "\n" + "\u00A0\n".repeat(extras.length);
  });
}

/**
 * Reusable Markdown renderer with support for:
 * - GFM (Tables, task lists, etc.)
 * - Math (LaTeX using KaTeX)
 * - Chemistry (mhchem extension via \ce{...})
 * - Single line breaks rendered as <br> (remark-breaks)
 * - Leading spaces & extra blank lines preserved (preprocessText)
 */
export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
        rehypePlugins={[
          [rehypeKatex, {
            trust: true,
            strict: false,
            macros: {
              "\\ce": "#1"
            }
          }]
        ]}
      >
        {preprocessText(children)}
      </ReactMarkdown>
    </div>
  );
}
