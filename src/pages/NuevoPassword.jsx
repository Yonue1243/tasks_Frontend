import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta"



const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [tokenValido,setTokenValido] = useState(false)
  const [alerta,setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams();
  const {id} = params;


  useEffect(() => {
    const comprobarToken = async () =>{
      try {
        const url = `/usuarios/olvide-password/${id}`;
        await clienteAxios(url);
        setTokenValido(true);

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken();
  })

  const handleSubmit = async e =>{
    e.preventDefault();

    if(password.length<6) return setAlerta({msg: 'El password es demasiado corto', error:true});

    try {
      const url = `/usuarios/olvide-password/${id}`;
      const {data} = await clienteAxios.post(url, {password});
      setAlerta({
        msg: data.msg,
        error: true
      })
      setPasswordModificado(true)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const {msg} = alerta
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Restablece tu password y no pierdas acceso a tus {" "}
      <span className="text-slate-700">proyectos</span>
    </h1>

    {msg && <Alerta alerta={alerta}/>}

    {tokenValido && (
          <form className="my-10 bg-white shadow rounded-lg p-10">
   
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
              onSubmit={handleSubmit}
            >
             Nuevo Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Escribe tu nuevo Password"
              className="w-full mt-3 p-3 border rounded-xl bg-grey-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
         
          <input
            type="submit"
            value="Guardar nuevo Password"
            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer
             hover:bg-sky-800 transition-colors"
          />
        </form>
    )}


{passwordModificado && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            ¡Logueate!
          </Link>
        )}

  </>
  )
}

export default NuevoPassword