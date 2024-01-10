
import { Link } from 'react-router-dom'


export const ItemCard = ({name, price, stock, id}) => {
  return (
    <div className='card'>
        <figure className='card-image'>
            <img src={`/src/assets/img/${name}.jpg`} alt={name} />
        </figure>
        <section className='card-text'> 
            <h3>
                {name}
            </h3>
            <p>
                Valor: ${price}
            </p>
            <Link to={`/details/${id}`}>
            <button className='add'>
                Detalles
            </button>
            </Link>
        </section>
    </div>
  )
}