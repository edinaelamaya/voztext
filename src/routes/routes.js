import React from 'react'
const hojaenblanco= React.lazy(()=> import('../views/documentos/HojaEnBlanco'))


const routes = [
  { path: '/', exact: true, name: 'Home'},
  { path: '/documentos', name: 'documentos', element: hojaenblanco }
 
]

export default routes
