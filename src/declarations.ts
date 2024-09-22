type fn<T = void, P = never> = (params: P) => T

type IFile = {
  id: string
  name: string
  extension: string
  contents: string
  path: string
  saved: boolean
}
