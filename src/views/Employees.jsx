/* eslint-disable no-unused-vars */
import { useEffect, React, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import edit from '../assets/edit.svg'
import delet from '../assets/delete.svg'
function ConsultarEmpleados() {
    const [usuarios, setUsuarios] = useState([])
    const [modal, setModal] = useState('modal')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [correo, setCorreo] = useState('')
    const [usuario, setUsuario] = useState('')
    const changeTelefono = (evt) => {
        setTelefono(evt.target.value)
    }
    const changeCorreo = (evt) => {
        setCorreo(evt.target.value)
    }
    const changeDireccion = (evt) => {
        setDireccion(evt.target.value)
    }
    useEffect(() => {
        async function getUsuarios() {
            await axios({
                url: `${import.meta.env.VITE_SERVER}/ConsultarEmpleados`,
                method: 'get',
                headers: {
                    'Authorization': sessionStorage.getItem('Authorization'),
                },
            }).then((response) => {
                setUsuarios(response.data)
            })
        }
        getUsuarios()
    }, [])
    const [loading, setLoading] = useState(false)
    const showModal = (evt) => {
        const id = evt.currentTarget.dataset.value
        const clienteEncontrado = usuarios.find((element) => element.id_empleado == id)

        if (clienteEncontrado) {
            setLoading(true)
            setUsuario(clienteEncontrado)
            setTelefono(clienteEncontrado.telefono || '')
            setCorreo(clienteEncontrado.correo || '')
            setDireccion(clienteEncontrado.direccion || '')
            setModal('modal is-active')
            setLoading(false)
        } else {
            console.log(`No se encontró ningún producto con el id ${id}`)
        }
    }
    const closeModal = () => {
        setModal('modal')
        setCorreo('')
        setDireccion('')
        setTelefono('')
    }
    async function saveChanges(evt) {
        try {
            evt.preventDefault()
            Swal.showLoading()
            await axios({
                url: `${import.meta.env.VITE_SERVER}/ModificarEmpleado`,
                method: 'put',
                data: {
                    'id_empleado': usuario.id_empleado,
                    'direccion': direccion,
                    'telefono': telefono,
                    'correo': correo,
                },
                headers: {
                    'Authorization': sessionStorage.getItem('Authorization'),
                },
            }).then((response) => {
                Swal.fire({
                    title: `Guardado`,
                    text: 'Se guardo el cliente correctamente.',
                    icon: 'success',
                })
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al guardar el cliente. Por favor, inténtalo de nuevo.',
                icon: 'error',
            })
        }
    }
    async function deletProduct(evt) {
        try {
            evt.preventDefault()
            Swal.showLoading()
            const id = evt.currentTarget.dataset.value
            await axios({
                url: `${import.meta.env.VITE_SERVER}/EliminarEmpleados`,
                method: 'delete',
                data: {
                    'id_empleado': id,
                },
                headers: {
                    'Authorization': sessionStorage.getItem('Authorization'),
                },
            }).then((response) => {
                Swal.fire({
                    title: `Eliminado`,
                    text: 'Se elimino el cliente correctamente.',
                    icon: 'success',
                })
            })
        } catch (error) {
            Swal.fire({
                title: `Error`,
                text: 'Ocurrió un error al eliminar el cliente. Por favor, inténtalo de nuevo.',
                icon: 'error',
            })
        }
    }
    return (
        <>
            <div>
                <div className={modal}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Editar datos de Empleado: {loading ? <p>Cargando...</p> : `${usuario.nombre} ${usuario.apellido}`}</p>
                            <button onClick={closeModal} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <form>
                                <div>
                                    <label>Direccion</label>
                                    <input className="input" onChange={changeDireccion} type="text" placeholder="Ingrese su direccion" value={direccion}></input>
                                </div>
                                <div>
                                    <label>Telefono</label>
                                    <input className="input" onChange={changeTelefono} type="number" placeholder="Ingrese su telefono" value={telefono}></input>
                                </div>
                                <div>
                                    <label>Correo</label>
                                    <input className="input" onChange={changeCorreo} type="text" placeholder="Ingrese su correo" value={correo}></input>
                                </div>
                            </form>
                        </section>
                        <footer className="modal-card-foot">
                            <button onClick={saveChanges} className="button button is-link">Guardar cambios</button>
                            <button onClick={closeModal} className="button button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
                <div className="container">
                    <h1 className="my-5 is-size-4">Listado de Empleados</h1>
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Documento</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Correo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id_empleado}>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.documento}</td>
                                    <td>{usuario.direccion}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.correo}</td>
                                    <td>
                                        <div className="buttons is-right">
                                            <button onClick={showModal} data-value={usuario.id_empleado} className="button is-info">{<img className='img-card' src={edit} />}</button>
                                            <button onClick={deletProduct} data-value={usuario.session_code} className="button is-danger">{<img className='img-card' src={delet} />}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
