import { useState } from 'react'
import { UserContext } from './UserContext'
import Swal from "sweetalert2"
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'


const initialCount = 1
const initialCart = JSON.parse(localStorage.getItem('cart')||[])

export const UserProvider = ({ children }) => {
  const [count, setCount] = useState(parseInt(initialCount))
  const [cart, setCart] = useState(initialCart)
  const [errorBuy, setErrorBuy] = useState('')
  const [ordenId, setOrdenId] = useState('')
  

  const increment = (stock,quantity) => {
    if(quantity){
      count < quantity  && setCount(count + 1)
    }
    count < stock  && setCount(count + 1)
  }
  const decrement = () => {
    count > 1 && setCount(count - 1)
  }
  

  const addProduct = (item, quantity) => {
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
    setCount(initialCount)
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
      setCart(initialCart)
      onReset()
  }

  return (
    <UserContext.Provider value={{ isInCart ,increment, decrement, count, addProduct, total, totalProducts, clearCart, removeProduct, isInCart, cart, alertMessage, ordenId }}>
      {children}
    </UserContext.Provider>
  )
}



