import { Routes, Route, Navigate } from 'react-router-dom'
import { SanBifeHome } from '../page/SanBifeHome'
import { SanBifedetail } from '../page/SanBifedetail'
import { SanBifeCart } from '../page/SanBifeCart'
import { NavBar, Footer } from '../components/navBar'
import { SanBifeCheckout } from '../page/SanBifeCheckout'


export const SanBifeRoutes = () => {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path='home' element={<SanBifeHome />} />
        <Route path='category/:id' element={<SanBifeHome />} />
        <Route path='details/:id' element={<SanBifedetail />} />
        <Route path='cart' element={<SanBifeCart />} />
        <Route path='checkout' element={<SanBifeCheckout />} />

        <Route path='/*' element={<Navigate to='home' />} />
      </Routes>
      <Footer/>
    </>
  )
}
