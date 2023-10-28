import { Link } from 'react-router-dom'
import { useEffect, useState, React } from 'react'
import '../index.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
function Navbar({ allproducts, setAllproducts, countProducts, setcountProducts, total, setTotal }) {
    const Url = `${import.meta.env.VITE_SERVER}`
    const [categorias, setCategorias] = useState([])
    useEffect(() => {
        async function getCategorias() {
            await axios({
                url: `${Url}/ConsultarCategoria`,
                method: 'get',
            }).then((response) => {
                setCategorias(response.data)
            })
        }
        getCategorias()
    }, [])
    const [variable, setVariable] = useState(sessionStorage.getItem('Authorization'))
    useEffect(() => {
        setVariable(sessionStorage.getItem('Authorization'))
    }, [variable])
    const [variableuser, setVariableuser] = useState(sessionStorage.getItem('Use'))
    useEffect(() => {
        setVariableuser(sessionStorage.getItem('Use'))
    }, [variableuser])

    const [variabletp, setVariabletp] = useState(sessionStorage.getItem('tp'))
    useEffect(() => {
        setVariabletp(sessionStorage.getItem('tp'))
    }, [variabletp])

    const [modal, setModal] = useState('modal')
    const [contraseña, setContraseña] = useState('')
    const [correo, setCorreo] = useState('')

    const changeCorreo = (evt) => {
        setCorreo(evt.target.value)
    }
    const changeContraseña = (evt) => {
        setContraseña(evt.target.value)
    }
    const showModal = (evt) => {
        setModal('modal is-active')
    }
    const closeModal = () => {
        setModal('modal')
        setCorreo('')
        setContraseña('')
    }
    const login = async () => {
        try {
            const response = await axios({
                url: `${import.meta.env.VITE_SERVER}/login`,
                method: 'POST',
                data: {
                    'usuario': correo,
                    'contraseña': contraseña,
                },
            })
            setVariable(sessionStorage.setItem('Authorization', response.data.token))
            setVariableuser(sessionStorage.setItem('Use', response.data.code_s))
            setVariabletp(sessionStorage.setItem('tp', response.data.tipo_s))
            Swal.fire({
                title: `Inicio de sesion exitoso`,
                text: '',
                icon: 'success',
            })
            closeModal()
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al iniciar session. Por favor, inténtalo de nuevo.',
                icon: 'error',
            })
        }
    }

    const [active, setActive] = useState(false)
    const onDeleteProduct = (producto) => {
        const results = allproducts.filter(item => item.id_producto !== producto.id_producto)
        setTotal(parseFloat(total) - parseFloat(producto.precio) * parseInt(producto.quantity))
        setcountProducts(parseInt(countProducts) - parseInt(producto.quantity))
        setAllproducts(results)
    }
    const onCleanCart = () => {
        setTotal(0)
        setAllproducts([])
        setcountProducts(0)
    }
    function giveCurrentDateTime() {
        const today = new Date()
        const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay()
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        const dateTime = `${date}${time}`
        return dateTime
    }

    async function crearFactura(producto, idpedido) {
        await axios({
            url: `${import.meta.env.VITE_SERVER}/CrearFacturas`,
            method: 'POST',
            data: {
                'producto_id': producto.id_producto,
                'cantidad': producto.quantity,
                'pedido_id': idpedido,
            },
            headers: {
                'Authorization': sessionStorage.getItem('Authorization'),
            },
        })
    }
    async function crearPedido(idpedido) {
        const date = new Date()
        const timestampFromDate = date.getTime()
        await axios({
            url: `${import.meta.env.VITE_SERVER}/CrearPedidos`,
            method: 'POST',
            data: {
                'id_pedido': idpedido,
                'cliente_id': variableuser,
                'fecha': timestampFromDate,
            },
            headers: {
                'Authorization': sessionStorage.getItem('Authorization'),
            },
        })
    }
    const handleButtonClick = async (evt) => {
        if (sessionStorage.getItem('Authorization') == null) {
            Swal.fire({ title: 'Error', text: 'Para poder realizar la compra requiere inciar sesion.', icon: 'error' })
        } else {
            try {
                evt.preventDefault()
                const token = sessionStorage.getItem('Authorization')
                const dateTime = giveCurrentDateTime()
                const idpedido = `${token.substring(0, 8)}${dateTime.substring(0, 15)}`
                Swal.showLoading()
                await crearPedido(idpedido)
                allproducts.map(async (producto) => (
                    await crearFactura(producto, idpedido)
                ),
                )

                Swal.fire({
                    title: `Creacion Exitosa`,
                    text: 'La compra se ha registrado exitosamente.',
                    icon: 'success',
                })
                onCleanCart()
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al registrar la compra. Por favor, inténtalo de nuevo.',
                    icon: 'error',
                })
            }
        }
    }
    return (
        <>
            <div className={modal}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Iniciar Session</p>
                        <button onClick={closeModal} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <form>
                            <div>
                                <label>Correo</label>
                                <input className="input" onChange={changeCorreo} type="text" placeholder="Ingrese su correo" value={correo}></input>
                            </div>
                            <div>
                                <label>Contraseña</label>
                                <input className="input" onChange={changeContraseña} type="password" placeholder="Ingrese su contraseña" value={contraseña}></input>
                            </div>
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={login} className="button button is-link">Iniciar Session</button>
                        <button onClick={closeModal} className="button button is-danger">Cancelar</button>
                    </footer>
                </div>
            </div>
            <nav className='navbar nav-p is-fixed-top'>
                <div className="navbar-menu is-active">
                    <div className="navbar-start nav-p2">
                        <Link className="navbar-item" to="/">Inicio</Link>
                        <Link className="navbar-item" to="/SobreNosotros">Sobre DyD Market</Link>
                        <Link className="navbar-item" to="/ComoyDondeComprar">Donde y Como comprar</Link>
                        <div className='navbar-item  has-dropdown is-hoverable nav-p3'>
                            <Link className="navbar-link" to="#">Categorias</Link>
                            <div className="navbar-dropdown">
                                {categorias.map((categoria) => (
                                    <Link className="navbar-item" key={categoria.id_categoria} to={`/Categorias/${categoria.id_categoria}`}>{categoria.nom_categoria}</Link>
                                ))}
                            </div>
                        </div>
                     { //  <Link className="navbar-item" to="/Trabajo">Trabaja con nosotros</Link>
                     }
                    </div>
                    <div className="navbar-end nav-p2 is-align-items-center">
                        <div className='container-icon'>
                            <div
                                className='container-cart-icon'
                                onClick={() => setActive(!active)}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    className='icon-cart'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                                    />
                                </svg>
                                <div className='count-products'>
                                    <span id='contador-productos'>{countProducts}</span>
                                </div>
                            </div>

                            <div
                                className={`container-cart-products ${active ? '' : 'hidden-cart'
                                    }`}
                            >
                                {allproducts.length ? (
                                    <>
                                        <div className='row-product'>
                                            {allproducts.map(product => (
                                                <div className='cart-product' key={product.id_producto}>
                                                    <div className='info-cart-product'>
                                                        {<span className='cantidad-producto-carrito'>
                                                            {product.quantity}
                                                        </span>}
                                                        <p className='titulo-producto-carrito'>
                                                            {product.name_producto}
                                                        </p>
                                                        <span className='precio-producto-carrito'>
                                                            ${product.precio ? product.precio.toLocaleString('es-CO') : ''}
                                                        </span>
                                                    </div>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        strokeWidth='1.5'
                                                        stroke='currentColor'
                                                        className='icon-close'
                                                        onClick={() => onDeleteProduct(product)}
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            d='M6 18L18 6M6 6l12 12'
                                                        />
                                                    </svg>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='cart-total'>
                                            <h3>Total:</h3>
                                            <span className='total-pagar'>${total.toLocaleString('es-CO')}</span>
                                        </div>

                                        <button className='btn-clear-all' onClick={handleButtonClick}>
                                            Relizar Compra
                                        </button>
                                    </>
                                ) : (
                                    <p className='cart-empty'>El carrito está vacío</p>
                                )}
                            </div>
                        </div>
                        {sessionStorage.getItem('Authorization') != null ? (
                            <>
                                {sessionStorage.getItem('tp') != '1' ? (
                                    <>
                                        {sessionStorage.getItem('tp') == '3' ? (
                                            <>
                                                <Link className="navbar-item" to="/Admin">Administracion</Link>
                                            </>
                                        ) : ''}
                                        <Link className="navbar-item" to="/AdminVentas">ventas</Link>
                                    </>
                                ) : ''}
                                <>
                                    <Link className="navbar-item button is-danger mr-1" onClick={() => {
                                        sessionStorage.removeItem('Authorization')
                                        // sessionStorage.removeItem('tp')
                                        setVariable(null)
                                    }} to="/">Finalizar Session</Link>
                                </>
                            </>

                        ) : ''}
                        {sessionStorage.getItem('Authorization') == null ? <Link className="navbar-item button is-primary mr-1" onClick={showModal}>Iniciar Session</Link> : ''}
                        {sessionStorage.getItem('Authorization') == null ? <Link className="navbar-item button is-black mr-1" to="/Registro">Registrarse</Link> : ''}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar