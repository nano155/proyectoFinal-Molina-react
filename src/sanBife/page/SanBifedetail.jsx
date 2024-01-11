import { useContext, useEffect, useState } from 'react'
import { ItemDetails } from '../components/item'
import { useParams } from 'react-router-dom'
import { getFirestore, doc, getDoc } from 'firebase/firestore'



export const SanBifedetail = () => {
  const { id } = useParams()
  const [item, setItem] = useState([])


  useEffect(() => {
    const queryDb = getFirestore();
    const queryDoc = doc(queryDb, 'products', id)
    getDoc(queryDoc).then(res =>
      setItem({ id: res.id, ...res.data() }))
  }, [id])
  
  return (
    <>

      <div className='card-detail-content'>
        {
          item.category === undefined
            ?
            <p className='error-p'>No existe el poducto con el id <span>{id}</span> 😢!!</p>
            :
            <ItemDetails key={item.id} {...item} item={item} id={id} />
        }
      </div>

    </>
  )
}
