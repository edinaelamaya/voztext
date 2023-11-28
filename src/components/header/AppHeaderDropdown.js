import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cerrarSesion } from '../../connections/usuarioDispatch'
import { useDispatch, useSelector } from 'react-redux';

const AppHeaderDropdown = () => {

  const user=useSelector(state=>state.user);
  const dispatch= useDispatch();

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar color="secondary">user</CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{user.email}</CDropdownHeader>
        <CDropdownItem href="#">
          Perfil
        </CDropdownItem>
         <CDropdownDivider />
        <CDropdownItem onClick={() => dispatch(cerrarSesion())}>
          Cerrar sesion
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
