import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";


const AuthContext = createContext();


const AuthProvider = ({children}) =>{

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate()


    useEffect(() =>{
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token');

            if(!token) return setCargando(false);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/usuarios/perfil', config);
                setAuth(data)
                if(data._id && location.pathname === '/') {
                    navigate('/proyectos')
                 }
            } catch (error) {
                console.log(error)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    },[])

    const cerrarSesionAuth = () =>{
        setAuth({})
    }


    return(
        <AuthContext.Provider
        value={{
            setAuth,
            auth,
            cargando,
            cerrarSesionAuth
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}


export default AuthContext