"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Import KaTeX and mhchem extension
// This ensures \ce is available in the KaTeX instance used by rehype-katex
import "katex/dist/contrib/mhchem";

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

/**
 * Reusable Markdown renderer with support for:
 * - GFM (Tables, task lists, etc.)
 * - Math (LaTeX using KaTeX)
 * - Chemistry (mhchem extension via \ce{...})
 */
export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]} 
        rehypePlugins={[
          [rehypeKatex, {
            // KaTeX options
            trust: true,
            strict: false,
            // Fallback for \ce if mhchem somehow fails to load
            macros: {
              "\\ce": "#1" 
            }
          }]
        ]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
