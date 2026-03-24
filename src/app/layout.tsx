import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MarkdownStudio — Distraction-Free Markdown Editor',
  description:
    'A beautiful, focused Markdown editor with live preview, syntax highlighting, and multiple document support.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
