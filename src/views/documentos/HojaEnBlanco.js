import {useState, useEffect} from "react"
// import axios from "axios"
// import { PARTIDOSCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { CContainer , CCardBody, CRow, CCol } from '@coreui/react' 
import { HojaEnBlanco } from "../../components/hojablanco/hojablanco";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Read() {
    const navegar=useNavigate();
    const dispatch = useDispatch();
    
    return (
        
        <CContainer  className="mt-3 mb-3">
            <HojaEnBlanco />
        </CContainer >
        )
}

export default Read