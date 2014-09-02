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

  server.post('/organizations',function(req,res){
    checkLoginBlock(req,res);
    if(req.query.name&&req.query.teams)
      res.send(Controller.addOrganization(Collections,res,req.user.role,req.query.name,req.query.teams));
  });

  server.post('/teams',function(req,res){
    if(req.query.name&&req.query.users)
      res.send(Controller.addTeam(Collections,res,req.user.role,req.query.name,req.query.teams));
  });

  server.get('/teams/:teamName',function(req,res){
    checkLoginBlock(req,res)
    res.send(Controller.getTeam(Collections,res,req.user.role,req.params.teamName));
  });

  server.get('/organizations/:orgName',function(req,res){
    checkLoginBlock(req,res);
    res.send(Controller.getOrganization(Collections,res,req.user.role,req.params.orgName));
  });

  server.get('/login',passport.authenticate('local'),function(req,res){
    res.send(req.user);
  });
}
module.exports={
  initializeRoutes:initializeRoutes
};
