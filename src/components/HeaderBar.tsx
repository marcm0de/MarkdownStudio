'use client';

import { useEditorStore } from '@/store/editor';
import {
  Sun,
  Moon,
  Maximize,
  Minimize,
  Eye,
  EyeOff,
  Download,
  Copy,
  Printer,
  FileText,
} from 'lucide-react';
import { renderMarkdown } from '@/lib/markdown';

export default function HeaderBar() {
  const { theme, toggleTheme, isDistractionFree, toggleDistractionFree, showPreview, togglePreview, documents, activeDocumentId } =
    useEditorStore();

  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  const exportMd = () => {
    if (!activeDoc) return;
    const blob = new Blob([activeDoc.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeDoc.title}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyHtml = async () => {
    if (!activeDoc) return;
    const html = renderMarkdown(activeDoc.content);
    try {
      await navigator.clipboard.writeText(html);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = html;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  const printPdf = () => {
    const preview = document.getElementById('markdown-preview');
    if (!preview) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${activeDoc?.title || 'Document'}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1a1a1a; line-height: 1.6; }
            pre { background: #f5f5f5; padding: 16px; border-radius: 6px; overflow-x: auto; }
            code { font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.9em; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
            th { background: #f5f5f5; }
            img { max-width: 100%; }
            blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 16px; color: #555; }
          </style>
        </head>
        <body>${preview.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <FileText size={20} className="text-blue-500" />
        <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          MarkdownStudio
        </h1>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={copyHtml}
          title="Copy as HTML"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <Copy size={16} />
        </button>
        <button
          onClick={exportMd}
          title="Download .md"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <Download size={16} />
        </button>
        <button
          onClick={printPdf}
          title="Print / Save as PDF"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <Printer size={16} />
        </button>
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button
          onClick={togglePreview}
          title={showPreview ? 'Hide Preview' : 'Show Preview'}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        <button
          onClick={toggleDistractionFree}
          title={isDistractionFree ? 'Exit Focus Mode' : 'Focus Mode'}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          {isDistractionFree ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </header>
  );
}
