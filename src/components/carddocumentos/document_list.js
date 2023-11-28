import React from 'react';
import docimg from '../../assets/images/documentos.png';
import './document.css';

function DocumentCard({document, onOpenDocument}) {
  
  console.log("llego document",document)
  const {id_document, title, contenido, descriccion } = document;
  const handleOpenDocument = () => {
    onOpenDocument(id_document);
  };
  return (
    <div className="document-card">
        <div className='documentsflex'>

            <img src={docimg} alt="document" className="document-thumbnail" />
            <div className="document-info">
                <h3 className="document-title">{title}</h3>
                <p className="document-description">{descriccion}</p>
                <button onClick={handleOpenDocument}>Ver Documento</button>
        </div>
      </div>
    </div>
  );
}

export {DocumentCard};