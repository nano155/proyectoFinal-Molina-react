import React from 'react'
import { AppRoutes } from './routes/AppRoutes'
import { UserProvider } from './context/UserProvider'

export const SanBifeApp = () => {
  return (
    <UserProvider>
      <AppRoutes/>
    </UserProvider>
  )
}
