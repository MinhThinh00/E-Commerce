
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link , Route, Routes} from 'react-router-dom';

import Users from '../components/Users.jsx';
import AllProducts from './AllProducts.jsx';

const AdminPanel = () => {
    const {authUser} = useSelector(state => state.user)
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                        authUser?.profilePic ? (
                            <img src={authUser?.profilePic} className='w-20 h-20 rounded-full' alt={authUser?.name} />
                        ) : (
                            <FaRegCircleUser/>
                        )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{authUser?.username}</p>
                    <p className='text-sm'>{authUser?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"/admin/all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"/admin/all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
                <Routes>
                    <Route path="all-users" element={<Users />} />
                    <Route path="all-products" element={<AllProducts />} />
                </Routes>
        </main>
    </div>
  )
}

export default AdminPanel