const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const req = require('express/lib/request');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

/*
INICIALIZAR FIREBASE ADMIN
*/ 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})
//RUTAS
const users = require('./routes/usersRoutes');
const { SERVFAIL } = require('dns');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-powered-by');

app.set('port', port)

//LLAMANDO A RUTAS

users(app,upload);

server.listen(3000,"192.168.20.60" || 'localhost', function(){
    console.log('Aplicacion de Nodejs ' + port + ' Iniciada...');
})

//10.30.6.126
//ERROR HANDLER

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}







