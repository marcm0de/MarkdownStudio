import { create } from 'zustand';
import type { Document, Theme, EditorState } from '@/types';

const STORAGE_KEY = 'markdown-studio-state';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function createDocument(title?: string): Document {
  const now = Date.now();
  return {
    id: generateId(),
    title: title || 'Untitled',
    content: `# ${title || 'Untitled'}\n\nStart writing...`,
    createdAt: now,
    updatedAt: now,
  };
}

function loadState(): Partial<EditorState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveState(state: EditorState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        documents: state.documents,
        activeDocumentId: state.activeDocumentId,
        theme: state.theme,
        splitRatio: state.splitRatio,
        showPreview: state.showPreview,
      })
    );
  } catch {}
}

interface EditorActions {
  init: () => void;
  createDocument: (title?: string) => void;
  deleteDocument: (id: string) => void;
  setActiveDocument: (id: string) => void;
  updateContent: (content: string) => void;
  updateTitle: (id: string, title: string) => void;
  toggleTheme: () => void;
  toggleDistractionFree: () => void;
  setSplitRatio: (ratio: number) => void;
  togglePreview: () => void;
  save: () => void;
}

const defaultDoc = createDocument('Welcome');
defaultDoc.content = `# Welcome to MarkdownStudio ✨

A distraction-free Markdown editor with live preview.

## Features

- **Split pane** editor with live preview
- **Syntax highlighting** for code blocks
- **Multiple documents** with tabs
- **Auto-save** to localStorage
- **Dark/Light mode** toggle
- **Distraction-free** mode
- **Export** as HTML, PDF, or Markdown

## Try It Out

### Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

### Tables

| Feature | Status |
|---------|--------|
| Editor | ✅ |
| Preview | ✅ |
| Tabs | ✅ |
| Export | ✅ |

### Lists

1. Write markdown on the left
2. See the preview on the right
3. Use the toolbar for quick formatting
4. Press **Ctrl+B** for bold, **Ctrl+I** for italic

> "The best writing tool is the one that gets out of your way."

---

Happy writing! 🚀
`;

export const useEditorStore = create<EditorState & EditorActions>((set, get) => ({
  documents: [defaultDoc],
  activeDocumentId: defaultDoc.id,
  theme: 'light' as Theme,
  isDistractionFree: false,
  splitRatio: 0.5,
  showPreview: true,

  init: () => {
    const saved = loadState();
    if (saved.documents && saved.documents.length > 0) {
      set({
        documents: saved.documents,
        activeDocumentId: saved.activeDocumentId || saved.documents[0].id,
        theme: saved.theme || 'light',
        splitRatio: saved.splitRatio ?? 0.5,
        showPreview: saved.showPreview ?? true,
      });
    }
    // Apply theme
    const theme = saved.theme || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },

  createDocument: (title?: string) => {
    const doc = createDocument(title);
    set((state) => ({
      documents: [...state.documents, doc],
      activeDocumentId: doc.id,
    }));
    get().save();
  },

  deleteDocument: (id: string) => {
    const state = get();
    if (state.documents.length <= 1) return; // Keep at least one
    const filtered = state.documents.filter((d) => d.id !== id);
    const newActive =
      state.activeDocumentId === id ? filtered[0].id : state.activeDocumentId;
    set({ documents: filtered, activeDocumentId: newActive });
    get().save();
  },

  setActiveDocument: (id: string) => {
    set({ activeDocumentId: id });
    get().save();
  },

  updateContent: (content: string) => {
    set((state) => ({
      documents: state.documents.map((d) =>
        d.id === state.activeDocumentId
          ? { ...d, content, updatedAt: Date.now() }
          : d
      ),
    }));
  },

  updateTitle: (id: string, title: string) => {
    set((state) => ({
      documents: state.documents.map((d) =>
        d.id === id ? { ...d, title, updatedAt: Date.now() } : d
      ),
    }));
    get().save();
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return { theme: newTheme };
    });
    get().save();
  },

  toggleDistractionFree: () => {
    set((state) => ({ isDistractionFree: !state.isDistractionFree }));
  },

  setSplitRatio: (ratio: number) => {
    set({ splitRatio: Math.max(0.2, Math.min(0.8, ratio)) });
    get().save();
  },

  togglePreview: () => {
    set((state) => ({ showPreview: !state.showPreview }));
    get().save();
  },

  save: () => {
    saveState(get());
  },
}));
