import { useState } from 'react'
import { UserContext } from './UserContext'
import { registerUserWithEmailPassword } from '../firebase/provider'
import Swal from "sweetalert2"
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'


const initial = 1

export const UserProvider = ({ children }) => {
  const [count, setCount] = useState(parseInt(initial))
  const [cart, setCart] = useState([])
  const [errorBuy, setErrorBuy] = useState('')
  const [ordenId, setOrdenId] = useState('')


  const increment = (stock) => {
    if (count >= stock) return
    setCount(count + 1)
  }

  const alertMessage = (onReset, displayName, lastName, email, emailConfirmation, phoneNumber, address) => {
    if (
      displayName.length <= 2 ||
      lastName.length <= 2 ||
      email.length <= 2 ||
      emailConfirmation.length <= 2 ||
      phoneNumber.length <= 2 ||
      address.length <= 2
    ) {
      return Swal.fire({
        title: "Error!",
        text: "Los campos deben tener mas de 2 caracteres!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (email !== emailConfirmation) {
      return Swal.fire({
        title: "Error!",
        text: "Los campos password y repassword deben ser iguales!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    const totalP = total();
    const order = {
      items: cart.map(car => ({
        id:car.id,
        name:car.name,
        quantity:car.quantity
      })),
        total:totalP,
        date : new Date(),
        displayName,
        lastName,
        email,
        phoneNumber,
        address,
      }
      Promise.all(
        order.items.map(async(orderProduct)=>{
          const db = getFirestore()
          const productRef = doc(db, 'products', orderProduct.id)
  
          const productDoc = await getDoc(productRef)
          const stockActual = productDoc.data().stock;
          await updateDoc(productRef,{stock: stockActual - orderProduct.quantity})
        })
      )
      .then(()=>{
        const db = getFirestore()
        addDoc(collection(db, 'orders'), order)
        .then(docRef =>{
          setOrdenId(docRef.id)
          clearCart()
        })
        .catch((error) =>{
          console.log('No se pudo actualizar el stock', error);
          setErrorBuy('No se actualizo el stock')
          Swal.fire({
            title: "Error!",
            text: `${errorBuy}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        })
      })
      .catch((error) =>{
        console.log('No se pudo actualizar el stock', error);
        setErrorBuy('No se actualizo el stock')
        Swal.fire({
          title: "Error!",
          text: `${error}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      Swal.fire({
        title: "Buen trabajo!",
        text: 'Gracias por tu compra!',
        icon: "success",
        confirmButtonText: "Ok",
      });
      onReset()
  }

  const decrement = () => {
    if (count <= 1) return
    setCount(count - 1)
  }

  const setContador = () => {
    setCount(parseInt(initial))
  }

  const onAdd = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(
        cart.map(product => {
          return product.id === item.id
            ? { ...product, quantity: product.quantity + quantity }
            : product;
        })
      )
    } else {
      setCart([...cart, { ...item, quantity }])
    }
    setContador()
  }

  const total = () => {
    return cart.reduce((prev, act) => prev + act.quantity * act.price, 0)
  }

  const totalProducts = () => {
    return cart.reduce((acm, actual) => acm + actual.quantity, 0)
  }

  const clearCart = () => setCart([]);

  const isInCart = (id) => {
    return cart.find(product => product.id === id) ? true : false
  }

  const removeProduct = (id) => {
    setCart(cart.filter(product => product.id !== id))
  }

  return (
    <UserContext.Provider value={{ increment, decrement, count, onAdd, total, totalProducts, clearCart, removeProduct, isInCart, cart, setContador, alertMessage, ordenId }}>
      {children}
    </UserContext.Provider>
  )
}



