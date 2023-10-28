import { useState } from 'react'
// import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import edit from '../assets/edit.svg'
import delet from '../assets/delete.svg'
function CrearProducto() {
  // const parametros = useParams()
  const [producto, setProducto] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [inventario, setInventario] = useState('')
  const [foto, setFoto] = useState('')
  const [categoria, setCategoria] = useState('')
  const changeCategoria = (evt) => {
    setCategoria(evt.target.value)
  }
  const changeProducto = (evt) => {
    setProducto(evt.target.value)
  }
  const changeFoto = (evt) => {
    setFoto(evt.target.files[0])
  }
  const changePrecio = (evt) => {
    setPrecio(evt.target.value)
  }
  const changeInventario = (evt) => {
    setInventario(evt.target.value)
  }
  const changeDescripcion = (evt) => {
    setDescripcion(evt.target.value)
  }

  async function subirArchivo() {
    const data = new FormData()
    data.append('filename', foto)

    const response = await axios({
      url: `${import.meta.env.VITE_SERVER}/uploadFile`,
      method: 'POST',
      data: data,

      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': sessionStorage.getItem('Authorization'),
      },
    })

    return response.data.downloadURL
  }

  async function crearProducto(urlD) {
    await axios({
      url: `${import.meta.env.VITE_SERVER}/CrearProducto`,
      method: 'POST',
      data: {
        'name_producto': producto,
        'precio': precio,
        'descripcion': descripcion,
        'inventario': inventario,
        'cod_categoria': categoria,
        'url': urlD,
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
      const urlD = await subirArchivo()
      await crearProducto(urlD)
      Swal.fire({
        title: `Creacion Exitosa`,
        text: 'El producto se ha creado correctamente.',
        icon: 'success',
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar el producto. Por favor, inténtalo de nuevo.',
        icon: 'error',
      })
    }
  }
  const Urlw = `${import.meta.env.VITE_SERVER}`
  const [categorias, setCategorias] = useState([])
  useEffect(() => {
    async function getCategorias() {
      await axios({
        url: `${Urlw}/ConsultarCategoria`,
        method: 'get',
      }).then((response) => {
        setCategorias(response.data)
      })
    }
    getCategorias()
  }, [])
  return (
    <div className="container column is-9">
      <h1 className="my-5 is-size-4">Crear Productos</h1>
      <form onSubmit={guardarProducto}>
        <div>
          <label>Producto</label>
          <input className="input" onChange={changeProducto} type="text" placeholder="Ingresa el nombre del producto" value={producto} ></input>
        </div>
        <div>
          <label>Descripcion</label>
          <input className="input" onChange={changeDescripcion} type="text" placeholder="Ingresa una Descripcion" value={descripcion}></input>
        </div>
        <div>
          <label>Precio</label>
          <input className="input" onChange={changePrecio} type="number" placeholder="Ingresa el precio del producto" value={precio}></input>
        </div>
        <div>
          <label>Categoria</label><br />
          <div className="select is-fullwidth">
            <select className="select is-fullwidth" onChange={changeCategoria}>
            <option>Sellecione la categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nom_categoria}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>Inventario</label>
          <input className="input" onChange={changeInventario} type="number" placeholder="Ingresa las unidades recibidas" value={inventario}></input>
        </div>
        <div>
          <label>Foto</label>
          <input className="input" type="file" onChange={changeFoto} placeholder="Ingresa una url de una imagen" ></input>
        </div>
        <button className="mt-5 button is-link">Guardar</button>
      </form>
    </div>
  )
}

