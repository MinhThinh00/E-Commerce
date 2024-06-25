import  { useEffect, useState } from 'react'
import VerticalCard from '../components/VerticalCard'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
const ProductCategory = () => {
    
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const url = new URLSearchParams(location.search)
    console.log(url)
    const category= url.get("category")
    console.log(url.get('category'))

    const fetchProduct = async () => {
        setLoading(true);
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setLoading(false)
            console.log("horizontal data",categoryProduct.data)
            setData(categoryProduct?.data)
        setLoading(false);
    };

    useEffect(()=>{
        fetchProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>
  )
}

export default ProductCategory