import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import VoiceRecognition from '../VoiceRecognition';
import './hoja-style.css';

function HojaEnBlanco() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  const recognitionRef = useRef(null);
  const isWritingRef = useRef(false);
  const interimTranscriptionRef = useRef('');

  let finalTranscription = '';
  let interimTranscription = '';
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
            if (transcript == "Michelle parar"){
              console.log("tengo__ls",event.results[i])
              stopWriting();
            }
            if (event.results[i]) {
              finalTranscription += transcript + ' ';
            } else {
              interimTranscription += transcript;
            }
          }

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
      recognitionRef.current.start();
    }
  };

  const handleVoiceCommand = (command) => {
    if (command.includes('michelle escribir')) {
      startWriting();
    } else if (command.includes('michelle parar')) {
      stopWriting();
    }
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