function ConsultarProductos() {
  const [modal, setModal] = useState('modal')
  const [productos, setProductos] = useState([])
  const Url = `${import.meta.env.VITE_SERVER}`

  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [inventario, setInventario] = useState('')
  const changePrecio = (evt) => {
    setPrecio(evt.target.value)
  }
  const changeInventario = (evt) => {
    setInventario(evt.target.value)
  }
  const changeDescripcion = (evt) => {
    setDescripcion(evt.target.value)
  }
  // console.log(Url)
  useEffect(() => {
    async function getProductos() {
      await axios({
        url: `${Url}/ConsultarProducto`,
        method: 'get',
      }).then((response) => {
        setProductos(response.data)
      })
    }
    getProductos()
  }, [])
  const [producto, setProducto] = useState('')
  const [loading, setLoading] = useState(false)

  const showModal = (evt) => {
    const id = evt.currentTarget.dataset.value
    const productoEncontrado = productos.find((element) => element.id_producto == id)

    if (productoEncontrado) {
      setLoading(true)
      setProducto(productoEncontrado)
      setPrecio(productoEncontrado.precio || '')
      setInventario(productoEncontrado.inventario || '')
      setDescripcion(productoEncontrado.descripcion || '')
      setModal('modal is-active')
      setLoading(false)
    } else {
      console.log(`No se encontró ningún producto con el id ${id}`)
    }
  }
  const closeModal = () => {
    setModal('modal')
    setPrecio('')
    setInventario('')
    setDescripcion('')
  }
  async function saveChanges(evt) {
    try {
      evt.preventDefault()
      Swal.showLoading()
      await axios({
        url: `${import.meta.env.VITE_SERVER}/ModificarProducto`,
        method: 'put',
        data: {
          'id_producto': producto.id_producto,
          'descripcion': descripcion,
          'precio': precio,
          'inventario': inventario,
        },
        headers: {
          'Authorization': sessionStorage.getItem('Authorization'),
        },
      }).then((response) => {
        Swal.fire({
          title: `Modificacion Exitosa`,
          text: 'El producto se ha modificado correctamente.',
          icon: 'success',
        })
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar el producto. Por favor, inténtalo de nuevo.',
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
        url: `${import.meta.env.VITE_SERVER}/EliminarProducto`,
        method: 'delete',
        data: {
          'id_producto': id,
        },
        headers: {
          'Authorization': sessionStorage.getItem('Authorization'),
        },
      }).then((response) => {
        Swal.fire({
          title: `Eliminado`,
          text: 'Se elimino el producto correctamente.',
          icon: 'success',
        })
      })
      // Swal.close()
    } catch (error) {
      Swal.fire({
        title: `Error`,
        text: 'Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo.',
        icon: 'error',
      })
    }
  }
  return (
    <div className='columns is-12 is-multiline ml-1 mt-2 mr-0 pl-1 pm-card' >
      <div className={modal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Editar producto: {loading ? <p>Cargando...</p> : producto.name_producto}</p>
            <button onClick={closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <form>
              <figure className="image img-200px pm-card-img">
                <img src={producto.url} alt="Placeholder image" />
              </figure>
              <div>
                <label>Descripcion</label>
                <input className="input" onChange={changeDescripcion} type="text" placeholder="Ingresa una Descripcion" value={descripcion}></input>
              </div>
              <div>
                <label>Precio</label>
                <input className="input" onChange={changePrecio} type="number" placeholder="Ingresa el precio del producto" value={precio}></input>
              </div>
              <div>
                <label>Inventario</label>
                <input className="input" onChange={changeInventario} type="number" placeholder="Ingresa las unidades recibidas" value={inventario}></input>
              </div>
            </form>
          </section>
          <footer className="modal-card-foot">
            <button onClick={saveChanges} className="button button is-link">Guardar cambios</button>
            <button onClick={closeModal} className="button button is-danger">Cancelar</button>
          </footer>
        </div>
      </div>
      {productos.map((producto) => (
        <div key={producto.id_producto} className='card column is-flex-wrap-wrap pm-card-card mx-1'>
          <div className="card-image  is-flex is-justify-content-center">
            <figure className="image img-200px pm-card-img">
              <img src={producto.url} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content p-1">
            <div className="content">
              <p className=' mb-2 has-text-link-dark has-text-weight-bold is-size-5'>${producto.precio ? producto.precio.toLocaleString('es-CO') : ''}</p>
              <p className='has-text-black-bis has-text-weight-medium is-size-6'>{producto.name_producto}</p>
            </div>
          </div>
          <footer className="card-footer">
            <button data-value={producto.id_producto} onClick={showModal} className="card-footer-item p-2 m-1 button is-link">
              {<img className='img-card' src={edit} />}
            </button>
            <button data-value={producto.id_producto} onClick={deletProduct} className="card-footer-item p-2 m-1 button is-danger">
              {<img className='img-card' src={delet} />}
            </button>
          </footer>
        </div>
      ))}

    </div>
  )
}

export { CrearProducto, ConsultarProductos }
