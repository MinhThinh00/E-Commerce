import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './components/Footer';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import Card from './pages/Card'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AdminPanel from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import SearchProduct from './pages/SearchProduct';
import ProductCategory from './pages/ProductCategory';
function App() {
  return (
   <BrowserRouter >
    <ToastContainer position="top-right" autoClose={1500} />
      <Header/>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>  
         <Route path="/signup" element={<SignUp/>}/>  
         <Route path='/admin/*' element={<AdminPanel/>}/>
         <Route path='/product/:id' element={<ProductDetails/>}/>
         <Route path='/search' element={<SearchProduct/>}/>
         <Route path='/product-category' element={<ProductCategory/>}/>
         <Route path="/card" element={<Card/>}/>
      </Routes>
      <Footer/>
   </BrowserRouter>
  )
}

export default App
