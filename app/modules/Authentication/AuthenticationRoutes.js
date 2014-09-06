var passport=require('passport');
var Routes={
  'post /login': "passport.authenticate('local')",
  'get /logout':function(req,res){
    req.logout();
  }
};
module.exports=Routes;
