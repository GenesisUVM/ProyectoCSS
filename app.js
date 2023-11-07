const express = require('express');
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/dulceSabores', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema del documento
const formularioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  edad: String,
  mensaje: String,
});

// Crear el modelo basado en el esquema
const Formulario = mongoose.model('Formulario', formularioSchema);

// Crear una instancia de Express
const app = express();

// Configurar el middleware para procesar datos JSON
app.use(express.json());

// Configurar una ruta para guardar los datos del formulario
app.post('/guardar', (req, res) => {
  const { nombre, correo, edad, mensaje } = req.body;

  // Crear una nueva instancia del modelo
  const nuevoFormulario = new Formulario({
    nombre,
    correo,
    edad,
    mensaje,
  });

  // Guardar el formulario en la base de datos
  nuevoFormulario.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al guardar los datos en la base de datos');
    } else {
      res.send('Los datos se han guardado correctamente en la base de datos');
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});