/**
 * Created by kumar on 03/02/16.
 */
var mongoose = require('mongoose'),
    validate = require('mongoose-validate');

var schema = new mongoose.Schema({
    questionBody :{type:String,required:true},
    options:[String],
    numOfOptions:{type:Number},
    answer:{type:String,required:true}
});

var Model = mongoose.model('question',schema);

module.exports = Model;