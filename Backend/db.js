import SQLite from 'react-native-sqlite-storage';

// Habilitar el modo debug si estás en desarrollo
SQLite.DEBUG(true);

// Manejar errores de apertura de base de datos
SQLite.enablePromise(true);

const databaseName = 'cnc_database.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'CNC Database';
const databaseSize = 200000; // Tamaño en bytes

// Abrir/Crear la base de datos
const openDatabase = async () => {
  return SQLite.openDatabase(
    databaseName,
    databaseVersion,
    databaseDisplayName,
    databaseSize
  ).then((db) => {
    console.log('Database opened successfully');
    return db;
  }).catch((error) => {
    console.log('Error opening database: ', error);
    throw error;
  });
};

export default openDatabase;