const mongoose = require("mongoose");
const Ingredientes = require('./ingredientes');

// Definir esquema y modelo
let recetasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    comensales: {
        type: Number,
        required: true,
        min: 1
    },
    preparacion: {
        type: Number,
        required: true,
        min: 1
    },
    coccion: {
        type: Number,
        required: true,
        min: 0
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    },
    ingredientes: [{
        ingrediente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredientes",
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        },
        unidad: {
            type: String,
            required: true,
            min: 5
        }
    }],
    required: false
});

let Recetas = mongoose.model("recetas", recetasSchema);

module.exports = Recetas;