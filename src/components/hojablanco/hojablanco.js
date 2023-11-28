import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, Modifier } from 'draft-js';
import axios from "axios"
import { GUARDARDOCUMENT_GET_ENDPOINT } from "../../connections/helpers/endpoints"
import 'draft-js/dist/Draft.css';
import VoiceRecognition from '../VoiceRecognition';
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';
import './hoja-style.css';

function HojaEnBlanco() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [destinatario, setDestinatario] = useState(''); // Estado para almacenar el destinatario del correo
  const editorRef = useRef(null);
  const navegar=useNavigate();
  const recognitionRef = useRef(null);
  const isWritingRef = useRef(false);
  const interimTranscriptionRef = useRef('');

  let finalTranscription = '';
  let interimTranscription = '';
  const glovalstop = 'start';

  useEffect(() => {

    const initRecognition = () => {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
    
        recognition.onresult = (event) => {
          console.log("tengo__clas",event.results)
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join(' ');
            console.log("tengo__",transcript)
            
            if (event.results[i]) {
              finalTranscription += transcript + ' ';
            } else {
              interimTranscription += transcript;
            }
            if (transcript == "Michelle parar"){
              console.log("tengo__ls",event.results[i])
              glovalstop = "stop";
              console.log("estado ss",glovalstop)
            }
          }
          console.log("lo que digo f", finalTranscription)
          console.log("lo que digo w", interimTranscription)
          // Si estamos en modo de escritura, actualiza el texto en el editor
          if (isWritingRef.current) {
            const contentState = editorState.getCurrentContent();
            const selection = editorState.getSelection();
            const newContentState = Modifier.insertText(contentState, selection, finalTranscription);
            const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
            setEditorState(newEditorState);
          }

          interimTranscriptionRef.current = interimTranscription;
        };
        console.log("estado",glovalstop)
        console.log("lo que digo", interimTranscriptionRef.current)
        if(glovalstop == "stop"){
          console.log("paso",glovalstop)
          recognition.onend = () => {
            
            if (isWritingRef.current && interimTranscriptionRef.current.trim() !== '') {
              // Si termina la transcripción, pero hay transcripciones intermedias, agréguelas al editor
              const contentState = editorState.getCurrentContent();
              const selection = editorState.getSelection();
              const newContentState = Modifier.insertText(contentState, selection, interimTranscriptionRef.current);
              const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
              setEditorState(newEditorState);
            }

            interimTranscriptionRef.current = '';
            if (isWritingRef.current) {
              // Si todavía estamos escribiendo, reinicia el reconocimiento
              recognition.start();
            }
          };
        }

        recognitionRef.current = recognition;
      } else {
        console.error('La API de reconocimiento de voz no está disponible en este navegador.');
      }
    };

    initRecognition();
  }, [editorState]);

  const startWriting = () => {
    isWritingRef.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopWriting = () => {
    isWritingRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleVoiceCommand = (command) => {
    if (command.includes('michelle escribir')) {
      startWriting();
    } else if (command.includes('michelle documento')) {
      navegar("/documentos")
    }
    if (command.includes('michelle mi lista')) {
      navegar("/mi-documentos")
    }
    if (command.includes('michelle descargar')) {
      console.log("descargar v")
      descargarContenido();
    }
    if (command.includes('michelle guardar')) {
      console.log("guardar")
      guardarContenido();
    }

   
  };

  
  const guardarContenido = async () => {
    // Lógica para guardar el contenido (usando axios u otro método)
    const contentState = editorState.getCurrentContent();
    const contentText = contentState.getPlainText();
    
    // Ejemplo de cómo podrías usar axios para enviar el contenido al backend
    fetch('http://localhost:4000/api/documents/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: contentText,
          id_users: 1,
        }),
      })
        .then(response => {
          if (response.ok) {
            // La solicitud fue exitosa, puedes redirigir al usuario a la página de inicio (home)
            console.log('Se guardoc ');// Cambia '/home' a la ruta correcta de tu página de inicio
          } else {
            // La solicitud no fue exitosa, maneja el error según tus necesidades
            console.error('error al guardar');
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
  };
  

  const descargarContenido = () => {
    // Lógica para descargar el contenido
    console.log("descargar v1")
    const contentState = editorState.getCurrentContent();
    const contentText = contentState.getPlainText();
    
    // Crea un elemento 'a' para descargar
    const downloadLink = document.createElement('a');
    const blob = new Blob([contentText], { type: 'text/plain' });
    console.log("descargar v2")
    // Configura el enlace y haz clic para descargar
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'documento.txt';
    downloadLink.click();
  };

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <div className="main-content">
        <div>
          {/* Botones para otras acciones del editor */}
        </div>

        <VoiceRecognition onCommand={handleVoiceCommand} />
        <div ref={editorRef} className="editor-container">
          <Editor editorState={editorState} onChange={handleChange} />
        </div>
        
      </div>
    </div>
  );
}

export { HojaEnBlanco };
