import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(editor)/EditorHeader')({
  component: () => <div>Hello /(editor)/Header!</div>,
})
