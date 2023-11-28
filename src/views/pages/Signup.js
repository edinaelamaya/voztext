import React, { useState } from 'react'
import {
    CAlert,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CImage,
  CRow,
} from '@coreui/react'
import logo from '../../assets/images/logo-signin.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SIGNUP_POST_ENDPOINT } from '../../connections/helpers/endpoints'
import validator from 'validator'

const SignupForm = React.lazy(() => import('../../components/pages/SignupForm'))

function Signup() {
    
    const [errores, setErrores]= useState({});
    const navegar=useNavigate();

    const registro= async (usuario, idRol) => {
        
        const error={};
        setErrores(error);

        if(!validator.isNumeric(usuario.idUsuario)){
            error.idUsuario = "Cedula debe ser solo numeros";
          }

        if(validator.isEmpty(usuario.nombre)){
            error.nombre = "Nombre no puede ser vacio";
        }

        if(!validator.isEmail(usuario.email)){
            error.email = "Correo electronico es invalido";
        }

        if(!validator.isLength(usuario.password, {min: 6, max: 12})){
            error.password = "Contraseña debe tener entre 6 y 12 caracteres";
        }

        if(validator.isEmpty(idRol)){
            error.rol = "Rol no puede ser vacio";
        }


        if(!(Object.keys(error).length===0)){
            setErrores(error);
            return;
        }

        await axios.post(SIGNUP_POST_ENDPOINT, {usuario, idRol}, 
                    {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}}
            ).then(respuesta => {
                navegar("/signin")
            }).catch(err => {
                setErrores({ crear: err.response.data })
            })       
    }
 
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
                <CCard className="p-4">    
                    <CCardBody className="text-center text-black">
                        <h1> Instrumentos de gestión educativa </h1>           
                    </CCardBody>
                    <CImage className='mx-auto' src={logo} width={216} height={144} />       
                </CCard>
                <CCard className="p-4">
                    <CCardBody className="d-flex align-items-center justify-content-center">   
                        <SignupForm errores={errores} callback={registro}></SignupForm>                        
                    </CCardBody>
                    {errores.respuesta && <CAlert color="danger">{errores.respuesta}</CAlert>}
                </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}


export default Signup

