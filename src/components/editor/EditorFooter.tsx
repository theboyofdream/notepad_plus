import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(editor)/EditorFooter')({
  component: () => <div>Hello /(editor)/EditorFooter!</div>,
})
