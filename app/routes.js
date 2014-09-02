var Controller=require('./controller.js');
var initializeRoutes=function(server,Collections,passport){
  var checkLoginBlock=function(request,response){
    if(!request.isAuthenticated()){
      response.send("you need to authenticate yoself!");
      return;
    }
  };

  server.get('/',function(req,res){
    if(req.isAuthenticated())
      res.send('hahaha');
    else 
      res.send('please login first.');
  });

  server.get('/login',passport.authenticate('local'),function(req,res){
    res.send(req.user);
  });

  server.post('/organizations',function(req,res){
    checkLoginBlock(req,res);
    if(req.query.name&&req.query.teams)
      Controller.addOrganization(Collections,res,req.user.role,req.query.name,req.query.teams);
  });

  server.post('/organizations/:orgName',function(req,res){
    checkLoginBlock(req,res);
    //TODO:- check the query params here first. Make sure they
    //are allowed to be changed/updated.
    Controller.updateOrganization(Collections,res,req.user.role,req.params.orgName,req.query);
  });

  server.del('/organizations/:orgName',function(req,res){
    checkLoginBlock(req,res);
    Controller.deleteOrganization(Collections,res,req.user.role,req.params.orgName);
  });

  server.get('/organizations/:orgName',function(req,res){
    checkLoginBlock(req,res);
    Controller.getOrganization(Collections,res,req.user.role,req.params.orgName);
  });

  server.post('/teams',function(req,res){
    if(req.query.name&&req.query.users)
      Controller.addTeam(Collections,res,req.user.role,req.query.name,req.query.teams);
  });

  server.post('/teams/:teamName',function(req,res){
    checkLoginBlock(req,res);
    //TODO:- check the fields in the query params first.
    Controller.updateTeam(Collections,res,req.user.role,req.params.teamName,req.query);
  });

  server.del('/teams/:teamName',function(req,res){
    checkLoginBlock(req,res);
    Controller.deleteTeam(Collections,res,req.user.role,req.params.teamName);
  });

  server.get('/teams/:teamName',function(req,res){
    checkLoginBlock(req,res);
    Controller.getTeam(Collections,res,req.user.role,req.params.teamName);
  });

}
module.exports={
  initializeRoutes:initializeRoutes
};
