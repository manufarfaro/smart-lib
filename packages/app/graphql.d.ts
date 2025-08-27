declare module '*.graphqls' {
  import { DocumentNode } from 'graphql'
  export default typeof DocumentNode
}

declare module '*.yml'

declare module '@manufarfaro/sl-contracts' {
  export const LibraryFactory: any
}