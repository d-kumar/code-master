/**
 * Created by kumar on 04/02/16.
 */
var mongoose = require('mongoose'),
    mongooseValidate =require('mongoose-validate');
var question = App.model('question');
var schema = new mongoose.Schema({
    quizName:{type:String,unique:true,required:true},
    questions:[{type:mongoose.Schema.Types.Object,ref:question}]
});

schema.statics.listAllQuizes = function listAllQuizes(cb){
    Model.find({},function(err,quizes){
        if(err){
            return cb(err);
        }else if(!quizes){
            return cb();
        }
        else {
            return cb(err,quizes);
        }
    });
};


schema.statics.findQuizByName = function findQuizByName(name,cb){
    Model.findOne({quizName:name}, function (err,quiz) {
        if(err){
            return cb(err);
        }
        else if(!quiz){
            return cb();
        }
        else {
            return cb(null, quiz);
        }
    })
};



var Model = mongoose.model('quiz',schema);

module.exports = Model;