import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Definir los tipos de datos para el formulario
type FormData = {
  nombre?: string;
  apellidopaterno?: string;
  apellidomaterno?: string;
  email: string;
  contraseña: string;
  rol: 'estudiante' | 'institucion' | 'gobierno';
  // Campos adicionales dependiendo del rol
  matricula?: string; // Solo para estudiantes
  nombreInstitucion?: string; // Solo para instituciones
  departamento?: string; // Solo para gobierno
};

// Esquema de validación con Yup
const schema = yup.object().shape({
  nombre: yup.string().when('rol', {
    is: (rol: string) => rol === 'estudiante',
    then: (schema) => schema.required('El nombre es obligatorio'),
  }),
  apellidopaterno: yup.string().when('rol', {
    is: (rol: string) => rol === 'estudiante',
    then: (schema) => schema.required('El apellido paterno es obligatorio'),
  }),
  apellidomaterno: yup.string().when('rol', {
    is: (rol: string) => rol === 'estudiante',
    then: (schema) => schema.required('El apellido materno es obligatorio'),
  }),
  email: yup.string().email('Ingresa un correo válido').required('El correo es obligatorio'),
  contraseña: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  rol: yup.string().oneOf(['estudiante', 'institucion', 'gobierno'], 'Selecciona un rol válido').required('El rol es obligatorio'),
  matricula: yup.string().when('rol', {
    is: (rol: string) => rol === 'estudiante',
    then: (schema) => schema.required('La matrícula es obligatoria para estudiantes'),
  }),
  nombreInstitucion: yup.string().when('rol', {
    is: (rol: string) => rol === 'institucion',
    then: (schema) => schema.required('El nombre de la institución es obligatorio'),
  }),
  departamento: yup.string().when('rol', {
    is: (rol: string) => rol === 'gobierno',
    then: (schema) => schema.required('El departamento es obligatorio para el gobierno'),
  }),
});

const Registro: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const rolSeleccionado = watch('rol'); // Observar el valor del campo 'rol'

  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Enviar los datos al backend
      const response = await axios.post('http://localhost:5000/api/registro', data);
      console.log('Registro exitoso:', response.data);
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registro en EduAlert</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        {/* Campos para estudiantes */}
        {rolSeleccionado === 'estudiante' && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre:</label>
              <input {...register('nombre')} style={styles.input} />
              {errors.nombre && <p style={styles.error}>{errors.nombre.message}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Apellido Paterno:</label>
              <input {...register('apellidopaterno')} style={styles.input} />
              {errors.apellidopaterno && <p style={styles.error}>{errors.apellidopaterno.message}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Apellido Materno:</label>
              <input {...register('apellidomaterno')} style={styles.input} />
              {errors.apellidomaterno && <p style={styles.error}>{errors.apellidomaterno.message}</p>}
            </div>
          </>
        )}

        {/* Campos comunes para todos los roles */}
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

        <div style={styles.formGroup}>
          <label style={styles.label}>Rol:</label>
          <select {...register('rol')} style={styles.input}>
            <option value="estudiante">Estudiante</option>
            <option value="institucion">Institución Educativa</option>
            <option value="gobierno">Gobierno</option>
          </select>
          {errors.rol && <p style={styles.error}>{errors.rol.message}</p>}
        </div>

        {/* Campos adicionales dependiendo del rol seleccionado */}
        {rolSeleccionado === 'estudiante' && (
          <div style={styles.formGroup}>
            <label style={styles.label}>Matrícula:</label>
            <input {...register('matricula')} style={styles.input} />
            {errors.matricula && <p style={styles.error}>{errors.matricula.message}</p>}
          </div>
        )}

        {rolSeleccionado === 'institucion' && (
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre de la Institución:</label>
            <input {...register('nombreInstitucion')} style={styles.input} />
            {errors.nombreInstitucion && <p style={styles.error}>{errors.nombreInstitucion.message}</p>}
          </div>
        )}

        {rolSeleccionado === 'gobierno' && (
          <div style={styles.formGroup}>
            <label style={styles.label}>Departamento:</label>
            <input {...register('departamento')} style={styles.input} />
            {errors.departamento && <p style={styles.error}>{errors.departamento.message}</p>}
          </div>
        )}

        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
    </div>
  );
};

// Estilos para el componente
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
    marginBottom: '20px',
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
    width: '100%',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
};

export default Registro;