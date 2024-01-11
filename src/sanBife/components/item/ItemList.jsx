import { useContext, useEffect, useState } from 'react'
import { ItemCard } from './ItemCard'
import { UserContext } from '../../../context/UserContext'
import { useParams } from 'react-router-dom'
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore'
import { Spinner } from '../spinner/Spinner'


export const ItemList = () => {
  const [item, setItem] = useState([])
  const { dataItem, filterCategory } = useContext(UserContext)
  const { id } = useParams()

  useEffect(() => {
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, 'products')
    if (id) {
      const queryFilter = query(queryCollection, where('type', '==', id))
      getDocs(queryFilter).then((res) =>
        setItem(res.docs.map(p => ({ id: p.id, ...p.data() }))))

    } else {
      getDocs(queryCollection).then((res) =>
        setItem(res.docs.map(p => ({ id: p.id, ...p.data() }))))
    }
  }, [id])
  return (
    <>
      <div className='card-list content'>
        {
          item.length === 0 ?<Spinner/>
          :item?.map(item => (
            <ItemCard key={item.id} {...item} />
          ))
        }
      </div>

    </>
  )
}
