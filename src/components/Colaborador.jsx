import useProyectos from "../hooks/useProyectos";
const Colaborador = ({ colaborador }) => {
    const {handleModalEliminarColaborador} = useProyectos()
    console.log(colaborador)
  const { nombre, email } = colaborador;
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 rounded-lg uppercase font-bold text-white text-sm px-4 py-3"
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaborador;
