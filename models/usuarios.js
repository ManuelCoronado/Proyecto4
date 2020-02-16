const mongoose = require("mongoose");

// Definir esquema y modelo
let usuariosSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    }
});

let Usuarios = mongoose.model("usuarios", usuariosSchema);

module.exports = Usuarios;