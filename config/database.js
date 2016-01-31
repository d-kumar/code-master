/**
 * Created by kumar on 23/01/16.
 */
var mongoose = require('mongoose');

function connect(connectionString){
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,"Connection error"));
    db.once('open',function callback(){
       console.log("Connection established via :"+connectionString);
    });

}

module.exports = connect;