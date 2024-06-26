import  {  useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const loadingCart = new Array(4).fill(null)


    const fetchData = async() =>{
        const userData = Cookies.get('userData');
        const token = userData ? JSON.parse(userData).token : '';

        if (!token) {
          console.error('Token is missing');
          return;
        }
        const response = await axios.get('https://ecommerce-sigmaa-three.vercel.app/api/card/getall',{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
       

        const responseData = await response.data

        if(responseData.success){
            setData(responseData.data)
        }


    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
         setLoading(false)
    },[])


    const increaseQty = async (id, qty) => {
        console.log(id)
        const userData = Cookies.get('userData');
        const token = userData ? JSON.parse(userData).token : '';
    
        if (!token) {
            console.error('Token is missing');
            return;
        }
    
        try {
            const response = await axios.post(`https://ecommerce-sigmaa-three.vercel.app/api/card/update/${id}`, 
                {   
                    quantity: qty + 1
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
    
            const responseData = response.data;
    
            if (responseData.success) {
                fetchData();
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };
    
    // Hàm để giảm số lượng sản phẩm
    const decraseQty = async (id, qty) => {
        if (qty === 1) {
            deleteCartProduct(id);
        } else {
            const userData = Cookies.get('userData');
            const token = userData ? JSON.parse(userData).token : '';
    
            if (!token) {
                console.error('Token is missing');
                return;
            }
    
            try {
                const response = await axios.post(`https://ecommerce-sigmaa-three.vercel.app/api/card/update/${id}`, 
                    {   
                        quantity: qty - 1
                    },
                    {
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                );
    
                const responseData = response.data;
    
                if (responseData.success) {
                    fetchData();
                }
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        }
    };

    const deleteCartProduct = async(id)=>{
        const userData = Cookies.get('userData');
        const token = userData ? JSON.parse(userData).token : '';

        if (!token) {
          console.error('Token is missing');
          return;
        }
        const response = await axios.delete(`https://ecommerce-sigmaa-three.vercel.app/api/card/delete/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })

        const responseData = await response.data

        if(responseData.success){
            toast.success("Successfully deleted")
            fetchData()
        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
  return (
    <div className='container mx-auto'>
        
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product)=>{
                           return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                        <MdDelete/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{product?.productId?.sellingPrice}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{product?.productId?.sellingPrice  * product?.quantity}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{totalPrice}</p>    
                                    </div>

                                    <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                                </div>
                            )
                        }
                </div>
        </div>
    </div>
  )
}

export default Cart