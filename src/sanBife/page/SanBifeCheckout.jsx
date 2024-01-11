import React, { useContext, useEffect } from 'react'
import { Input } from '../../auth/components/Input'
import { useForm } from '../../hooks/useForm'
import { CheckoutInput } from '../components/checkaoutInput/CheckoutInput'
import { UserContext } from '../../context/UserContext'



export const SanBifeCheckout = () => {
  const {cart, alertMessage, ordenId} = useContext(UserContext)

  const {onReset, onInputChange, displayName, lastName, email, emailConfirmation, phoneNumber, address} = useForm({
    displayName:'',
    lastName:'',
    email:'',
    emailConfirmation:'',
    phoneNumber:'',
    address:'',
    password:'',
    passwordConfirmation:'',
  })

  const onRegister = (e) =>{
    e.preventDefault()
    alertMessage(onReset, displayName, lastName, email, emailConfirmation, phoneNumber, address)

  };
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  return (
<>

<CheckoutInput ordenId={ordenId ?ordenId:null} nameAuth={'Datos comprador'} nameButton={'Ingresar Datos'} onHandleClick={onRegister} disabled={cart.length === 0 ? true : false} >
    <Input name={'displayName'} name2N={'Nombre'} type={'text'} name2={'nombre'} onChange={onInputChange} value={displayName} required={true}/>
    <Input name={'lastName'} name2N={'Apellido'} type={'text'} name2={'apellido'} onChange={onInputChange} value={lastName} required={true}/>
    <Input name={'email'} name2N={'Email confirmacion'} type={'email'} name2={'email confirmacion'} onChange={onInputChange} value={email} required={true}/>
    <Input name={'emailConfirmation'} name2N={'Email'} type={'email'} name2={'email'} onChange={onInputChange} value={emailConfirmation}/>
    <Input name={'phoneNumber'} name2N={'Numero de telefono'} type={'number'} name2={'numero de telefono'} onChange={onInputChange} value={phoneNumber} required={true}/>
    <Input name={'address'} name2N={'Direccion'} type={'text'} name2={'direccion'} onChange={onInputChange} value={address} required={true}/>
  </CheckoutInput> 
</>

  )
}
