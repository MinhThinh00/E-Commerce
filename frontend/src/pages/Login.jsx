import {  useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import Cookies from "js-cookie"
const Login = () => {
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const handleOnChange = (e) =>{
        const { name , value } = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    } 
     const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const res= await axios.post("https://ecommerce-sigmaa-three.vercel.app/api/auth/login",data)
            console.log(res.data)
            Cookies.set('userData', JSON.stringify(res.data));
            dispatch(setAuthUser(res.data))
            navigate("/")
        } catch (error) {
            console.log(error)
        }
     }
  return (
    <section id='login' className='pt-20'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons'/>
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='email' 
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>
                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password' 
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                    </form>

                    <p className='my-5'> Don't have account ? <Link to={"/signup"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login