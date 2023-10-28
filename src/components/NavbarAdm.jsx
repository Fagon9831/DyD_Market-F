import { React } from 'react'
import '../index.scss'
import { Link } from 'react-router-dom'

function NavbarAdm() {
    return (
        <>
    <div>
            <aside className="menu column is-2 ">
                <p className="menu-label">
                    Administracion
                </p>
                <ul className="menu-list">
                    <li>
                        <Link className="" to="/Admin/Productos">Productos</Link>
                        <ul>
                            <Link className="" to="/Admin/CrearProducto">Crear Producto</Link>
                        </ul>
                    </li>
                    <li> <Link className="" to="/Admin/Ventas">Ventas</Link></li>
                    <li> <Link className="" to="/Admin/Empleados">Empleados</Link>
                        <ul>
                            <Link className="" to="/Admin/CrearEmpleado">Crear Empleado</Link>
                        </ul>
                    </li>
                </ul>
                <p className="menu-label">
                    Oportunidades
                </p>
                <p className="menu-label">
                    Sistema
                </p>
                <ul className="menu-list">
                    <li> <Link className="" to="/Admin/Categorias">Categorias</Link></li>
                    <li> <Link className="" to="/Admin/Ciudades">Ciudades</Link></li>
                    <li> <Link className="" to="/Admin/Branding">Msg Branding</Link></li>
                </ul>
            </aside>
            </div>
        </>
    )
}
export default NavbarAdm