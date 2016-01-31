/**
 * Created by kumar on 23/01/16.
 */
var express = require('express');
var passport = require('passport');
var authRoutes = App.route('authRoutes');
var sessionRoutes = App.route('sessionRoutes');
var userRoutes = App.route('userRoutes');
var activationRoutes = App.route('activationRoutes');


var invalidUserError = App.middleware('invalidUserError');
var validateNewUser = App.middleware('validateNewUser');


function AuthRoutes(app){
    var Authrouter = express.Router();
    Authrouter.route('/signUp').
    get(authRoutes.signUp).
    post(validateNewUser,userRoutes.create,activationRoutes.create,invalidUserError);
    Authrouter.route('/signIn').
    get(authRoutes.signIn).
    post(passport.authenticate('local',{successRedirect:'/portal',failureRedirect:'/auth/signIn'}));
    Authrouter.route('/activate').get(activationRoutes.activate);
    app.use('/auth',Authrouter);
}
module.exports = AuthRoutes;
