'use client';

import { useEffect } from 'react';
import { useEditorStore } from '@/store/editor';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderBar from './HeaderBar';
import Tabs from './Tabs';
import SplitPane from './SplitPane';
import StatusBar from './StatusBar';

export default function MarkdownStudio() {
  const { init, isDistractionFree, toggleDistractionFree } = useEditorStore();

  useEffect(() => {
    init();
  }, [init]);

  // Escape key exits distraction-free mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDistractionFree) {
        toggleDistractionFree();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isDistractionFree, toggleDistractionFree]);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      <AnimatePresence>
        {!isDistractionFree && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HeaderBar />
            <Tabs />
          </motion.div>
        )}
      </AnimatePresence>

      <SplitPane />

      <AnimatePresence>
        {!isDistractionFree && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <StatusBar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
