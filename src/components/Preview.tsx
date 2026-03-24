'use client';

import { useMemo } from 'react';
import { useEditorStore } from '@/store/editor';
import { renderMarkdown } from '@/lib/markdown';

export default function Preview() {
  const { documents, activeDocumentId } = useEditorStore();
  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  const html = useMemo(() => {
    if (!activeDoc) return '';
    return renderMarkdown(activeDoc.content);
  }, [activeDoc]);

  if (!activeDoc) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-600">
        No document selected
      </div>
    );
  }

  return (
    <div
      id="markdown-preview"
      className="prose dark:prose-invert prose-sm sm:prose-base max-w-none p-6 overflow-auto h-full bg-white dark:bg-gray-900"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
