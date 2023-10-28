// import { useState } from 'react'
import '../index.scss'
import About from '../views/About'
import Admin from '../views/Admin'
import AdminVentas from '../views/AdminVentas'
import Category from '../views/Category'
import Home from '../views/Home'
import HowWhereShop from '../views/HowWhereShop'
import Jobs from '../views/Jobs'
import {useState, React} from 'react'
import Navbar from './Navbar'
import {Routes, Route} from 'react-router-dom'
import Register from '../views/Register'
function App() {
  const[allproducts, setAllproducts]=useState([])
    const[total, setTotal]=useState([0])
    const[countProducts, setcountProducts]=useState([0])
  return (
    <>
      <Navbar countProducts={countProducts} setcountProducts={setcountProducts} allproducts={allproducts} setAllproducts={setAllproducts} total={total} setTotal={setTotal}/>
      <Routes>
        <Route path="/" element={<Home countProducts={countProducts} setcountProducts={setcountProducts} allproducts={allproducts} setAllproducts={setAllproducts} total={total} setTotal={setTotal}/>} />
        <Route path="/SobreNosotros" element={<About />} />
        <Route path="/ComoyDondeComprar" element={<HowWhereShop />} />
        <Route path="/Categorias/:id" element={<Category countProducts={countProducts} setcountProducts={setcountProducts} allproducts={allproducts} setAllproducts={setAllproducts} total={total} setTotal={setTotal}/>} />
        <Route path="/Admin/*" element={<Admin />} />
        <Route path="/AdminVentas" element={<AdminVentas />} />
        <Route path="/Registro" element={<Register />} />
        {/* pagina 404          <Route path="/Logout" element={<Logout />} <Route path="/Trabajo" element={<Jobs />} />/>
*/}
        <Route path="*" element={<h3> Page not found 404 </h3>} />
      </Routes>
    </>
  )
}

export default App