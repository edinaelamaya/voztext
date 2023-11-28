import {useState, useEffect} from "react"
// import axios from "axios"
// import { PARTIDOSCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { CContainer , CCardBody, CRow, CCol } from '@coreui/react' 
import { HojaEnBlanco } from "../../components/hojablanco/hojablanco";


function Read() {
    
    return (
        
        <CContainer  className="mt-3 mb-3">
            <HojaEnBlanco />
        </CContainer >
        )
}

export default Read