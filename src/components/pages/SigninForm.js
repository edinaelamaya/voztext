import { useState } from 'react'
import {
    CButton,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import './Login.css';
import { cilLockLocked, cilUser } from '@coreui/icons'

function SigninForm(props) {

    const { username, password, errores, callback } = props;

    const enviarFormulario = (e) => {
        e.preventDefault();
        props.callback({username, password});
    }

    return (
        <div className='generate'>
            <div className='container-log'>
                <CForm className="text-center" onSubmit={enviarFormulario}>
                    <h2>Iniciar sesion</h2>
                    <CInputGroup className="mt-4">
                        <CInputGroupText>
                            <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput 
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => callback({ username: e.target.value, password })}
                            autoComplete="username"
                            feedback={props.errores.username}
                            invalid={props.errores.username && true}                    
                        />
                    </CInputGroup>
                    <CInputGroup className="mt-3">
                        <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                            type="password"
                            placeholder="Contraseña"
                            autoComplete="password"
                            value={password}
                            onChange={(e) => callback({ username, password: e.target.value })}
                            feedback={props.errores.password}
                            invalid={props.errores.password && true}                    
                        />
                    </CInputGroup>
                    <CButton color="danger" className="text-white mt-4" type="submit">
                    Acceder
                    </CButton>
                </CForm>
            </div>
        </div>
    )
}

export default SigninForm

