/*
GET "/" - RENDERIZAR publico_index
GET "/buscar" - RENDERIZAR publico_index con el listado de recetas a buscar o "No se encontraron recetas" si no hubiera ninguna
GET "/receta/:id" - RENDERIZAR publico_receta mostrar receta con ese id o RENDERIZAR publico_error con mensaje "Receta no encontrada"
En el caso de que se produzca algun error se renderizar la vista publico_eror con el mensaje generico "Error en la aplicacion"
*/

const express = require("express");

let Recetas = require(__dirname + "/../models/recetas.js");
let router = express.Router();

// Listado general
router.get('/', (req, res) => {
    Recetas.find().then(resultado => {
        res.render('publico_index', { recetas: resultado });
    }).catch(error => {});
});

// Buscar receta
router.get('/buscar', (req, res) => {
    Recetas.find(req.params.name).then(resultado => {
        if (resultado)
            res.render('publico_receta', { receta: resultado });
        else
            res.render('publico_error', { error: "No se encontraron recetas" });
    }).catch(error => {});
});

// Ficha de receta
router.get('/recetas/:id', (req, res) => {
    Recetas.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('publico_receta', { receta: resultado });
        else
            res.render('publico_error', { error: "Receta no encontrada" });
    }).catch(error => {});
});

module.exports = router;