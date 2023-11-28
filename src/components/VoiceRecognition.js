import React, { useState, useEffect } from 'react';
import annyang from 'annyang';
const VoiceRecognition = ({ onCommand }) => {
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const initRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = true;

      recognition.onstart = () => {
        console.log('Voice recognition started');
      };

      recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase();
        console.log('Command:', command);
        onCommand(command);
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');
      };

      setRecognition(recognition);
      recognition.start();
    };

    initRecognition();

  }, [onCommand]);

  return null; // Este componente no renderiza nada en la interfaz, pero maneja el reconocimiento de voz
};

export default VoiceRecognition;
