import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function RutaPrivada() {

    const conectado=useSelector(state=>state.connected);

    return (conectado) ? <Outlet /> : <Navigate to={"/documentos"} replace/>
         
}

export default RutaPrivada


