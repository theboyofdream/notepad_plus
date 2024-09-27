import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(editor)/Editor')({
  component: () => <div>Hello /(editor)/Editor!</div>,
})
