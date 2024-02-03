import {useState, useEffect} from 'react'
import usePacientes from '../hooks/usePacientes'

import Alerta from './Alerta'

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha_registro, setFecha_registro] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes()

    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setTelefono(paciente.telefono)
            setFecha_registro(paciente.fecha_registro)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
            
        }
    },[paciente])
    

    const handleSubmit = e =>{
        e.preventDefault()

        //validar formulario

        if([nombre, propietario, telefono, fecha_registro, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }
       
        guardarPaciente({nombre,propietario,telefono,fecha_registro,sintomas,id})
        setAlerta({
            msg: 'Guardado correctamente'
        })
        setTimeout(() => {
            setAlerta({})
        }, 4000);
        resetFormulario()
    }
    const {msg} = alerta

    const resetFormulario = () => {
        setNombre('');
        setPropietario('');
        setTelefono('');
        setSintomas('');
        setId(null);
        document.querySelector('#fecha').value = ''
      };

  return (
    <>
   
    <h2 
          className=" font-bold text-3xl text-center"
        >Agregar y administrar tus 
        <span className="text-indigo-600"> Pacientes</span>
        </h2>
    
    <form 
        className="bg-white py-10 px-5 shadow-md rounded-lg mb-5 mt-10"
        onSubmit={handleSubmit}
    >
        
        <div className="mb-5">
            <label 
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold"
            >Nombre Mascota</label>

            <input 
                type="text" 
                id="nombre"
                placeholder="Nombre de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="propietario"
                className="text-gray-700 uppercase font-bold"
            >Nombre propietario</label>

            <input 
                type="text" 
                id="propietario"
                placeholder="Nombre del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label 
                htmlFor="contacto"
                className="text-gray-700 uppercase font-bold"
            >Número contacto</label>

            <input 
                type="phone" 
                id="contacto"
                placeholder="Número para contactar al propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="fecha"
                className="text-gray-700 uppercase font-bold"
            >Fecha de registro</label>

            <input 
                type="date" 
                id="fecha"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                
                onChange={e => setFecha_registro(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="sintomas"
                className="text-gray-700 uppercase font-bold"
            >Describir sintomas</label>

            <textarea 
                id="sintomas"
                placeholder="Describir síntomas del paciente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
            />
        </div>

        <input 
            className="bg-indigo-600 p-3 text-white font-bold  rounded-md w-full uppercase hover:bg-indigo-800 cursor-pointer transition-colors" 
            type="submit" 
            value={id ? 'Actualizar registro' : 'Guardar registro'}
        />

    </form>
    {msg && <Alerta alerta={alerta}/>}
    </>
  )
}

export default Formulario