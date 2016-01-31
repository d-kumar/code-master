var express = require('express');
var homeRoutes = App.route('homeRoutes');
var userRoutes = App.route('userRoutes');
var portalRoutes = App.route('portalRoutes');

function HomeRoutes(app){
    var homeRouter = express.Router();
    homeRouter.get('/about',homeRoutes.about);
    homeRouter.get('/portal',portalRoutes.portal);
    homeRouter.get('/',homeRoutes.home);
    app.use('/',homeRouter);
}

module.exports = HomeRoutes;