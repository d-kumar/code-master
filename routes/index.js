var express = require('express');

function connectAllRoutes(app){
    App.require('routes/home')(app);
    App.require('routes/auth')(app);
    App.require('routes/users')(app);
    App.require('routes/quizes')(app);
}

module.exports = connectAllRoutes;
