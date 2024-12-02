import { SessionProvider, useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

type SessionWrapperProps = {
  children: ReactNode
}

const SessionWrapper: React.FC<SessionWrapperProps> = ({ children }) => {
  const { data: session } = useSession()  // Get the current session

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default SessionWrapper
