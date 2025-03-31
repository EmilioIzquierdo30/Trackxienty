import openDatabase from './db';

const initDB = async () => {
  try {
    const db = await openDatabase();
    
    // Verificar si ya existe al menos una tabla
    const tableCheck = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='PELICULA';"
    );
    
    // Si no existe la tabla PELICULA, crear todas las tablas
    if (tableCheck[0].rows.length === 0) {
      await db.transaction(async (tx) => {
        // Crear todas tus tablas aquí
        tx.executeSql(`CREATE TABLE PERSONA (...);`);
        tx.executeSql(`CREATE TABLE DIRECTOR (...);`);
        // ... resto de tablas
      });
      console.log('Database tables created successfully');
    } else {
      console.log('Database already exists, skipping table creation');
    }
    
    return db;
  } catch (error)
}

