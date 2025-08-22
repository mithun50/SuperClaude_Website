import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-muted border border-border rounded-lg font-mono text-sm relative my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-border rounded-t-lg">
        <span className="text-muted-foreground text-xs font-sans">{language}</span>
        <button
          onClick={handleCopy}
          className="bg-gray-200 hover:bg-gray-300 text-foreground px-2 py-1 rounded text-xs flex items-center"
        >
          {copied ? (
            <>
              <Check size={14} className="mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Clipboard size={14} className="mr-1" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 whitespace-pre-wrap break-words overflow-x-hidden">{value}</pre>
    </div>
  );
}

export default CodeBlock;
