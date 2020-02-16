const express = require('express');
const session = require('express-session');
let Usuarios = require(__dirname + '/../models/usuarios.js');
let router = express.Router();

router.use((req, res, next) => {
    console.log(new Date().toString(), "Método:", req.method,
        ", URL:", req.baseUrl);
    next();
});

/*app.use((req, res, next) => {
 res.locals.session = req.session;
 next();
});
*/
//exportar

router.get('/', (req, res) => {
    res.render('auth_login');
});
router.post('/login', (req, res) => {
    Usuarios.find().then(resultado => {
        let login = req.body.login;
        let password = req.body.password;
        let existeUsuario = resultado.filter(usuario => usuario.login === login && usuario.password === password);
        console.log(existeUsuario);
        if (existeUsuario.length > 0) {
            console.log(existeUsuario[0].login);
            req.session.login = existeUsuario[0].login;
            console.log(req.session.login);
            res.render('admin_recetas');
        } else {
            res.render('auth_login', { error: "Usuario o contraseña incorrectos" });
        }
    });
    console.log(req.session.usuario);
});
/*
router.get('/', auth.autenticacion, (req, res) => {
    Recetas.find().then(resultado => {
        res.render('admin_recetas', { recetas: resultado });
    }).catch(error => {});
});*/

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;