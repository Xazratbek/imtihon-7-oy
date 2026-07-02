import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components = {
  h1: ({ children }) => <h1 className="mb-3 mt-6 text-xl font-bold text-gray-900 first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-2 mt-5 text-lg font-bold text-gray-900 first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 mt-4 text-base font-semibold text-gray-900 first:mt-0">{children}</h3>,
  p: ({ children }) => <p className="mb-3 leading-relaxed text-gray-600 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5 text-gray-600">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5 text-gray-600">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  hr: () => <hr className="my-4 border-gray-200" />,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-gray-900 underline underline-offset-2">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="mb-3 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-left font-medium text-gray-700">{children}</th>,
  td: ({ children }) => <td className="border-b border-gray-100 px-3 py-2 text-gray-600">{children}</td>,
  code: ({ inline, className, children }) =>
    inline ? (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[13px] text-gray-800">{children}</code>
    ) : (
      <code className={`block font-mono text-[13px] text-gray-800 ${className || ""}`}>{children}</code>
    ),
  pre: ({ children }) => (
    <pre className="mb-3 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4">{children}</pre>
  ),
};

export default function Markdown({ children }) {
  return (
    <div className="text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
