declare module 'nuxt/schema' {
  interface AppConfigInput {
    API_BASE_URL?: string
  }
}
declare module '*.gql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode
  export = Schema
}
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode
  export = Schema
}
