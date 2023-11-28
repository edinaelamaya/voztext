import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Asumiendo que estás utilizando react-bootstrap

const CompartirCorreoModal = ({ modalVisible, setModalVisible, enviarCorreo }) => {
  const [destinatario, setDestinatario] = useState('');

  const handleVoiceCommandModal = (command) => {
    if (command.includes('michelle enviar a')) {
      const nuevoDestinatario = command.replace('michelle enviar a', '').trim();
      setDestinatario((prevDestinatario) => prevDestinatario + nuevoDestinatario);
    } else if (command.includes('michelle enviar')) {
      enviarCorreo(destinatario);
      setModalVisible(false);
    }
  };

  return (
    <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Compartir por correo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Dí "michelle enviar a [nombre]" para especificar el destinatario.</p>
        <p>Decir "michelle enviar" para confirmar y enviar el correo.</p>
        <p>Destinatario actual: {destinatario}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalVisible(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompartirCorreoModal;
