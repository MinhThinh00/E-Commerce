import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import VerticalCardProduct from '../components/VerticalCardProduct';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux'
import { setProduct } from '../redux/cardSlice';
const ProductDetails = () => {
  const navigate= useNavigate();
  const {authUser}= useSelector(store=> store.user)
  
  const {products}= useSelector(store=> store.card)
  const dispatch = useDispatch()
  const [data, setData] = useState(null);
  const params = useParams();
  console.log(params)
  const [loading, setLoading] = useState(true);
  //const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState('');

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  //const navigate = useNavigate();

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://ecommerce-sigmaa-three.vercel.app/api/product/${params.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const dataResponse = await response.json();
      console.log(dataResponse);
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({
      x,
      y,
    });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    if(!authUser) navigate('/login')
    e?.stopPropagation();
    e.preventDefault();
    try {
      const userData = Cookies.get('userData');
      const token = userData ? JSON.parse(userData).token : '';

      if (!token) {
        console.error('Token is missing');
        return;
      }

      const res = await axios.post('https://ecommerce-sigmaa-three.vercel.app/api/card/add',{productId: id}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res.data);
      console.log(res.data.data.productId, "productId");
      if(res.data.success) {
        toast.success(res.data.message)
        dispatch(setProduct([...products, res.data.data.productId]))
      }
    } catch (error) {
      throw new Error(error.message)
    }
  };

  const handleBuyProduct = async (e, id) => {
   
    //navigate("/cart");
  };

  if (loading || !data) {
    return (
      <div className='container mx-auto p-4'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-gray-200 relative p-2'>
            <img
              src={activeImage}
              className='h-full w-full object-cover mix-blend-multiply'
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              alt='Product'
            />
            {/* Product zoom */}
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-gray-200 p-1 -right-[510px] top-0'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className='h-full'>
            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
              {data?.productImage?.map((imgURL) => (
                <div className='h-20 w-20 bg-gray-200 rounded p-1' key={imgURL}>
                  <img
                    src={imgURL}
                    className='w-full h-full object-cover mix-blend-multiply cursor-pointer'
                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    onClick={() => handleMouseEnterProduct(imgURL)}
                    alt='Product Thumbnail'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className='flex flex-col gap-1'>
          <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
          <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
          <p className='capitalize text-gray-400'>{data?.category}</p>

          <div className='text-red-600 flex items-center gap-1'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>

          <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
            <p className='text-red-600'>{data?.sellingPrice}</p>
            <p className='text-gray-400 line-through'>{data?.price}</p>
          </div>

          <div className='flex items-center gap-3 my-2'>
            <button
              className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'
              onClick={(e) => handleBuyProduct(e, data?._id)}
            >
              Buy
            </button>
            <button
              className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Add To Cart
            </button>
          </div>

          <div>
            <p className='text-gray-600 font-medium my-1'>Description:</p>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <VerticalCardProduct category={data?.category} heading={"Recomend"}/>
    </div>
  );
};

export default ProductDetails;
