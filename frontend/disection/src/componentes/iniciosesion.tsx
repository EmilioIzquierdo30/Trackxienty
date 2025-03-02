import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Definir los tipos de datos para el formulario
type LoginFormData = {
  email: string;
  contraseña: string;
};

// Esquema de validación con Yup
const schema = yup.object().shape({
  email: yup.string().email('Ingresa un correo válido').required('El correo es obligatorio'),
  contraseña: yup.string().required('La contraseña es obligatoria'),
});

const InicioSesion: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      // Enviar los datos al backend para autenticación
      const response = await axios.post('http://localhost:5000/api/login', data);
      console.log('Inicio de sesión exitoso:', response.data);
      alert('Inicio de sesión exitoso');
      // Aquí podrías redirigir al usuario a su dashboard o página principal
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Inicio de Sesión en EduAlert</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Correo Electrónico:</label>
          <input {...register('email')} style={styles.input} />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contraseña:</label>
          <input type="password" {...register('contraseña')} style={styles.input} />
          {errors.contraseña && <p style={styles.error}>{errors.contraseña.message}</p>}
        </div>

        <button type="submit" style={styles.button}>Iniciar Sesión</button>
      </form>
    </div>
  );
};
//css 


const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
};

export default InicioSesion;