import { useState, useEffect, React } from 'react'
import axios from 'axios'
import '../index.scss'

function About() {
  const [quienessomos, setQuienessomos] = useState('')
  const [mision, setMision] = useState('')
  const [vision, setVision] = useState('')
  useEffect(() => {
    async function getMensajes() {
      await axios({
        url: `${import.meta.env.VITE_SERVER}/ConsultarMensajes`,
        method: 'get',
      }).then((response) => {
        setQuienessomos(response.data.quienes_somos)
        setMision(response.data.mision)
        setVision(response.data.vision)
      })
    }
    getMensajes()
  }, [])
  return (
    <div className="container column is-10  mt-6">
      <h1 className="my-5 is-size-4 title is-3">DyD Market</h1>
      <form className='mt-3'>
        <div className='mt-3'>
          <p className='title is-4'>Quienes Somos:</p>
          <p>{quienessomos}</p>
        </div>
        <div className='mt-3'>
          <p className='title is-4'>Mision:</p>
          <p>{mision}</p>
        </div>
        <div className='mt-3'>
          <p className='title is-4'>Vision:</p>
          <p>{vision}</p>
        </div>
      </form>
    </div>
  )
}

export default About