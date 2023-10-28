import { useState, useEffect, React } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'


function Branding() {
    const [quienessomos, setQuienessomos] = useState('')
    const [mision, setMision] = useState('')
    const [vision, setVision] = useState('')
    const [dondecomprar, setDondecomprar] = useState('')
    const [comocomprar, setComocomprar] = useState('')

    const changeQuienesSomos = (evt) => {
        setQuienessomos(evt.target.value)
    }
    const changeMision = (evt) => {
        setMision(evt.target.value)
    }
    const changeVision = (evt) => {
        setVision(evt.target.value)
    }
    const changeDondecomprar = (evt) => {
        setDondecomprar(evt.target.value)
    }
    const changeComocomprar = (evt) => {
        setComocomprar(evt.target.value)
    }

    async function guardarMensaje(evt) {
        try {
            evt.preventDefault()
            Swal.showLoading()
            await axios({
                url: `${import.meta.env.VITE_SERVER}/ModificarMensajes`,
                method: 'put',
                data: {
                    'quienes_somos': quienessomos,
                    'mision': mision,
                    'vision': vision,
                    'donde_comprar': dondecomprar,
                    'como_comprar': comocomprar,
                },
                headers: {
                    'Authorization': sessionStorage.getItem('Authorization'),
                },
            }).then((response) => {
                Swal.fire({
                    title: `Guardado`,
                    text: 'Se han guardo los mensajes de branding correctamente.',
                    icon: 'success',
                  })
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al guardar el mensaje. Por favor, inténtalo de nuevo.',
                icon: 'error',
            })
        }
    }
    // const [mensajes, setMensajes] = useState([])
    useEffect(() => {
        async function getMensajes() {
            await axios({
                url: `${import.meta.env.VITE_SERVER}/ConsultarMensajes`,
                method: 'get',
            }).then((response) => {
                // setMensajes(response.data)
                setQuienessomos(response.data.quienes_somos)
            setMision(response.data.mision)
            setVision(response.data.vision)
            setDondecomprar(response.data.donde_comprar)
            setComocomprar(response.data.como_comprar)
            })
        }
        getMensajes()
    }, [])
    return (
        <div className="container column is-9">
            <h1 className="my-5 is-size-4">Modificar mensajes de branding</h1>
            <form onSubmit={guardarMensaje}>
                <div>
                    <label>Quienes Somos:</label>
                    <input className="input" onChange={changeQuienesSomos} type="text" placeholder="Ingresa tu presentacion" value={quienessomos} ></input>
                </div>
                <div>
                    <label>Mision</label>
                    <input className="input" onChange={changeMision} type="text" placeholder="Ingrese su mision" value={mision}></input>
                </div>
                <div>
                    <label>Vision</label>
                    <input className="input" onChange={changeVision} type="text" placeholder="Ingrese su vision" value={vision}></input>
                </div>
                <div>
                    <label>Donde Comprar</label>
                    <input className="input" onChange={changeDondecomprar} type="text" placeholder="Ingrese la informacion de donde comprar" value={dondecomprar}></input>
                </div>
                <div>
                    <label>Como Comprar</label>
                    <input className="input" onChange={changeComocomprar} type="text" placeholder="Ingrese la informacion de como comprar" value={comocomprar}></input>
                </div>
                <button className="mt-5 button is-link">Guardar</button>
            </form>
        </div>
    )
}
export default Branding