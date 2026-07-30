import { marked } from 'marked';

// Configure marked for proper rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function markdownToHtml(markdown: string): string {
  // Replace 'nn' with actual newlines (fix for stored content)
  let cleanMarkdown = markdown.replace(/nn/g, '\n\n');

  // Also handle escaped newlines
  cleanMarkdown = cleanMarkdown.replace(/\\n\\n/g, '\n\n');
  cleanMarkdown = cleanMarkdown.replace(/\\n/g, '\n');

  return marked.parse(cleanMarkdown) as string;
}
