
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import { Link } from 'react-router-dom'

export const ItemDetails = ({ stock, item, id }) => {
    
    const { isInCart, cart, increment, decrement, count, addProduct } = useContext(UserContext)
    const [cantidad, setCantidad] = useState(0)


    useEffect(() => {
        if(cart){
            if(isInCart(id)){
                const objeto = (( cart.find(car =>(car.id === id))))
                setCantidad(stock - objeto.quantity);
            }else{setCantidad(stock)}
        }else{
            setCantidad(stock)
        }
        
    }, [])
    
    return (
        <>
            <div className='card-detail'>
                <figure className='card-detail--image'>
                    <img src={`/src/assets/img/${item.name}.jpg`} alt={item.name} />
                </figure>
                <article className='card-detail--text'>
                    <h3>{item.name}</h3>
                    <p>{item.detail}</p>
                    <p><strong>precio: ${item.price}</strong></p>
                </article>
                <div className='card-cantidad'>
                    <p>
                        cantidad: {cantidad }
                    </p>
                    <div className='buttons'>
                        <button className='btn' onClick={decrement}><strong>-</strong></button>
                        <p>{count}</p>
                        <button className='btn' onClick={() => increment(cantidad)}><strong >+</strong></button>
                    </div>
                </div>
                {

                }
                <Link to='/cart'>
                    <button className='add' disabled={cantidad === 0} onClick={() => addProduct(item, count)}>
                        Agregar al carrito
                    </button>
                </Link>
            </div>
        </>
    )
}
