import {createContext, useState, useEffect} from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'
const PacientesContext = createContext()

export const PacientesProvider = ({children})=>{

    const {auth} = useAuth()

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(()=>{
        const obtenerPacintes = async ()=>{
            try {
                const token = localStorage.getItem('token_apv')
                if(!token) return

                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const {data} = await clienteAxios('/pacientes',config)
                setPacientes(data.reverse())
                
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacintes()
    },[pacientes, auth])

    const guardarPaciente = async (paciente) =>{

        const token = localStorage.getItem('token_apv')
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config)
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizados)

            } catch (error) {
                console.log(error)
            }
        }else{
            try {
               
                const {data} = await clienteAxios.post('/pacientes',paciente,config)
                
                setPacientes([data, ...pacientes])
               
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }        
    }

    const setEdicion = (paciente)=>{
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Quires eliminar este paciente?')
        if(confirmar){
           try {
            const token = localStorage.getItem('token_apv')
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
           await clienteAxios.delete(`/pacientes/${id}`,config)

           } catch (error) {
            console.log(error)

           }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                paciente,
                guardarPaciente,
                setEdicion,
                eliminarPaciente
            }}
        >
           {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;