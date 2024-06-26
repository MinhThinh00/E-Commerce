import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setAllUser } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
const Header = () => {
  const navigate= useNavigate()
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch()
  const { authUser } = useSelector(state => state.user)

  const fetchCount = async () => {
    const userData = Cookies.get('userData');
    const token = userData ? JSON.parse(userData).token : '';

    if (!token) {
      console.error('Token is missing');
      return;
    }

    try {
      const res = await fetch("https://ecommerce-sigmaa-three.vercel.app/api/card/count", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include' // Sử dụng 'include' để gửi cookie
      });

      const data = await res.json();
      console.log(data); // Kiểm tra dữ liệu nhận được từ API

      if (data.success) {
        setCount(data.data.count);
        console.log(count)
      }
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);
 
  const handleKeyPress = async (e) => {
    if (e.key === "Enter")
      try {
        console.log(input)
        navigate(`/search?query=${input}`)
      } catch (error) {
        throw new Error;
      }
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log(input)
      navigate(`/search?query=${input}`)
    } catch (error) {
      throw new Error;
    }
  }
  const handleLogout = async () => {
    const res = await fetch("https://ecommerce-sigmaa-three.vercel.app/api/auth/logout")
    const data = await res.json();
    console.log(data)
    if (data.success) {
      toast.success(data.message)
      dispatch(setAuthUser(null))
      dispatch(setAllUser(null))
    }
    else {
      toast.error(data.message)
    }
  }
  return (
    <header className='h-16 shadow-md bg-white  w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <form onSubmit={handleSearch} className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none' value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} />
          <button type='submit' className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </button>
        </form>


        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>
            {
              authUser?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' >
                  {
                    authUser?.profilePic ? (
                      <img src={authUser?.profilePic} className='w-10 h-10 rounded-full' alt={authUser?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }
          </div>
          <Link to={"card"} className='text-2xl relative'>
            <span><FaShoppingCart /></span>

            <div className={`${authUser ? 'bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3' : 'hidden'}`} >
              <p className='text-sm'>{count}</p>
            </div>
          </Link>

          <div>{
            authUser ?
              (<Link to={"/login"} onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</Link>)
              :
              (<Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>)
          }
          </div>

        </div>

      </div>
    </header>
  )
}

export default Header