import { useState, useEffect, React } from 'react'
import axios from 'axios'
function HowWhereShop() {
  const [comocomprar, setComocomprar] = useState('')
  const [dondecomprar, setDondecomprar] = useState('')

  useEffect(() => {
    async function getMensajes() {
      await axios({
        url: `${import.meta.env.VITE_SERVER}/ConsultarMensajes`,
        method: 'get',
      }).then((response) => {
        setComocomprar(response.data.como_comprar)
        setDondecomprar(response.data.donde_comprar)
      })
    }
    getMensajes()
  }, [])
  return (
    <div className="container column is-10 mt-6">
      <h1 className="my-5 is-size-4 title is-3">DyD Market</h1>
      <form >
        <div className='mt-3'>
          <p className='title is-4'>Donde Comprar:</p>
          <p>{dondecomprar}</p>
        </div>
        <div className='mt-3'>
          <p className='title is-4'>Como comprar:</p>
          <p>{comocomprar}</p>
        </div>
      </form>
    </div>
  )
}

export default HowWhereShop