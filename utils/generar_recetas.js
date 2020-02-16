const mongoose = require('mongoose');
const Recetas = require(__dirname + '/../models/recetas');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost:27017/recetasV3');
let receta1 = new Recetas({
    id: 1,
    titulo: 'macarrones',
    comensales: 4,
    preparacion: 10,
    coccion: 8,
    descripcion: "Solo macarrones sin queso ni nada"
});
receta1.save();