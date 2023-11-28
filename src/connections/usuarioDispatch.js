import axios from "axios"
import { SIGIN_POST_ENDPOINT } from "./helpers/endpoints"
import { jwtDecode } from 'jwt-decode'
import {setAuthToken} from "./helpers/token";
import { login } from "../states/sliceReducers";

export const authentication = (data) => dispatch => {
    
    return new Promise((resolve, reject) => {

        axios.post(SIGIN_POST_ENDPOINT, data, 
            {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(result => {
                        
            const {authorization} = result.headers;

            localStorage.setItem('token', authorization);

            setAuthToken(authorization);

            const decoded= jwtDecode(authorization); 

            dispatch(login({connected:true, user:decoded}))

            resolve(result);
            
        }).catch(err => {
            reject(err);
        })
    })
}

export const cerrarSesion = () => dispatch => {

    localStorage.removeItem('token');

    setAuthToken(false);

    dispatch(login({connected:false, user:{}}));
}


