const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

let db;

// Inicializar base de datos SQLite
(async () => {
    db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            email TEXT UNIQUE,
            contraseña TEXT,
            rol_id INTEGER
        );
        
        CREATE TABLE IF NOT EXISTS roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT UNIQUE
        );

        CREATE TABLE IF NOT EXISTS registros_emocionales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            estado_animo TEXT,
            fecha TEXT DEFAULT CURRENT_TIMESTAMP,
            comentario TEXT,
            FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
        );
    `);
})();

// Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
    const usuarios = await db.all("SELECT * FROM usuarios");
    res.json(usuarios);
});

// Agregar un usuario
app.post("/usuarios", async (req, res) => {
    const { nombre, email, contraseña, rol_id } = req.body;
    try {
        const result = await db.run(
            "INSERT INTO usuarios (nombre, email, contraseña, rol_id) VALUES (?, ?, ?, ?)",
            [nombre, email, contraseña, rol_id]
        );
        res.json({ id: result.lastID, nombre, email, rol_id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

