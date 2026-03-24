'use client';

import { useState } from 'react';
import { useEditorStore } from '@/store/editor';
import { Plus, X } from 'lucide-react';

export default function Tabs() {
  const { documents, activeDocumentId, setActiveDocument, createDocument, deleteDocument, updateTitle } =
    useEditorStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleDoubleClick = (id: string, title: string) => {
    setEditingId(id);
    setEditValue(title);
  };

  const handleRename = (id: string) => {
    if (editValue.trim()) {
      updateTitle(id, editValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="flex items-center gap-0 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 overflow-x-auto">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={`group flex items-center gap-1 px-3 py-2 text-sm cursor-pointer border-r border-gray-200 dark:border-gray-700 transition-colors select-none ${
            doc.id === activeDocumentId
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/80'
          }`}
          onClick={() => setActiveDocument(doc.id)}
          onDoubleClick={() => handleDoubleClick(doc.id, doc.title)}
        >
          {editingId === doc.id ? (
            <input
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => handleRename(doc.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename(doc.id);
                if (e.key === 'Escape') setEditingId(null);
              }}
              className="bg-transparent border-b border-blue-500 outline-none text-sm w-24"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate max-w-[120px]">{doc.title}</span>
          )}
          {documents.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteDocument(doc.id);
              }}
              className="ml-1 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
            >
              <X size={12} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => createDocument()}
        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        title="New Document"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
