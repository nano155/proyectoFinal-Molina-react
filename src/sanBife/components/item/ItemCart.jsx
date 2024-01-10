import React from 'react'

export const ItemCart = ({name, quantity, price, id, removeProduct}) => {
    
  return (
    <div className="itemCart">
    <img src={`/src/assets/img/${name}.jpg`} alt={name} />
    <div className='item-cart-text'>
      <p>Título: {name}</p>
      <p>Cantidad: {quantity}</p>
      <p>Precio u.: {price}</p>
      <p>Subtotal: <span>${quantity * price}</span></p>
    </div>
      <button onClick={() => removeProduct(id)}>Eliminar<strong></strong></button>
  </div>
  )
}
