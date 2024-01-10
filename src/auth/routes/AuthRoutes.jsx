import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../page/Login'
import { Register } from '../page/Register'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        
        <Route path='/*' element={<Navigate to='/auth/login'/>}/>
    </Routes>
  )
}
