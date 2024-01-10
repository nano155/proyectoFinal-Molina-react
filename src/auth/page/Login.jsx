import { AuthLayout } from '../layout/AuthLayout'
import { Input } from '../components/Input'
import { useForm } from '../../hooks/useForm'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from '../../firebase/config'

export const Login = ({Boton, onClose}) => {
  
  const {onInputChange, formState, password, email, onReset} = useForm({
    email:'',
    password:''
    
  })

  const handleLogin =(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(FirebaseAuth, email, password)
    .then(userCredential =>{
      console.log(userCredential);
    }).catch(error =>{
      console.log(error);
    })
    
  }

  
  console.log(FirebaseAuth.currentUser);
  return (
    <>
    <AuthLayout message={'Aun no tienes cuenta? '} messageRoute={' Registrate Aqui!'} linkRouter={'/auth/register'} nameAuth={'Login'} nameButton={'Login'} onHandleClick={handleLogin} Boton={Boton} onClose={onClose}>
   
   <Input name={'email'} name2={'email'} name2N={'Email'} onChange={onInputChange} required={true} type={'email'} value={email}  />
   <Input name={'password'} name2={'contraseña'} name2N={'Contraseña'} onChange={onInputChange} required={true} type={'password'} value={password}  />
    </AuthLayout>
    </>
    )
  }