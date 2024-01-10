import React, { useContext, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import Swal from "sweetalert2"
import { Input } from '../components/Input'
import { useForm } from '../../hooks/useForm'
import { registerUserWithEmailPassword } from '../../firebase/provider'



export const Register = ({Boton, onClose}) => {
  

  const [formRegister, setFormRegister] = useState([])

  const {onReset, onInputChange, formState, displayName, lastName, email, emailConfirmation, phoneNumber, address, password, passwordConfirmation} = useForm({
    displayName:'',
    lastName:'',
    email:'',
    emailConfirmation:'',
    phoneNumber:'',
    address:'',
    password:'',
    passwordConfirmation:'',
  })

  const onRegister =(e)=>{
    e.preventDefault();
    const existe =
      formRegister.some((data) => data.email === email)
    if (
      displayName.length <= 2 ||
      lastName.length <= 2 ||
      email.length <= 2 ||
      emailConfirmation.length <= 2 ||
      phoneNumber.length <= 2 ||
      address.length <= 2 ||
      password.length <= 2 ||
      passwordConfirmation.length <= 2
    ) {
      return Swal.fire({
        title: "Error!",
        text: "Los campos deben tener mas de 2 caracteres!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (password !== passwordConfirmation) {
      return Swal.fire({
        title: "Error!",
        text: "Los campos password y repassword deben ser iguales!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (existe) {
      return Swal.fire({
        title: "Error!",
        text: "Los campos email y cc ya existen!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    Swal.fire({
      title: "Buen trabajo!",
      text: "Registro exitoso!",
      icon: "success",
      confirmButtonText: "Ok",
    });
    setFormRegister([...formRegister, formState]);
    registerUserWithEmailPassword(formState)
    onReset()
  };
  

  return (
    <AuthLayout message={'Ya tienes una cuenta? '} linkRouter={'/auth/login'} messageRoute={' Ingresa aqui!'} nameAuth={'Registrate'} nameButton={'Registrarse'} onHandleClick={onRegister} >
      <Input name={'displayName'} name2N={'Nombre'} type={'text'} name2={'nombre'} onChange={onInputChange} value={displayName} required={true}/>
      <Input name={'lastName'} name2N={'Apellido'} type={'text'} name2={'apellido'} onChange={onInputChange} value={lastName} required={true}/>
      <Input name={'email'} name2N={'Email confirmacion'} type={'email'} name2={'email confirmacion'} onChange={onInputChange} value={email} required={true}/>
      <Input name={'emailConfirmation'} name2N={'Email'} type={'email'} name2={'email'} onChange={onInputChange} value={emailConfirmation}/>
      <Input name={'phoneNumber'} name2N={'Numero de telefono'} type={'number'} name2={'numero de telefono'} onChange={onInputChange} value={phoneNumber} required={true}/>
      <Input name={'address'} name2N={'Direccion'} type={'text'} name2={'direccion'} onChange={onInputChange} value={address} required={true}/>
      <Input name={'password'} name2N={'Contraseña'} type={'password'} name2={'contraseña'} onChange={onInputChange} value={password} required={true}/>
      <Input name={'passwordConfirmation'} name2N={'Contraseña confirmacion'} type={'password'} name2={'contraseña confirmacion'} onChange={onInputChange} value={passwordConfirmation} required={true}/>

    </AuthLayout>
  )
}
