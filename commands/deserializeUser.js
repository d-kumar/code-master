/**
 * Created by kumar on 25/01/16.
 */
var User = App.model('user');

function deserializeUser(){
    return function _deserializeUser(obj,cb){
        User.findOne({_id:obj.id},function(err,user){
            cb(err,user);
        });
    }
}

module.exports = deserializeUser