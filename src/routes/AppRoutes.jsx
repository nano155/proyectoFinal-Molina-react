import { Routes, Route } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { SanBifeRoutes } from '../sanBife/routes/SanBifeRoutes'


export const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='auth/*' element={<AuthRoutes/>}/>
        <Route path='/*' element={<SanBifeRoutes/>}/>
    </Routes>
    </>
  )
}
