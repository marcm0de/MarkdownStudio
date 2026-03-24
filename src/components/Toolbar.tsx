'use client';

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
  Image,
} from 'lucide-react';

interface ToolbarProps {
  onInsert: (before: string, after?: string) => void;
}

const tools = [
  { icon: Bold, label: 'Bold (Ctrl+B)', before: '**', after: '**' },
  { icon: Italic, label: 'Italic (Ctrl+I)', before: '_', after: '_' },
  { icon: Heading1, label: 'Heading 1', before: '# ', after: '' },
  { icon: Heading2, label: 'Heading 2', before: '## ', after: '' },
  { icon: Heading3, label: 'Heading 3', before: '### ', after: '' },
  { icon: Link, label: 'Link', before: '[', after: '](url)' },
  { icon: Image, label: 'Image', before: '![alt](', after: ')' },
  { icon: Code, label: 'Inline Code', before: '`', after: '`' },
  { icon: List, label: 'Bullet List', before: '- ', after: '' },
  { icon: ListOrdered, label: 'Numbered List', before: '1. ', after: '' },
  { icon: Quote, label: 'Blockquote', before: '> ', after: '' },
  { icon: Minus, label: 'Horizontal Rule', before: '\n---\n', after: '' },
];

export default function Toolbar({ onInsert }: ToolbarProps) {
  return (
    <div className="flex items-center gap-0.5 px-2 py-1 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto">
      {tools.map((tool, i) => (
        <button
          key={i}
          onClick={() => onInsert(tool.before, tool.after)}
          title={tool.label}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex-shrink-0"
        >
          <tool.icon size={16} />
        </button>
      ))}
    </div>
  );
}
