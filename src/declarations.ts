// type vfn = () => void

type fn<T = void, P = never> = (params: P) => T | void

type IFile = {
  id: string
  name: string
  extension: string
  contents: string
  path: string
  saved: boolean
}


type theme = 'vs-dark' | 'vs-light'
