import { useState } from "react"
import useAuth from "../../hooks/useAuth"

import AdminNav from "./AdminNav"
import Alerta from "../../components/Alerta"


const CambiarPassword = () => {
  
  const { guardarPassword } = useAuth()

  const [password, setPassword] = useState({
    actual:'',
    nueva:'',
    confirmar:''
  })
 
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if (Object.values(password).some(campo => campo === '')) {
      setAlerta({
        msg: 'Todos los son obligatorios',
        error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000)
      return
    }

    if (password.nueva !== password.confirmar) {
      setAlerta({
        msg: 'nueva contraseña y confirmar deben ser iguales',
        error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000)
      return
    }

    if (password.nueva.length < 6) {
      setAlerta({
        msg: 'La contraseña debe tener mínimo 6 caracteres',
        error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000)
      return
    }

    //despues de validar los campos del formulario
    const respuesta = await guardarPassword(password)

    setAlerta(respuesta)


  }

 
  const { msg } = alerta
  
  return (
    <>
    <AdminNav/>
    <h2 className="font-bold text-3xl text-center mt-10">Cambiar Password</h2>
    <p className="text-xl mt-5 mb-10 text-center">Modifica tu  <span className="text-indigo-600 font-bold">contraseña</span></p>

    <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          <form onSubmit={handleSubmit} className="mb-3">

            <div className="my-3">
              <label htmlFor="actual" className="uppercase font-bold text-gray-600">actual contraseña</label>
              <input
                type="password"
                name="actual"
                id="actual"
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                placeholder="Escribe tu contraseña actual"             
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
                
              />
            </div>



            <div className="my-3">
              <label htmlFor="nueva" className="uppercase font-bold text-gray-600">nueva contraseña</label>
              <input
                type="password"
                name="nueva"
                id="nueva"
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                placeholder="Escribe la nueva contraseña"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label htmlFor="confirmar" className="uppercase font-bold text-gray-600">confirmar contraseña</label>
              <input
                type="password"
                name="confirmar"
                id="confirmar"
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                placeholder="Escribe nuevamente la nueva contraseña"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            

            <input
              type="submit"
              className="border bg-indigo-600 hover:bg-indigo-800 transition-colors text-white font-black px-3 py-2 rounded-lg text-lg w-full"
              value="Guardar"
            />

          </form>
          
          {msg &&
            <Alerta
              alerta={alerta}
            />}
        </div>
      </div>
     
    </>
  )
}

export default CambiarPassword