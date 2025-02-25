import React, { useState, useEffect } from "react";
import { CContainer } from "@coreui/react";
import { DocumentCard } from "../../components/carddocumentos/document_list";
import {HojaEnBlanco} from "../../components/hojablanco/hojablanco"

const DocumentosCard = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realiza la solicitud para obtener los documentos desde la API o tu fuente de datos
    fetch('http://localhost:4000/api/traerdoc/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_users: 1,
        }),
      }) // Reemplaza con la URL correcta
      .then((response) => response.json())
      .then((data) => {
        const documentArray = Array.isArray(data) ? data : [data];

        console.log("documentArray",documentArray[0]['data'])
        setDocuments(documentArray[0]['data']);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener documentos:', error);
        setLoading(false);
      });
  }, []);

  const handleOpenDocument = (documentId) => {
    const selected = documents.find((doc) => doc.id_document === documentId);
    setSelectedDocument(selected);
  };

  return (
    <CContainer className="mt-3 mb-3">
      {loading ? (
        <p>Cargando documentos...</p>
      ) : (
        <div className="flexos">
          {documents.map((document) => (
            <DocumentCard
            key={document.id_document} // Asegúrate de tener una propiedad única, como id_document
            document={document}
            onOpenDocument={handleOpenDocument}
            />
          ))}
          {selectedDocument && (
        <HojaEnBlanco initialContent={selectedDocument.contenido} />
      )}
        </div>
      )}
    </CContainer>
  );
};

export default DocumentosCard;
