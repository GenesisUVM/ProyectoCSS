const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/DulceSabores', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir esquema de datos
const formularioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  edad: String,
  mensaje: String
});

// Crear modelo
const Formulario = mongoose.model('Formulario', formularioSchema);

// Configurar body-parser para procesar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar ruta para recibir los datos del formulario
app.post('/formulario', (req, res) => {
  // Crear instancia del modelo con los datos recibidos
  const formulario = new Formulario({
    nombre: req.body.nombre,
    correo: req.body.correo,
    edad: req.body.edad,
    mensaje: req.body.mensaje
  });

  // Guardar instancia en la base de datos
  formulario.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al guardar los datos en la base de datos');
    } else {
      res.send('Datos guardados correctamente');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});