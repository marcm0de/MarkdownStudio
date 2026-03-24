export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export type Theme = 'light' | 'dark';

export interface EditorState {
  documents: Document[];
  activeDocumentId: string | null;
  theme: Theme;
  isDistractionFree: boolean;
  splitRatio: number; // 0.0 to 1.0, percentage for editor pane
  showPreview: boolean;
}
