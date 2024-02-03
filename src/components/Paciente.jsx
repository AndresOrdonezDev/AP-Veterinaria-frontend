import usePacientes from "../hooks/usePacientes"

const Paciente = ({ paciente }) => {

    const { setEdicion, eliminarPaciente} = usePacientes()

    const { nombre, propietario, telefono, fecha_registro, sintomas, _id } = paciente

    const formatearFecha = fecha => {
        if(!fecha) return 'no hay fecha'

        try {
            const nuevaFecha =  new Date(fecha)

            // Aumentar un día ya que por la zona horaria le resta uno a la fecha del que registra el form
            nuevaFecha.setDate(nuevaFecha.getDate() + 1);

            return  new Intl.DateTimeFormat('es-CO', { dateStyle: 'long' }).format(nuevaFecha)

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="mx-5 my-10 bg-white shadow-lg px-5 py-10 rounded-xl flex flex-col gap-2">
            <p
                className="font-bold uppercase text-indigo-800"
            >nombre:
                <span className="font-normal normal-case text-black text-lg"> {nombre}</span>
            </p>
            <p
                className="font-bold uppercase text-indigo-800"
            >propietario:
                <span className="font-normal normal-case text-black text-lg"> {propietario}</span>
            </p>
            <p
                className="font-bold uppercase text-indigo-800"
            >telefono:
                <span className="font-normal normal-case text-black text-lg"> {telefono}</span>
            </p>
            <p
                className="font-bold uppercase text-indigo-800"
            >fecha registro:
                <span className="font-normal normal-case text-black text-lg"> {formatearFecha(fecha_registro)}</span>
            </p>
            <p
                className="font-bold uppercase text-indigo-800"
            >sintomas:
                <span className="font-normal normal-case text-black text-lg"> {sintomas}</span>
            </p>

            <div className="flex justify-between mt-5">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-lg"
                    onClick={() => setEdicion(paciente)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase font-bold rounded-lg"
                    onClick={()=>eliminarPaciente(_id)}
                >
                    Eliminar
                </button>

            </div>
        </div>
    )
}

export default Paciente