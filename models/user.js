/**
 * Created by kumar on 23/01/16.
 */
var mongoose = require('mongoose');
var validate = require('mongoose-validate');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR=10;
var REQUIRED_STRING_LENGTH=10;

function validatePasswordLength(val){
    return val&&val.length >=REQUIRED_STRING_LENGTH;
}

var schema = mongoose.Schema({
    email:{type:String,unique:true,required:true},
    passwordHash:{type:String},
    isActivated:{type:Boolean}
});

schema.pre('save', function (next) {
    var self = this;
    if(!self.isModified('passwordHash')) return next();
    bcrypt.hash(self.passwordHash,SALT_WORK_FACTOR,function(err,hash){
        if(err) return next(err);
        self.passwordHash = hash;
        next();
    });
});

schema.statics.findByEmailAndPassword = function findByEmailAndPassword(email,password,cb){
    Model.findOne({email:email},function(err,user){
        if(err) return cb(err);

        if(!user) return cb();

        bcrypt.compare(password,user.passwordHash,function(err,res){
         return cb(err,res?user:null);
        });
    });
};

schema.statics.findByEmail = function findByEmail(email,cb){
    Model.findOne({email:email},function(err,user){
        if(err) return cb(err);
        else if(!user) return cb();
        else {
                return cb(err,user);
            }

    });
};


var Model = mongoose.model('User',schema);

module.exports = Model;