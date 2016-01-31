var express = require('express');

function connectAllRoutes(app){
    App.require('routes/home')(app)
    App.require('routes/auth')(app)
    App.require('routes/users')(app)
}

module.exports = connectAllRoutes;
