const express = require('express');
const multer = require('multer');
let auth = require('../utils/auth');

let Recetas = require(__dirname + '/../models/recetas.js');
let router = express.Router();

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

let upload = multer({ storage: storage });

// Listado general
router.get('/', auth.autenticacion, (req, res) => {
    Recetas.find().then(resultado => {
        res.render('admin_recetas', { recetas: resultado });
    }).catch(error => {});
});

// Formulario de receta nueva
router.get('/recetas/nueva', auth.autenticacion, (req, res) => {
    res.render('admin_recetas_form');
});

// Formulario de edicion de receta
router.get('/recetas/editar/:id', auth.autenticacion, (req, res) => {
    Recetas.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('admin_recetas_form', { recetas: resultado });
        } else {
            res.render('admin_error', { error: "Receta no encontrada" });
        }
    }).catch(error => {
        res.render('admin_error', { error: "Receta no encontrada" });
    });
});



// Insertar recetas
router.post('/recetas', auth.autenticacion, upload.single('imagen'), (req, res) => {
    let nuevaReceta = new Recetas({
        titulo: req.body.titulo,
        comensales: req.body.comensales,
        preparacion: req.body.preparacion,
        coccion: req.body.coccion,
        descripcion: req.body.descripcion,
        imagen: req.file.imagen
    });
    nuevaReceta.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', { error: "Error insertando receta" });
    });
});

// Modificar receta
router.put('/:id', auth.autenticacion, (req, res) => {
    Recetas.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            comensales: req.body.comensales,
            preparacion: req.body.preparacion,
            coccion: req.body.coccion,
            descripcion: req.body.descripcion,
            imagen: req.file.imagen
        }
    }, { new: true }).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', { error: "Error modificando receta" });
    });
});


// Borrar receta
router.delete('/:id', auth.autenticacion, (req, res) => {
    Recetas.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', { error: "Error borrando receta" });
    });
});


module.exports = router;