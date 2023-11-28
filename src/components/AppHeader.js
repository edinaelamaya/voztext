import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CImage,
} from '@coreui/react'
import { AppHeaderDropdown } from './header/index'
import logo from '../assets/images/logo.png'


const AppHeader = () => {


  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
      <CHeaderBrand className="position-absolute mt-4" to="/">
        </CHeaderBrand>
        <CHeaderNav className="d-flex ms-auto">
          <CNavItem>
            <CNavLink to="/documentos" component={NavLink}> Editor Documentos </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/listDoc" component={NavLink}> Mis Documentos </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
        <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
