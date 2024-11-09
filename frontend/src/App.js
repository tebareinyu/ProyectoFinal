// App.js (Componente Principal Mejorado en Español)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, List, Button, Input, Modal, Form, message } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Función para obtener todas las tareas
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3010/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error obteniendo las tareas:', error);
      message.error('Error obteniendo las tareas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para agregar una nueva tarea
  const handleAddTask = async (values) => {
    try {
      await axios.post('http://localhost:3010/tasks', { ...values, status: false });
      fetchTasks();
      setIsModalVisible(false);
      message.success('Tarea agregada exitosamente');
    } catch (error) {
      console.error('Error agregando la tarea:', error);
      message.error('Error agregando la tarea');
    }
  };

  // Función para actualizar una tarea existente
  const handleUpdateTask = async (id, values) => {
    try {
      await axios.put(`http://localhost:3010/tasks/${id}`, values);
      fetchTasks();
      setCurrentTask(null);
      message.success('Tarea actualizada exitosamente');
    } catch (error) {
      console.error('Error actualizando la tarea:', error);
      message.error('Error actualizando la tarea');
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3010/tasks/${id}`);
      fetchTasks();
      message.success('Tarea eliminada exitosamente');
    } catch (error) {
      console.error('Error eliminando la tarea:', error);
      message.error('Error eliminando la tarea');
    }
  };

  // Función para marcar una tarea como completada
  const handleMarkComplete = async (task) => {
    try {
      await axios.put(`http://localhost:3010/tasks/${task.id}`, { ...task, status: true });
      fetchTasks();
      message.success('Tarea marcada como completada');
    } catch (error) {
      console.error('Error marcando la tarea como completada:', error);
      message.error('Error marcando la tarea como completada');
    }
  };

  return (
    <Layout className="layout">
      <Header>
        <h1 style={{ color: 'white' }}>Aplicación de Lista de Tareas</h1>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
          Agregar Tarea
        </Button>
        <List
          loading={loading}
          bordered
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item
              actions={[
                <Button onClick={() => setCurrentTask(task)}>Editar</Button>,
                <Button type="primary" onClick={() => handleMarkComplete(task)} disabled={task.status}>
                  Marcar como Completada
                </Button>,
                <Button danger onClick={() => handleDeleteTask(task.id)}>Eliminar</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={task.status ? <CheckCircleOutlined style={{ color: 'green' }} /> : <ClockCircleOutlined style={{ color: 'orange' }} />}
                title={task.title}
                description={task.description}
              />
              <div>Estado: {task.status ? 'Completada' : 'Pendiente'}</div>
            </List.Item>
          )}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Aplicación de Lista de Tareas ©2024</Footer>

      <Modal
        title={currentTask ? 'Editar Tarea' : 'Agregar Tarea'}
        visible={isModalVisible || currentTask}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentTask(null);
        }}
        footer={null}
      >
        <Form
          initialValues={currentTask || { title: '', description: '', status: false }}
          onFinish={currentTask ? (values) => handleUpdateTask(currentTask.id, values) : handleAddTask}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Por favor ingrese el título' }]}
          >
            <Input placeholder="Título de la Tarea" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder="Descripción de la Tarea" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentTask ? 'Actualizar Tarea' : 'Agregar Tarea'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default App;
