import { useState } from 'react'

import Formulario from "../../components/Formulario"
import ListadoPacientes from "../../components/ListadoPacientes"

const AdministrarPacientes = () => {
  const [mostrarForm, setMostrarForm] = useState(false)

  return (
    <>
      
      <div className="flex flex-col md:flex-row">
      <button
        type='button'
        className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-lg mb-10 md:hidden'
        onClick={() => setMostrarForm(!mostrarForm)}
      >
       {mostrarForm ? 'Ocultar formulario' : ' Nuevo registro'}
      </button>
        <div className={`${mostrarForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
          <Formulario />
        </div>

        <div className="md:w-1/2 lg:w-3/5 mt-10 md:mt-0">
          <ListadoPacientes />
        </div>
      </div>

    </>
  )
}

export default AdministrarPacientes