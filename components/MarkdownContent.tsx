import type { ReactNode } from "react";
function inline(text: string): ReactNode[] {
  const parts = text.split(
    /(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\(https?:\/\/[^)]+\))/g,
  );
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("_") && part.endsWith("_"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (m)
      return (
        <a key={i} href={m[2]} target="_blank" rel="noreferrer">
          {m[1]}
        </a>
      );
    return part;
  });
}
export default function MarkdownContent({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith("## "))
          return <h2 key={i}>{inline(block.slice(3))}</h2>;
        if (block.startsWith("> "))
          return <blockquote key={i}>{inline(block.slice(2))}</blockquote>;
        const lines = block.split("\n");
        if (lines.every((x) => x.startsWith("- ")))
          return (
            <ul key={i}>
              {lines.map((x, j) => (
                <li key={j}>{inline(x.slice(2))}</li>
              ))}
            </ul>
          );
        return (
          <p key={i}>
            {lines.map((x, j) => (
              <span key={j}>
                {inline(x)}
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}
