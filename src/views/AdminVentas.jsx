import { useEffect, React, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import edit from '../assets/edit.svg'


function AdminVentas() {
  const [pedidos, setPedidos] = useState([])
  const [facturas, setFacturas] = useState([])
  const [modal, setModal] = useState('modal')

  const [factura, setFactura] = useState('')
  useEffect(() => {
    async function getPedidos() {
      await axios({
        url: `${import.meta.env.VITE_SERVER}/ConsultarPedidos`,
        method: 'get',
        headers: {
          'Authorization': sessionStorage.getItem('Authorization'),
        },
      }).then((response) => {
        setPedidos(response.data)
      })
    }
    getPedidos()
  }, [])

  async function getFacturas(id) {
    await axios({
      url: `${import.meta.env.VITE_SERVER}/ConsultarFacturas`,
      method: 'post',
      data: {
        'pedido_id': id,
      },
      headers: {
        'Authorization': sessionStorage.getItem('Authorization'),
      },
    }).then(async (response) => {
      const facturasConNombres = await Promise.all(response.data.map(async (factura) => {
        const nombreProducto = await getProducto(factura.producto_id)
        return {...factura, nombreProducto}
      }))
      setFacturas(facturasConNombres)
    })
  }
  const [loading, setLoading] = useState(false)
  const showModal = async (evt) => {
    const id = evt.currentTarget.dataset.value
    const clienteEncontrado = pedidos.find((element) => element.id_pedido == id)

    if (clienteEncontrado) {
      setLoading(true)
      Swal.showLoading()
      await getFacturas(id)
      setFactura(facturas)
      setModal('modal is-active')
      setLoading(false)
      Swal.close()
    } else {
      console.log(`No se encontró ningún producto con el id ${id}`)
    }
  }
  const closeModal = () => {
    setModal('modal')
    setFacturas([])
  }
  async function getProducto(id) {
    let producto = ''
    await axios({
      url: `${import.meta.env.VITE_SERVER}/ConsultarProductoxID`,
      method: 'post',
      data: {
        'id': id,
      },
      headers: {
        'Authorization': sessionStorage.getItem('Authorization'),
      },
    }).then((response) => {
      producto = response.data.name_producto // Asume que 'nombre' es el campo con el nombre del producto
    })
    return producto
  }
  return (
    <>
      <div>
        <div className={modal}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Informacion del pedido:</p>
              <button onClick={closeModal} className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <div className="container">
                <table className="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>Cantidad</th>
                      <th>Producto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facturas.map((factura) => (
                      <tr key={factura.id_factura}>
                        <td>{factura.cantidad}</td>
                        <td>{factura.nombreProducto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button onClick={closeModal} className="button button is-danger">Cancelar</button>
            </footer>
          </div>
        </div>
        <div className="container">
          <h1 className="my-5 is-size-4">Listado de Ventas</h1>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Id Pedido</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id_pedido}>
                  <td>{pedido.id_pedido}</td>
                  <td>{pedido.fecha}</td>
                  <td>
                    <div className="buttons is-right">
                      <button onClick={showModal} data-value={pedido.id_pedido} className="button is-info">{<img className='img-card' src={edit} />}</button>
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
export default AdminVentas