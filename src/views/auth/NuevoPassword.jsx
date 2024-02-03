import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Alerta from '../../components/Alerta';
import clienteAxios from '../../config/axios';

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/recuperacion/${token}`)
        setAlerta({ msg: 'Ingresa tu nueva contraseña' })
        setTokenValido(true)

      } catch (error) {
        setAlerta({ msg: 'Hubo un error con el enlace', error: true })
      }
    };
    comprobarToken()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([password, repetirPassword].includes('')) {
      setAlerta({ msg: 'LLena todos los campos', error: true })
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no coinciden', error: true })
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener mínimo 6 caracteres', error: true })
      return;
    }

    //crear la nueva contraseña 
    try {
      const url = `/veterinarios/recuperacion/${token}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({msg: data.msg})
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({ 
        msg: error.response.data.msg, 
        error: true 
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1
          className='text-indigo-600 font-black md:text-6xl text-3xl text-center'
        >Crea una nueva contraseña e
          <span className='text-black'> inicia sesión</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>
          <form onSubmit={handleSubmit}>

            <div className='mt-5'>
              <label htmlFor="password"
                className='uppercase text-gray-600 block text-xl font-bold'
              >
                Nueva Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder='Ingresa tu constraseña'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='mt-5'>
              <label htmlFor="passwordConfirmar"
                className='uppercase text-gray-600 block text-xl font-bold'
              >
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="passwordConfirmar"
                placeholder='Ingresa tu constraseña nuevamente'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Guardar cambios"
              className='mt-10 bg-indigo-700 rounded-lg text-white font-bold text-xl p-3 w-full hover:bg-indigo-800 uppercase cursor-pointer md:w-auto px-10'
            />
          </form>
          <nav className='mt-10 lg:flex lg:justify-between'>

         
          {passwordModificado && (
             <Link
             className='block text-center my-5 text-gray-500 font-bold'
             to="/"
           >Intentar <span className='text-indigo-600'>Iniciar sesión</span>
           </Link>
          )}

        </nav>
        </>
        )}


      </div>
    </>
  )
}

export default NuevoPassword