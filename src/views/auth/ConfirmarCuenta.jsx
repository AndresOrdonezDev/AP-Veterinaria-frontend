import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Alerta from '../../components/Alerta'


const ConfirmarCuenta = () => {

  const [confirmada, setConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const cuentaConfirmada = async () => {

      try {
        const url = `/veterinarios/confirmar/${token}`
        const { data } = await clienteAxios(url)
        setConfirmada(true)
        setAlerta({
          msg: data.msg,
        })

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false)
    };
    cuentaConfirmada()
  }, [])


  return (

    <>
      <div>
        <h1 className='text-indigo-600 font-black md:text-6xl text-3xl text-center'>Gracias por confirmar <span className='text-black'>tu cuenta</span></h1>

      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
        {!cargando &&
          <Alerta
            alerta={alerta}
          />
        }

        <nav className='mt-10 lg:flex lg:justify-between'>
          {confirmada && (
            <Link
              className='block text-center my-5 text-gray-500 font-bold'
              to="/"
            >Has confirmado tu cuenta ahora puedes <span className='text-indigo-600'>iniciar sesión</span>
            </Link>
          )}
        </nav>
      </div>
    </>
  )
}

export default ConfirmarCuenta