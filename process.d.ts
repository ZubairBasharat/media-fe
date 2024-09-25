declare namespace NodeJS {
  export interface ProcessEnv {
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string,
    SERVER_URL: string,
    IMAGE_URL: string
  }
}
