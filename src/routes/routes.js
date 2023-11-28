import React from 'react'
const hojaenblanco= React.lazy(()=> import('../views/documentos/HojaEnBlanco'))
const midocumentos= React.lazy(()=> import('../views/listdocumento/MiDocumentos'))


const routes = [
  { path: '/', exact: true, name: 'Home'},
  { path: '/documentos', name: 'documentos', element: hojaenblanco },
  { path: '/mi-documentos', name: 'midocumentos', element: midocumentos }
]

export default routes
