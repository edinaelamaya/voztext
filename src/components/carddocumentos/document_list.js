import React from 'react';
import docimg from '../../assets/images/documentos.png';
import './document.css';

function DocumentCard({document}) {
  
  console.log("llego document",document)
  const { title, contenido, descriccion, onClick } = document;
  return (
    <div className="document-card">
        <div className='documentsflex'>

            <img src={docimg} alt="document" className="document-thumbnail" />
            <div className="document-info">
                <h3 className="document-title">{title}</h3>
                <p className="document-description">{descriccion}</p>
                <button onClick={onClick}>Ver Documento</button>
        </div>
      </div>
    </div>
  );
}

export {DocumentCard};