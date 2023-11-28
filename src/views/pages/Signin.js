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
          const nuevoUsuario = command.replace('michelle usuario', '').replace(/\s+/g, ''); // Reemplazar con la lógica real de obtención del nuevo usuario
          setUsername((prevUsername) => prevUsername + nuevoUsuario);
        }
          // Lógic
        if (command.includes('michelle contraseña')){
          
          console.log("entre a contraseña")
          const nuevaContraseña = command.replace('michelle contraseña', '').replace(/\s+/g, ''); // Puedes reemplazar esto con la lógica real de obtención de la nueva contraseña
          setPassword((prevPassword) => prevPassword + nuevaContraseña);
        }
        
        if (command =='michelle iniciar'){
          console.log("entre a iniciar")
          // Lógica para manejar el comando "michelle iniciar"
          enviarFormulario();
        }

    };

    const enviarFormulario = () => {
      // Lógica para enviar la solicitud al backend con axios
      // ...
      console.log("entre a enviarFormulario password",password)
      console.log("entre a enviarFormulario username",username)
      dispatch(authentication({username, password}))
        .then(respuesta=>{
            navegar("/");
        })
        .catch(err=>{
            setErrores({ respuesta: err.response.data });
            setUsername('');
            setPassword('');
        });
      // Actualizar el estado del formulario después de enviar
    };



 
  return (
    <div className="generate">
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


