'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useEditorStore } from '@/store/editor';
import Toolbar from './Toolbar';

export default function Editor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { documents, activeDocumentId, updateContent, save } = useEditorStore();
  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      save();
    }, 5000);
    return () => clearInterval(interval);
  }, [save]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      const textarea = textareaRef.current;
      if (!textarea) return;

      if (e.key === 'b') {
        e.preventDefault();
        insertAround('**', '**');
      } else if (e.key === 'i') {
        e.preventDefault();
        insertAround('_', '_');
      } else if (e.key === 's') {
        e.preventDefault();
        save();
      } else if (e.key === 'k') {
        e.preventDefault();
        insertAround('[', '](url)');
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save]);

  const insertAround = useCallback(
    (before: string, after: string = '') => {
      const textarea = textareaRef.current;
      if (!textarea || !activeDoc) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = activeDoc.content;
      const selected = text.slice(start, end);

      const newText =
        text.slice(0, start) + before + selected + after + text.slice(end);

      updateContent(newText);

      // Restore cursor position
      requestAnimationFrame(() => {
        textarea.focus();
        const newCursorPos = selected
          ? start + before.length + selected.length + after.length
          : start + before.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      });
    },
    [activeDoc, updateContent]
  );

  const handleInsert = useCallback(
    (before: string, after?: string) => {
      insertAround(before, after || '');
    },
    [insertAround]
  );

  // Handle tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea || !activeDoc) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = activeDoc.content;
      const newText = text.slice(0, start) + '  ' + text.slice(end);
      updateContent(newText);
      requestAnimationFrame(() => {
        textarea.setSelectionRange(start + 2, start + 2);
      });
    }
  };

  if (!activeDoc) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-600">
        No document selected
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Toolbar onInsert={handleInsert} />
      <textarea
        ref={textareaRef}
        value={activeDoc.content}
        onChange={(e) => updateContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 w-full resize-none p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm leading-relaxed outline-none placeholder-gray-400"
        placeholder="Start writing..."
        spellCheck={false}
      />
    </div>
  );
}
