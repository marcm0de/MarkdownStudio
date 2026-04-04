'use client';

import { useRef, useCallback, useState } from 'react';
import { useEditorStore } from '@/store/editor';
import Editor from './Editor';
import Preview from './Preview';

export default function SplitPane() {
  const { splitRatio, setSplitRatio, showPreview } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        setSplitRatio(ratio);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [setSplitRatio]
  );

  if (!showPreview) {
    return (
      <div className="flex-1 overflow-hidden">
        <Editor />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
      {/* Editor pane */}
      <div
        className="h-full overflow-hidden"
        style={{ width: `${splitRatio * 100}%` }}
      >
        <Editor />
      </div>

      {/* Resizable divider */}
      <div
        className={`w-1.5 cursor-col-resize flex-shrink-0 transition-all duration-150 relative group/divider ${
          isDragging
            ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
            : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 hover:w-2 hover:shadow-[0_0_6px_rgba(59,130,246,0.3)]'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1 ${isDragging ? 'opacity-100' : 'opacity-0 group-hover/divider:opacity-100'} transition-opacity`}>
          <div className="w-0.5 h-1 rounded-full bg-white/60" />
          <div className="w-0.5 h-1 rounded-full bg-white/60" />
          <div className="w-0.5 h-1 rounded-full bg-white/60" />
        </div>
      </div>

      {/* Preview pane */}
      <div className="h-full overflow-hidden flex-1">
        <Preview />
      </div>

      {/* Drag overlay to prevent text selection */}
      {isDragging && (
        <div className="absolute inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
}
