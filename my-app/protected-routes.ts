import { useUser } from '@clerk/nextjs'
import React from 'react'

const ProtectedRoutes = ({children}) => {
    const {user} = useUser();
  return (
  )
}

export default ProtectedRoutes