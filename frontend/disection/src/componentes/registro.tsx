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
    <div>
      <h1>Registro en EduAlert</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campos para estudiantes */}
        {rolSeleccionado === 'estudiante' && (
          <>
            <div>
              <label>Nombre:</label>
              <input {...register('nombre')} />
              {errors.nombre && <p>{errors.nombre.message}</p>}
            </div>

            <div>
              <label>Apellido Paterno:</label>
              <input {...register('apellidopaterno')} />
              {errors.apellidopaterno && <p>{errors.apellidopaterno.message}</p>}
            </div>

            <div>
              <label>Apellido Materno:</label>
              <input {...register('apellidomaterno')} />
              {errors.apellidomaterno && <p>{errors.apellidomaterno.message}</p>}
            </div>
          </>
        )}

        {/* Campos comunes para todos los roles */}
        <div>
          <label>Correo Electrónico:</label>
          <input {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input type="password" {...register('contraseña')} />
          {errors.contraseña && <p>{errors.contraseña.message}</p>}
        </div>

        <div>
          <label>Rol:</label>
          <select {...register('rol')}>
            <option value="estudiante">Estudiante</option>
            <option value="institucion">Institución Educativa</option>
            <option value="gobierno">Gobierno</option>
          </select>
          {errors.rol && <p>{errors.rol.message}</p>}
        </div>

        {/* Campos adicionales dependiendo del rol seleccionado */}
        {rolSeleccionado === 'estudiante' && (
          <div>
            <label>Matrícula:</label>
            <input {...register('matricula')} />
            {errors.matricula && <p>{errors.matricula.message}</p>}
          </div>
        )}

        {rolSeleccionado === 'institucion' && (
          <div>
            <label>Nombre de la Institución:</label>
            <input {...register('nombreInstitucion')} />
            {errors.nombreInstitucion && <p>{errors.nombreInstitucion.message}</p>}
          </div>
        )}

        {rolSeleccionado === 'gobierno' && (
          <div>
            <label>Departamento:</label>
            <input {...register('departamento')} />
            {errors.departamento && <p>{errors.departamento.message}</p>}
          </div>
        )}

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;