import { useEffect, React, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
function Register() {
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
    async function crearUsuario(urlD) {
        await axios({
            url: `${import.meta.env.VITE_SERVER}/CrearCliente`,
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
            await crearUsuario()
            Swal.fire({
                title: `Creacion Exitosa`,
                text: 'El usuario se ha creado correctamente.',
                icon: 'success',
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al crear el usuario. Por favor, inténtalo de nuevo.',
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
                            <option>Sellecione el tipo de documento</option>
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
        </>
  )
}

export default Register