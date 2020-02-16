const mongoose = require("mongoose");

// Definir esquema y modelo
let ingredientesSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    trim: true
  },
  tipo: {
    type: String,
    enum: [
        "carne",
        "pescado",
        "frutas y verduras",
        "pastas y arroces",
        "otros"
    ]
  }
});

let Ingredientes = mongoose.model("ingredientes", ingredientesSchema);

module.exports = Ingredientes;
