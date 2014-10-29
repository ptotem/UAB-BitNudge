var OrganizationResources=require('./OrganizationsResource');
var TeamResources=require('./TeamsResource');
var UserResources=require('./UsersResource');
var testResource=require('./Test/Test.js');
var RestApi={
  initialize:function(server){
    // var handlers=function(req,res,next){
    //   if(!req.query.token)
    //     res.send(401,{status:"You must enter a valid Auth Token. Obtain one after signing in."});
    //   else {
    //     if(req.query.token.expires<=new Date())
    //       res.send(401,{status:"Your token has expired. Please login again."});
    //   }
    //   return next();
    // };
    // var handlers="passport.authenticate('bearer',{session:false})";
    // OrganizationResources.initialize(server,handlers.toString());
    // TeamResources.initialize(server,handlers.toString());
    // UserResources.initialize(server,handlers.toString());
    testResource.initialize(server);
    OrganizationResources.initialize(server);
    TeamResources.initialize(server);
    UserResources.initialize(server);
  }
};
module.exports=RestApi;
