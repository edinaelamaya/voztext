import React from 'react'
import { CFooter } from '@coreui/react'
import logoImg from '../assets/images/common-file-desc.svg';
import descargarImg from '../assets/images/download.png';
import compartirImg from '../assets/images/guardar.png';



const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <div className="btngenerate">
          <div className='orde'>
            <button className='desca'>
              <img className='desca' src={logoImg} alt="Guardar" />
              Guardar
            </button>
          </div>
          <div className='orde'>
            <button className='desca'>
              <img className='desca' src={descargarImg} alt="descargarn" />
              Descargar
            </button>
          </div>
          <div className='orde'>
            <button className='desca'>
              <img className='desca' src={compartirImg} alt="compartir" />
              Compartir
            </button>
          </div>
          </div>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
