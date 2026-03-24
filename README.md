# MarkdownStudio ✨

A beautiful, distraction-free Markdown editor with live preview.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Split pane editor** — Write on the left, preview on the right with a resizable divider
- **Full Markdown support** — Tables, code blocks, images, links, and more (GFM)
- **Syntax highlighting** — Code blocks highlighted via highlight.js
- **Multiple documents** — Open multiple files as tabs, double-click to rename
- **Auto-save** — Content saved to localStorage every 5 seconds
- **Distraction-free mode** — Hide all UI except the editor, press Escape to exit
- **Word count & stats** — Words, characters, and reading time in the status bar
- **Formatting toolbar** — Bold, italic, headings, links, code, lists, and more
- **Export options** — Copy as HTML, print as PDF, download as `.md`
- **Dark/Light mode** — Toggle between themes
- **Keyboard shortcuts** — `Ctrl+B` bold, `Ctrl+I` italic, `Ctrl+S` save, `Ctrl+K` link

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/MarkdownStudio.git
cd MarkdownStudio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **State:** Zustand
- **Markdown:** Marked + highlight.js
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/⌘ + B` | Bold |
| `Ctrl/⌘ + I` | Italic |
| `Ctrl/⌘ + S` | Save |
| `Ctrl/⌘ + K` | Insert link |
| `Tab` | Indent |
| `Escape` | Exit focus mode |

## Storage

All documents are stored in `localStorage`. No server, no database, no account required. Your data stays in your browser.

## License

[MIT](LICENSE) — do whatever you want with it.
