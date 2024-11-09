// server.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('task_final_proyect', 'root', '', {
  host: 'localhost',
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
const PORT = 3010;
app.use(express.json());

// Endpoints
// Crear una nueva tarea
app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creando la tarea' });
  }
});

// Listar todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las tareas' });
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
    res.status(500).json({ error: 'Error actualizando la tarea' });
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
    res.status(500).json({ error: 'Error eliminando la tarea' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
