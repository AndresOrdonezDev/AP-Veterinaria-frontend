import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../../components/Alerta';
import clienteAxios from '../../config/axios';
import useAuth from '../../hooks/useAuth';

const OlvidePassword = () => {

  const {auth} = useAuth()

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email === '') {
      setAlerta({ msg: 'El Email es obligatorio', error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }
    if (email.length < 12) {
      setAlerta({ msg: 'Usa un Email válido', error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    //enviar instrucciones
    try {
      const {data} = await clienteAxios.post('/veterinarios/recuperacion',{email})
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }
  }

  const { msg } = alerta



  return (

    <>
      <div>
        <h1 className='text-indigo-600 font-black md:text-6xl text-3xl text-center'>Recuperar sesión para no perder tus <span className='text-black'>pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className='mt-5'>
            <label htmlFor="email"
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='Ingresa tu correo eletrónico'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>


          <input
            type="submit"
            value="Recibir Instrucciones"
            className='mt-10 bg-indigo-700 rounded-lg text-white font-bold text-xl p-3 w-full hover:bg-indigo-800 uppercase cursor-pointer md:w-auto px-10'
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>

          <Link
            className='block text-center my-5 text-gray-500 font-bold'
            to="/"
          >Volver a intentar <span className='text-indigo-600'>iniciar sesión</span>
          </Link>


        </nav>
      </div>
    </>
  )
}

export default OlvidePassword