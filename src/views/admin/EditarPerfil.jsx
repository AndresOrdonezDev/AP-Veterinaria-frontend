import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"

import AdminNav from "./AdminNav"
import Alerta from "../../components/Alerta"


const EditarPerfil = () => {

  const { auth, actualizarPerfil } = useAuth()
  const [perfil, setPerfil] = useState({})
  const [alerta, setAlerta] = useState({})


  useEffect(() => {
    setPerfil(auth)
   
  }, [auth])

  

  const handleSubmit = async e => {
    e.preventDefault()

    const { nombre, email } = perfil

    if ([nombre, email].includes('')) {
      setAlerta({
        msg: 'Nombre y Emial son obligatorios',
        error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000)
      return
    }

    const resultado = await actualizarPerfil(perfil)
    
    setAlerta(resultado)
    setTimeout(() => {
      setAlerta({})
    }, 4000);

  }

  const { msg } = alerta

  return (
    <>
      <AdminNav />
      <h2 className="font-bold text-3xl text-center mt-10">Editar perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Cambiar datos  <span className="text-indigo-600 font-bold">personales</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          <form onSubmit={handleSubmit} className="mb-3">

            <div className="my-3">
              <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                value={perfil.nombre || ''}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>



            <div className="my-3">
              <label htmlFor="telefono" className="uppercase font-bold text-gray-600">telefono</label>
              <input
                type="phone"
                name="telefono"
                id="telefono"
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                value={perfil.telefono || ''}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label htmlFor="email" className="uppercase font-bold text-gray-600">email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                value={perfil.email || ''}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label htmlFor="web" className="uppercase font-bold text-gray-600">sitio web</label>
              <input
                type="text"
                name="web"
                id="web"
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                value={perfil.web || ''}
                onChange={e => setPerfil({
                  ...perfil,
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

export default EditarPerfil