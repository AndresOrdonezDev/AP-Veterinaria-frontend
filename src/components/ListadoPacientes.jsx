import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"


const ListadoPacientes = () => {

  const { pacientes } = usePacientes()


  return (
    <>
      {pacientes.length ?
        (
          <>
            <h2
              className=" font-bold text-3xl text-center"
            >Listado de
              <span className="text-indigo-600"> Pacientes</span>
            </h2>


            {pacientes.map((paciente,index) => (
              <Paciente
                key={index}
                paciente={paciente}
              />
            ))}


          </>
        ) :
        (
          <>
            <h2
              className=" font-bold text-3xl text-center md:mt-20"
            >No has registrado
              <span className="text-indigo-600"> Pacientes</span>
            </h2>
          </>
        )}
    </>
  )
}

export default ListadoPacientes