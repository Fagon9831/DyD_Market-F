import { useState, useEffect, React } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import delet from '../assets/delete.svg'
function Categorias() {
    const [categoria, setCategoria] = useState('')
    const changeCategoria = (evt) => {
        setCategoria(evt.target.value)
    }
    async function guardarCategoria(evt) {
        try {
            evt.preventDefault()
            Swal.showLoading()
            await axios({
                url: `${import.meta.env.VITE_SERVER}/CrearCategoria`,
                method: 'post',
                data: {
                    'nom_categoria': categoria,
                },
                headers: {
                    'Authorization': sessionStorage.getItem('Authorization'),
                },
            }).then((response) => {
                Swal.fire({
                    title: `Guardado`,
                    text: 'Se han guardo la nueva categoria correctamente.',
                    icon: 'success',
                })
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al guardar la categoria. Por favor, inténtalo de nuevo.',
                icon: 'error',
            })
        }
    }
    const [categorias, setCategorias] = useState([])
    useEffect(() => {
        async function getCategorias() {
            await axios({
                url: `${import.meta.env.VITE_SERVER}/ConsultarCategoria`,
                method: 'get',
            }).then((response) => {
                setCategorias(response.data)
            })
        }
        getCategorias()
    }, [])
    async function deletProduct(evt) {
        try {
          evt.preventDefault()
          Swal.showLoading()
          const id =evt.currentTarget.dataset.value
          await axios({
            url: `${import.meta.env.VITE_SERVER}/EliminarCategoria`,
            method: 'delete',
            data: {
              'id_categoria': id,
            },
            headers: {
                'Authorization': sessionStorage.getItem('Authorization'),
            },
          }).then((response) => {
            Swal.fire({
            title: `Eliminado`,
            text: 'Se elimino la categoria correctamente.',
            icon: 'success',
          })
          })
        } catch (error) {
          Swal.fire({
            title: `Error`,
            text: 'Ocurrió un error al eliminar la categoria. Por favor, inténtalo de nuevo.',
            icon: 'error',
          })
        }
      }
    return (
        <>
            <div className="container column is-9">
                <h1 className="my-5 is-size-4">Categorias de productos</h1>
                <form onSubmit={guardarCategoria}>
                    <div>
                        <label>Ingresar Categoria:</label>
                        <input className="input" onChange={changeCategoria} type="text" placeholder="Ingresar nueva categoria" value={categoria} ></input>
                    </div>
                    <button className="mt-5 button is-link">Guardar</button>
                </form>
            </div>
            <div className="container column is-9">
                <h1 className="my-5 is-size-4">Listado de Categorias</h1>
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.id_categoria}>
                                <td>{categoria.nom_categoria}</td>
                                <td>
                                    <div className="buttons is-right">
                                        <button onClick={deletProduct} data-value={categoria.id_categoria} className="button is-danger">{<img className='img-card' src={delet} />}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
function Ciudades() {
    const [ciudad, setCiudad] = useState('')
    const changeCiudad = (evt) => {
        setCiudad(evt.target.value)
    }
    async function guardarCiudad(evt) {
        try {
            evt.preventDefault()
            Swal.showLoading()
            await axios({
                url: `${import.meta.env.VITE_SERVER}/CrearCiudad`,
                method: 'post',
                data: {
                    'ciudad': ciudad,
                },
                headers: {
                    'Authorization': sessionStorage.getItem('Authorization'),
                },
            }).then((response) => {
                Swal.fire({
                    title: `Guardado`,
                    text: 'Se ha guardo la nueva ciudad correctamente.',
                    icon: 'success',
                })
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al guardar la ciudad. Por favor, inténtalo de nuevo.',
                icon: 'error',
            })
        }
    }
    const [ciudades, setCiudades] = useState([])
    useEffect(() => {
        async function getCiudades() {
            await axios({
                url: `${import.meta.env.VITE_SERVER}/ConsultarCiudad`,
                method: 'get',
            }).then((response) => {
                setCiudades(response.data)
            })
        }
        getCiudades()
    }, [])
    async function deletCiudad(evt) {
        try {
          evt.preventDefault()
          Swal.showLoading()
          const id =evt.currentTarget.dataset.value
          await axios({
            url: `${import.meta.env.VITE_SERVER}/EliminarCiudad`,
            method: 'delete',
            data: {
              'id_ciudad': id,
            },
            headers: {
                'Authorization': sessionStorage.getItem('Authorization'),
            },
          }).then((response) => {
            Swal.fire({
            title: `Eliminado`,
            text: 'Se elimino la ciudad correctamente.',
            icon: 'success',
          })
          })
        } catch (error) {
          Swal.fire({
            title: `Error`,
            text: 'Ocurrió un error al eliminar la ciudad. Por favor, inténtalo de nuevo.',
            icon: 'error',
          })
        }
      }
    return (
        <>
            <div className="container column is-9">
                <h1 className="my-5 is-size-4">Ciudades</h1>
                <form onSubmit={guardarCiudad}>
                    <div>
                        <label>Ingresar Ciudad:</label>
                        <input className="input" onChange={changeCiudad} type="text" placeholder="Ingresar nueva categoria" value={ciudad} ></input>
                    </div>
                    <button className="mt-5 button is-link">Guardar</button>
                </form>
            </div>
            <div className="container column is-9">
                <h1 className="my-5 is-size-4">Listado de Ciudades</h1>
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Ciudad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ciudades.map((ciudadn) => (
                            <tr key={ciudadn.id_ciudad}>
                                <td>{ciudadn.ciudad}</td>
                                <td>
                                    <div className="buttons is-right">
                                        <button onClick={deletCiudad} data-value={ciudadn.id_ciudad} className="button is-danger">{<img className='img-card' src={delet} />}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export { Categorias, Ciudades }