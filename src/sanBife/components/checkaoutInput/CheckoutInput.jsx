import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonAuth } from '../../../auth/components/ButtonAuth'

export const CheckoutInput = ({ children, nameAuth, onHandleClick, nameButton, ordenId, disabled }) => {
  return (
    <section className='container-auth'>
      <div className='container'>
        <div className='text'>
          <h1>{nameAuth}</h1>
        </div>
        <form onSubmit={onHandleClick}>
          {children}
          <ButtonAuth name={nameButton} disabled={disabled}/>
          {ordenId &&
            <p> ¡Gracias por tu compra ! Tu numero de seguimiento es: <br /> {''} {ordenId} {''} <br /></p>
          }
        </form>
      </div>
    </section>
  )
}
