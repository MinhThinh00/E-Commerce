import  { useEffect, useState } from 'react'

import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const url = new URLSearchParams(location.search)
    const query= url.get("query")
    console.log(url.get('query'))
    const searchUrl= 'http://localhost:3000/api/product/getProductSearch?query='+ query;
    console.log(searchUrl  )

    const fetchProduct = async () => {
        setLoading(true);

        try {
            const response = await fetch(searchUrl);
            const dt = await response.json();
            if (response.ok) {
                setData(dt.products);
            } else {
                console.error('Lỗi khi lấy danh sách sản phẩm:', data.message);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }

        setLoading(false);
    };

    useEffect(()=>{
        fetchProduct()
    },[query])

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

export default SearchProduct