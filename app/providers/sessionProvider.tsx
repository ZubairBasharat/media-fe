"use client"

import React, { FC } from "react"
import { SessionProvider } from "next-auth/react"

interface ISessionProvider {
  children?: React.ReactNode
}

const NextAuthSessionProvider: FC<ISessionProvider> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthSessionProvider
