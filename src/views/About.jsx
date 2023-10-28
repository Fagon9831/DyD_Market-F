import { useState, useEffect, React } from 'react'
import axios from 'axios'


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
      <h1 className="my-5 is-size-4">DyD Market</h1>
      <form >
        <div>
          <p>Quienes Somos:</p>
          <p>{quienessomos}</p>
        </div>
        <div>
          <p>Mision:</p>
          <p>{mision}</p>
        </div>
        <div>
          <p>Vision:</p>
          <p>{vision}</p>
        </div>
      </form>
    </div>
  )
}

export default About