/*
Ejercicio de desarrollo de una web con Express, sobre la base de datos
de "libros" utilizada en sesiones anteriores. Se definirán distintas
vistas en Nunjucks para mostrar información de los libros y poderlos
insertar, borrar, etc.
*/

// Carga de librerías
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

// Enrutadores
const recetas = require(__dirname + '/routes/recetas');
const publico = require(__dirname + '/routes/publico');
const auth = require(__dirname + '/routes/auth')
    // Conectar con BD en Mongo 
mongoose.connect('mongodb://localhost:27017/recetasV3', { useNewUrlParser: true });

// Inicializar Express
let app = express();

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');

// Cargar middleware body-parser para peticiones POST y PUT
// y enrutadores
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 60 * 1000))
}));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Middleware para procesar otras peticiones que no sean GET o POST


app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
// Cargamos ahora también la carpeta "public" para el CSS propio
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use('/', express.static(__dirname + '/public'));

app.use('/', publico);
app.use('/admin', recetas);
app.use('/auth', auth);
// Puesta en marcha del servidor
app.listen(8080);