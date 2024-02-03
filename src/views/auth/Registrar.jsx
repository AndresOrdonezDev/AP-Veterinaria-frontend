import { Link } from 'react-router-dom'
import { useState } from 'react'
import clienteAxios from '../../config/axios'
import Alerta from '../../components/Alerta'

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
      setTimeout(() => {
        setAlerta({ msg: '', error: false })
      }, 3000)
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no coinciden', error: true })
      setTimeout(() => {
        setAlerta({ msg: '', error: false })
      }, 3000)
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener mínimo 6 caracteres', error: true })
      setTimeout(() => {
        setAlerta({ msg: '', error: false })
      }, 3000)
      return;
    }

    //Crear el susuario en la api
    try {
      await clienteAxios.post('/veterinarios', {nombre,email,password})
      setAlerta({
        msg: `se ha creado el usuario ${nombre}; revisa tu correo para validar`,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg : error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta({ msg: '', error: false })
      }, 3000)
    }
  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black md:text-6xl text-3xl text-center'>Crea tu cuenta y administra tus <span className='text-black'>pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
        {msg && <Alerta
          alerta={alerta}
        />}

        <form onSubmit={handleSubmit}>

          <div className='mt-5'>
            <label htmlFor="nombre"
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder='Ingresa tu nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={nombre}
              onChange={e => setNombre(e.target.value)}

            />
          </div>

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
          <div className='mt-5'>
            <label htmlFor="password"
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Contraseña
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
              Confirmar Contraseña
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
            value="Crear cuenta"
            className='mt-10 bg-indigo-700 rounded-lg text-white font-bold text-xl p-3 w-full hover:bg-indigo-800 uppercase cursor-pointer md:w-auto px-10'
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>

          <Link
            className='block text-center my-5 text-gray-500 font-bold'
            to="/"
          >¿Ya tienes una cuenta? <span className='text-indigo-600'>Inicia sesión</span>
          </Link>


        </nav>
      </div>
    </>

  )
}

export default Registrar