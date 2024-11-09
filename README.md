# Examen Final: Aplicación de Lista de Tareas

### CURSOS: PROGRAMACIÓN WEB Y BASES DE DATOS II
### CARRERA: ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS
### NOMBRE DEL CATEDRÁTICO: Luis Felipe Figueroa Molina
### PRIMER SEMESTRE 2024 - 9 de noviembre de 2024
### Estudiante: Esteban David Barrios Guardia
### Carnet: 2250344

## Descripción del Proyecto
Este proyecto consiste en el desarrollo de una **Aplicación de Lista de Tareas** con un backend en Node.js y un frontend en React.js. La aplicación permite a los usuarios agregar, actualizar, marcar como completadas, y eliminar tareas. Es una evaluación para el curso de **Programación Web y Bases de Datos II** y se enfoca en integrar conceptos de backend y frontend, así como la interacción con bases de datos.

## Estructura del Proyecto
El proyecto se encuentra dividido en dos partes principales:
- **Backend**: Desarrollado con Node.js, usando Express para la API RESTful y MySQL para la base de datos.
- **Frontend**: Desarrollado con React.js y Ant Design para la interfaz de usuario.

```
ProyectoFinal
├── .gitignore
├── backend
│   ├── .env
│   ├── bd
│   │   └── task_final_proyect.sql
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── App.js
│       ├── index.css
│       └── index.js
├── LICENSE
└── README.md

```

## Configuración del Proyecto
### Requisitos Previos
- Node.js y npm (https://nodejs.org/)
- MySQL (https://www.mysql.com/)
- WAMP, XAMPP o similar para gestionar la base de datos localmente

### Instalación del Backend
1. Navegar a la carpeta `backend`.
2. Instalar las dependencias con el comando:
   ```sh
   npm install
   ```
3. Crear un archivo `.env` en la carpeta `backend` con la configuración de la base de datos:
   ```
   DB_NAME=task_final_proyect
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=localhost
   PORT=3010
   ```
4. Iniciar el servidor del backend:
   ```sh
   npm start
   ```
   El servidor estará disponible en `http://localhost:3010`.

### Instalación del Frontend
1. Navegar a la carpeta `frontend`.
2. Instalar las dependencias con el comando:
   ```sh
   npm install
   ```
3. Iniciar la aplicación de React:
   ```sh
   npm start
   ```
   El frontend estará disponible en `http://localhost:3000`.

### Base de Datos

Una carpeta llamada bd dentro del directorio backend contiene un archivo con la estructura de la base de datos (task_final_proyect.sql). Este archivo debe importarse en MySQL para configurar la base de datos necesaria para el proyecto.

## Uso de la Aplicación
### Screenshots
![App Screenshot](https://i.postimg.cc/CKcwGK90/Screenshot-2024-11-09-094619.png)

### Funcionalidades
- **Agregar Tarea**: Hacer clic en el botón "Agregar Tarea" para abrir un formulario donde se ingresa el título y la descripción de la tarea.
- **Editar Tarea**: Hacer clic en el botón "Editar" junto a una tarea para actualizar la información de la tarea.
- **Marcar Como Completada**: Hacer clic en el botón verde con el icono de check para marcar la tarea como completada. Este botón estará deshabilitado si la tarea ya está completada.
- **Eliminar Tarea**: Hacer clic en el botón "Eliminar" para borrar la tarea.

### Información Adicional
- **Mensajes de Estado**: La aplicación muestra mensajes de confirmación para las acciones exitosas (agregar, actualizar, eliminar, completar) y mensajes de error si alguna operación falla.
- **Íconos de Estado**: Cada tarea tiene un ícono que indica su estado:
  - **Reloj Naranja**: La tarea está pendiente.
  - **Check Verde**: La tarea está completada.

## Tecnologías Utilizadas
- **Backend**: Node.js, Express, MySQL
- **Frontend**: React.js, Ant Design, Axios
- **Otros**: dotenv para la configuración de variables de entorno, axios para realizar solicitudes HTTP

## Notas Importantes
- Asegúrese de tener MySQL ejecutándose y que la base de datos esté configurada correctamente.
- La URL base del backend está configurada en `http://localhost:3010`, asegúrese de que coincida con su configuración local.

## Créditos
- **Desarrollador**: Esteban Barrios - 2250344
- **Catedrático**: Luis Felipe Figueroa Molina

## Licencia
Este proyecto está bajo la licencia MIT. Consulte el archivo `LICENSE` para más detalles.
