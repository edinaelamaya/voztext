import axios from "axios";
import {jwtDecode } from "jwt-decode"
import {store} from "../../states/store";
import { login } from "../../states/sliceReducers";
import { cerrarSesion } from "../usuarioDispatch";


export const setAuthToken= (token) => {
   console.log("token")
}


export const getAuthToken=()=>{
    
    console.log("token2")
}

