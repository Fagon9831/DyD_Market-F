import {useEffect, useState, React} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import ShopingCar from '../assets/ShopingCar.svg'
import Swal from 'sweetalert2'
function Category({allproducts, setAllproducts, countProducts, setcountProducts, total, setTotal }) {
  const parametros = useParams()
  const Url = `${import.meta.env.VITE_SERVER}`
  const [producto, setProducto] = useState([])
   console.log(Url)
  const [productos, setProductos] = useState([])
  useEffect(() => {
    async function getProductos() {
      await axios({
        url: `${Url}/ConsultarProductoxCat/${parametros.id}`,
        method: 'get',
      }).then((response) => {
        const productosConCantidad = response.data.map(producto => ({
          ...producto,
          quantity: 1,
        }))
        setProductos(productosConCantidad)
      })
    }
    getProductos()
  }, [parametros.id])
  const onAddProduct=(producto)=>{
    Swal.showLoading()
          if(allproducts.find(item => item.id_producto===producto.id_producto)) {
        const products = allproducts.map( item =>
        item.id_producto===producto.id_producto ? {...item, quantity: item.quantity+1} :item )
        setTotal(parseFloat(total)+ parseFloat(producto.precio)* parseInt(producto.quantity) )
        setcountProducts(parseInt(countProducts) +parseInt(producto.quantity))
        Swal.close()
        return setAllproducts([...products])
      }
      setTotal(parseFloat(total)+ parseFloat(producto.precio)* parseInt(producto.quantity) )
      setcountProducts(parseInt(countProducts) +parseInt(producto.quantity))
      setAllproducts([...allproducts, producto])
      Swal.close()
  }
  const [modal, setModal] = useState('modal')
  const [loading, setLoading] = useState(false)
  const showModal = (evt) => {
    const id = evt.currentTarget.dataset.value
    const productoEncontrado = productos.find((element) => element.id_producto == id)

    if (productoEncontrado) {
      setLoading(true)
      setProducto(productoEncontrado)
      setModal('modal is-active')
      setLoading(false)
    } else {
      console.log(`No se encontró ningún producto con el id ${id}`)
    }
  }
  const closeModal = () => {
    setModal('modal')
  }

  return (
    <>
    <div className={modal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Informacion del producto: {producto.name_producto}</p>
            <button onClick={closeModal} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="container is-flex is-flex-direction-row">
              <figure className="image img-200px pm-card-img is-flex">
                <img src={producto.url} alt="Placeholder image" />
              </figure>
              <div>
                <p className='mb-2 has-text-weight-bold is-size-5'>Descripcion:</p>
                <p className='mb-2  has-text-weight-bold is-size-5'>{producto.descripcion ? producto.descripcion : ''}</p>
              </div>
            </div>
            <div className="card-content p-1">
              <div className="content">
                <p className=' mb-2 has-text-link-dark has-text-weight-bold is-size-5'>${producto.precio ? producto.precio.toLocaleString('es-CO') : ''}</p>
                <p className='has-text-black-bis has-text-weight-medium is-size-6'>{producto.name_producto}</p>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button onClick={closeModal} className="button button is-danger is-hover">Cerrar</button>
            <button onClick={() => onAddProduct(producto)} className=" button p-2 m-1 card-ashop">Agregar al carrito
              <img className='card-icon' src={ShopingCar} />
            </button>
          </footer>
        </div>
      </div>
    <div className='columns is-12 is-multiline ml-1 mt-6 mr-0 pl-1 pm-card' >
      {productos.map((producto) => (
        <div key={producto.id_producto} className='card column is-flex-wrap-wrap pm-card-card mx-1'>
          <div className="card-image  is-flex is-justify-content-center" >
            <figure className="image img-200px pm-card-img" onClick={showModal} data-value={producto.id_producto} >
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
          <button onClick={() => onAddProduct(producto)} className="card-footer-item p-2 m-1 card-ashop">Agregar al carrito
            <img className='card-icon' src={ShopingCar}/>
            </button>
          </footer>
        </div>
      ))}

    </div>
    </>
  )
}

export default Category