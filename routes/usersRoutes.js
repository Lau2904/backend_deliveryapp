const UsersController = require("../controllers/usersController");
const { findById } = require("../models/user");
const { app } = require("../server");

module.exports = (app, upload) => {
     
    //TRAER DATOS
    app.get("/api/users/getAll", UsersController.getAll);

    //TRAER DATOS DEL USUARIO EN SESION
    app.get("/api/users/findById/:id", UsersController.findByid);

    //GUARDAR DATOS
    app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);

    //AUTENTICAR USUARIO
    app.post('/api/users/login', UsersController.login);

    //ACTUALIZAR DATOS
    app.put('/api/users/update',upload.array('image',1),UsersController.update);
};