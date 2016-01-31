var express = require('express')
var userRoutes = App.route('userRoutes')

function UserRoutes(app){
    var UserRouter = express.Router();
    UserRouter.get('/allUsers',userRoutes.allUsers);
    app.use('/users',UserRouter);
}

module.exports = UserRoutes;