import React, { useEffect, useState } from 'react'
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
import VoiceRecognition from '../../components/VoiceRecognition'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './logins.css'
import validator from 'validator'
import { authentication } from '../../connections/usuarioDispatch'

const SigninForm = React.lazy(() => import('../../components/pages/SigninForm'))

function Signin() {
    
    const [errores, setErrores]= useState({});
    const conectado=useSelector(state=>state.connected);
    const navegar=useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleCommand = (command) => {
        if (command.includes('michelle usuario')){
          console.log("entre a usuario")
          const nuevoUsuario = command.replace('michelle usuario', '').replace(/\s+/g, ''); 
          setUsername((prevUsername) => prevUsername + nuevoUsuario);
        }
          // Lógic
        if (command.includes('michelle contraseña')){
          
          console.log("entre a contraseña")
          const nuevaContraseña = command.replace('michelle contraseña', '').replace(/\s+/g, ''); 
          setPassword((prevPassword) => prevPassword + nuevaContraseña);
        }
        
        if (command =='michelle iniciar'){
          console.log("entre a iniciar")
          enviarFormulario();
        }

    };

    const enviarFormulario = () => {
     
      console.log("enviarFormulario password",password)
      console.log("entre a enviarFormulario username",username)
      fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernames: username,
          passwords: password,
        }),
      })
        .then(response => {
          if (response.ok) {
            console.log('Inicio de sesión exitoso');
            window.location.href = '/documentos'; 
          } else {
            console.error('Error al iniciar sesión');
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
    };



 
  return (
    <div className="brillant-lines">
      <div className='movi'></div>
      <CContainer>
          <SigninForm
            errores={errores}
            username={username} // Pasar el valor de username como prop
            password={password} // Pasar el valor de password como prop
            callback={({ username, password }) => {
              setUsername(username);
              setPassword(password);
            }}
          />
        {errores.respuesta && <CAlert color="danger">{errores.respuesta}</CAlert>}
       
      </CContainer>
      <VoiceRecognition onCommand={handleCommand} />
    </div>
  )
}


export default Signin


