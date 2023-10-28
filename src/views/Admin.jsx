import React from 'react'
import NavbarAdm from '../components/NavbarAdm'
 import { Routes, Route } from 'react-router-dom'
import {CrearProducto, ConsultarProductos} from '../views/ProductsAdm'
import {CrearEmpleado, ConsultarEmpleados} from '../views/Employees'
import AdminVentas from './AdminVentas'
import Branding from './Branding'
import {Categorias, Ciudades} from './Selects'
function Admin() {
  return (
    <div className='columns mt-6'>
      <div className='column is-2'><NavbarAdm/></div>
      <div className="column is-10">
      <Routes>
      <Route path="" element='' />
      <Route path="Productos" element={<ConsultarProductos />} />
      <Route path="CrearProducto" element={<CrearProducto />} />
      <Route path="Empleados" element={<ConsultarEmpleados />} />
      <Route path="CrearEmpleado" element={<CrearEmpleado />} />
      <Route path="Branding" element={<Branding />} />
      <Route path="Categorias" element={<Categorias />} />
      <Route path="Ciudades" element={<Ciudades />} />
      <Route path="Ventas" element={<AdminVentas />} />
        <Route path="*" element={<h3> Page not found 404 </h3>} />
      </Routes>
      </div>
      </div>
  )
}

export default Admin