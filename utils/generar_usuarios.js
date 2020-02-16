const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuarios');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost:27017/recetasV3');
Usuario.collection.drop();

let pass1 = '123456789'
let usu1 = new Usuario({
    login: 'nacho',
    password: pass1,
    hash: 0
});
usu1.save();
/*
bcrypt.hash(pass1, 10, function(err, hash) {
    usu1["hash"] += hash;
    console.log(hash);

    console.log(usu1);
});
*/

let pass2 = '987654321';
let usu2 = new Usuario({
    login: 'arturo',
    password: pass2
});
usu2.save();