function CrearEmpleado() {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [documento, setDocumento] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [ciudades, setCiudades] = useState([])
    const [ciudad, setCiudad] = useState('')
    const [tdocument, setTdocument] = useState('')
    const [tdocuments, setTdocuments] = useState([])
    const changeCiudad = (evt) => {
        setCiudad(evt.target.value)
    }
    const changeNombre = (evt) => {
        setNombre(evt.target.value)
    }
    const changeTdocument = (evt) => {
        setTdocument(evt.target.value)
    }
    const changeApellido = (evt) => {
        setApellido(evt.target.value)
    }
    const changeDireccion = (evt) => {
        setDireccion(evt.target.value)
    }
    const changeTelefono = (evt) => {
        setTelefono(evt.target.value)
    }
    const changeDocumento = (evt) => {
        setDocumento(evt.target.value)
    }
    const changeCorreo = (evt) => {
        setCorreo(evt.target.value)
    }
    const changeContraseña = (evt) => {
        setContraseña(evt.target.value)
    }
    async function crearEmpleado(urlD) {
        await axios({
            url: `${import.meta.env.VITE_SERVER}/CrearEmpleado`,
            method: 'POST',
            data: {
                'nombre': nombre,
                'apellido': apellido,
                'direccion': direccion,
                'telefono': telefono,
                'ciudad_id': ciudad,
                'documento': documento,
                'documento_id': tdocument,
                'correo': correo,
                'contraseña': contraseña,
            },
            headers: {
                'Authorization': sessionStorage.getItem('Authorization'),
            },
        })
    }
    async function guardarProducto(evt) {
        try {
            evt.preventDefault()
            Swal.showLoading()
            await crearEmpleado()
            Swal.fire({
                title: `Creacion Exitosa`,
                text: 'El empleado se ha creado correctamente.',
                icon: 'success',
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al crear el empleado. Por favor, inténtalo de nuevo.',
                icon: 'error',
            })
        }
    }
    useEffect(() => {
        async function getCategorias() {
            await axios({
                url: `${import.meta.env.VITE_SERVER}/ConsultarCiudad`,
                method: 'get',
            }).then((response) => {
                setCiudades(response.data)
            })
        }
        getCategorias()
    }, [])
    useEffect(() => {
        async function getDocumentos() {
            await axios({
                url: `${import.meta.env.VITE_SERVER}/ConsultarDocumento`,
                method: 'get',
            }).then((response) => {
                setTdocuments(response.data)
            })
        }
        getDocumentos()
    }, [])
    return (
        <>
            <div className="container column is-9 mt-6">
                <h1 className="my-5 is-size-4">Crear usuario</h1>
                <form onSubmit={guardarProducto}>
                    <div>
                        <label>Nombre</label>
                        <input className="input" onChange={changeNombre} type="text" placeholder="Ingresa el Nombre" value={nombre} required></input>
                    </div>
                    <div>
                        <label>Apellido</label>
                        <input className="input" onChange={changeApellido} type="text" placeholder="Ingresa el apellido" value={apellido} required></input>
                    </div>
                    <div>
                        <label>Direccion</label>
                        <input className="input" onChange={changeDireccion} type="text" placeholder="Ingresa la direccion" value={direccion} required></input>
                    </div>
                    <div>
                        <label>Telefono</label>
                        <input className="input" onChange={changeTelefono} type="number" placeholder="Ingresa el numero de telefono" value={telefono} min={1} required></input>
                    </div>
                   <div>
                     <label>Ciudad</label><br />
                        <div className="select is-fullwidth">
                            <select className="select is-fullwidth" onChange={changeCiudad}>
                            <option>Sellecione la cuidad</option>
                                {ciudades.map((ciudad) => (
                                    <option key={ciudad.id_ciudad} value={ciudad.id_ciudad}>{ciudad.ciudad}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                   <div>
                        <label>Tipo de documento</label><br />
                        <div className="select is-fullwidth">
                            <select className="select is-fullwidth" onChange={changeTdocument}>
                            <option>Sellecione el tipo  de documento</option>
                                {tdocuments.map((document) => (
                                    <option key={document.id_documento} value={document.id_documento}>{document.tipo_documento}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Documento</label>
                        <input className="input" onChange={changeDocumento} type="number" placeholder="Ingresa el numero de documento" value={documento} min={1} required></input>
                    </div>
                    <div>
                        <label>Correo</label>
                        <input className="input" onChange={changeCorreo} type="email" placeholder="Ingresa el correo" value={correo} required></input>
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input className="input" onChange={changeContraseña} type="password" placeholder="Ingresa la contraseña para el acceso" value={contraseña} required></input>
                    </div>
                    <button className="mt-5 button is-link">Registrarse</button>
                </form>
            </div>
        </>)
}

export { CrearEmpleado, ConsultarEmpleados }