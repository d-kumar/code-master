/**
 * Created by kumar on 27/01/16.
 */
var mailGun = require('mailgun-js'),
    mongoose = require('mongoose');
    bcrypt = require('bcrypt'),
    validate = require('mongoose-validate'),
        SALT_WORK_FACTOR = 10,
    api_key = "key-d59e09a488aae6d635f875d61c3fa616",
    domain = "sandbox1cdc7487a79c40cc884d29dd27a9e1a4.mailgun.org",
    from_who = 'Mailgun Sandbox <postmaster@sandbox1cdc7487a79c40cc884d29dd27a9e1a4.mailgun.org>';




var schema = mongoose.Schema({
    url:{type:String,unique:true},
    activeTill:{type:String},
    email:{type:String, required:true,unique:true}
});

schema.pre('save',function(next){
   var self = this;
   if(!self.isModified(self.url)){return next();}
   bcrypt.hash(self.email+Math.random().toString(36).substring(4),SALT_WORK_FACTOR,function(err,hash){
      if(err)return next(err);
       self.url=hash;
       next();
   });
});

schema.post('save', function (next) {
    var self = this;
    var mailgun = new mailGun({
        apiKey:api_key,
        domain:domain
    });

    var data = {
        from :from_who,
        to: self.email,
        subject: "Account Confirmation",
        html:'Please click on the below link to verify your email address<br/><a href="http://localhost:3000/auth/activate/?url='+self.url+ '">Activate</a>'
    }
    mailgun.messages().send(data, function (err,body) {
        if(err){
            console.log("Problem: "+err.message);
        }else{
            console.log(body);
        }
    });

});
schema.statics.findByUrl = function findByUrl(url,cb){
    Model.findOne({url:url},function(err,activation){
       if(err){
           return cb(err);
       }else if(!activation){
           return cb();
       }else {
           return cb(err,activation);
       }
    });
};


var Model = mongoose.model('activation',schema);

module.exports = Model;
