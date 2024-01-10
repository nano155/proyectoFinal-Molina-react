import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import { ItemCart } from '../components/item/ItemCart'
import {getFirestore, collection, addDoc} from 'firebase/firestore'



export const SanBifeCart = () => {
  const { cart, total, removeProduct } = useContext(UserContext)


  const order = {
    buyer:{
      displayName:'isabel',
      email:'nano@gmail.com',
      phoneNumber:'234654613',
      address:'calle falsa 123',
    },
    item: cart.map(car => ({
      id:car.id,
      name:car.name,
      price:car.price,
      quantity:car.quantity
    })),
    total:total()
  }


  if (cart.length === 0) {
    return (
      <div className='main-cart'>
        <div>
        <p>No cuenta con productos en el carrito!</p>
        <Link to='home'> Hacer compras</Link>
        </div>
      </div>
    )
  }


  return (
    <section className='item-cart-contain'>
    {cart.map(car => (
      <ItemCart key={car.id} {...car} removeProduct={removeProduct}/>
    ))}

    <p className='total'>Total: {total()}</p>
    <Link to='/checkout'>
    <button className='btn-total'>Finalizar compra</button>
    </Link>
    </section>
  )
}
