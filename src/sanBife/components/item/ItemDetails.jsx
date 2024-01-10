
import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import { Link } from 'react-router-dom'

export const ItemDetails = ({ stock, item }) => {
    const { increment, decrement, count, onAdd} = useContext(UserContext)
    

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
                        Cantidad: {item.stock}
                    </p>
                    <div className='buttons'>
                        <button className='btn' onClick={decrement}><strong>-</strong></button>
                        <p>{count}</p>
                        <button className='btn' onClick={()=>increment(stock)}><strong >+</strong></button>
                    </div>
                </div>
                <Link to='/cart'>
                <button className='add' disabled={stock === 0} onClick={()=> onAdd(item, count)}>
                    Agregar al carrito
                </button>
                </Link>
            </div>
        </>
    )
}
