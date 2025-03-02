import React, { useState } from 'react';
import Registro from './componentes/registro';
import InicioSesion from './componentes/iniciosesion';

const App: React.FC = () => {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarInicioSesion, setMostrarInicioSesion] = useState(false);

  const handleMostrarRegistro = () => {
    setMostrarRegistro(true);
    setMostrarInicioSesion(false);
  };

  const handleMostrarInicioSesion = () => {
    setMostrarInicioSesion(true);
    setMostrarRegistro(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a EduAlert</h1>
      <div style={styles.buttonContainer}>
        <button onClick={handleMostrarRegistro} style={styles.button}>
          Registrarse
        </button>
        <button onClick={handleMostrarInicioSesion} style={styles.button}>
          Iniciar Sesión
        </button>
      </div>

      {mostrarRegistro && <Registro />}
      {mostrarInicioSesion && <InicioSesion />}
    </div>
  );
};

// Estilos para el componente
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center' as 'center',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '0 10px',
  },
};

export default App;