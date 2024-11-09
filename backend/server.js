// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Imprimir variables de entorno para depuración
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);

// Verificar si las variables de entorno están definidas
if (!process.env.DB_NAME || !process.env.DB_USER || typeof process.env.DB_PASSWORD === 'undefined' || !process.env.DB_HOST) {
  console.error('Error: Faltan variables de entorno para la configuración de la base de datos.');
  process.exit(1);
}

// Configuración de la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Definición del modelo de Task
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

// Sincronización del modelo con la base de datos
sequelize.sync()
  .then(() => console.log('Conectado a la base de datos y modelo sincronizado'))
  .catch((error) => console.error('Error conectando a la base de datos:', error));

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 3010;
app.use(express.json());

// Habilitar CORS para permitir solicitudes desde el frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // Puedes especificar la URL del frontend aquí
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Endpoints
// Crear una nueva tarea
app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creando la tarea', details: error.message });
  }
});

// Listar todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las tareas', details: error.message });
  }
});

// Obtener una tarea por ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la tarea', details: error.message });
  }
});

// Actualizar una tarea existente
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Task.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la tarea', details: error.message });
  }
});

// Eliminar una tarea
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando la tarea', details: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
