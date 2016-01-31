/**
 * Created by kumar on 25/01/16.
 */
function serializeUser(){
    return function _serializeUser(user,cb){
        cb(null,{'type':user,'id':user.id})
    }
}
module.exports = serializeUser