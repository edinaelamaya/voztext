import axios from "axios";
import {jwtDecode } from "jwt-decode"
import {store} from "../../states/store";
import { login } from "../../states/sliceReducers";
import { cerrarSesion } from "../usuarioDispatch";


export const setAuthToken= (token) => {
    if(token){
        axios.defaults.headers.common["Authorization"]=token;
    }else{
        delete axios.defaults.headers.common["Authorization"];
    }
}


export const getAuthToken=()=>{
    
    if(localStorage.token){

        setAuthToken(localStorage.token);

        const decoded = jwtDecode(localStorage.token);

        store.dispatch(login({connected: true, user: decoded}))

        const tiempoActual= Math.floor(Date.now() / 1000);

        if(decoded.exp < tiempoActual){
            store.dispatch(cerrarSesion());
            window.location.href="/signin";
        }
    }
}

