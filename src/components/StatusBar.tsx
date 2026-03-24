'use client';

import { useEditorStore } from '@/store/editor';
import { getWordCount, getCharCount, getReadingTime } from '@/lib/markdown';

export default function StatusBar() {
  const { documents, activeDocumentId } = useEditorStore();
  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  if (!activeDoc) return null;

  const words = getWordCount(activeDoc.content);
  const chars = getCharCount(activeDoc.content);
  const readTime = getReadingTime(activeDoc.content);

  return (
    <div className="flex items-center justify-between px-4 py-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 select-none">
      <div className="flex items-center gap-4">
        <span>{words} words</span>
        <span>{chars} characters</span>
        <span>{readTime}</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Markdown</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
