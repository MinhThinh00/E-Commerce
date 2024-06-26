import AdminProductCard from '../components/AdminProductCard.jsx'
import  { useState , useEffect} from 'react'
import UploadProduct from '../components/UploadProduct.jsx'
import axios from 'axios'
const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct, setALlProduct] = useState([])
  const fetchdata= async () =>{
    const res= await axios.get("https://ecommerce-sigmaa-three.vercel.app/api/product/getProduct");
    console.log(res.data.data,1);
    setALlProduct(res?.data.data || [])
  }
  useEffect(()=>{
    fetchdata()
  },[])
  
  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-lg'>All Product</h2>
            <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
        </div>

        {/**all product */}
        <div className='flex items-center flex-wrap gap-5 py-4 w-full h-[calc(100vh-190px)] overflow-y-scroll'>
          {
           allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchdata}/>
              
            )
          })
          }
        </div>
        {/**upload prouct component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} />
          )
        }
    </div>
  )
}

export default AllProducts