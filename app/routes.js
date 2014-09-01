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
    Collections.Acl.findOne({collectionName:"Organizations","controlList.role":req.user.role},function(err,obj){
      // if(obj.
      if(err)
        res.send("You cant add Organizations.");
      var test=new Collections.Organizations({name:req.query.name,teams:req.query.teams.split(',')});
      test.save();
      res.send("Org added.");
    });
});
server.post('/teams',function(req,res){
  if(req.query.name&&req.query.users)
  Collections.Acl.findOne({collectionName:"Teams","controlList.role":req.user.role},function(err,obj){
    // if(obj.
    if(err)
      res.send("You cant add TEams.");
    else{
      var test=new Collections.Teams({name:req.query.name,users:req.query.users.split(',')});
      test.save();
      res.send("Team added.");
    }
  });
});
server.get('/teams/:teamName',function(req,res){
  checkLoginBlock(req,res)
  Collections.Acl.findOne({collectionName:"Teams","controlList.role":req.user.role},function(err,obj){
    if(err)
    res.send("you cant see this team");
    else
    Collections.Teams.findOne({name:req.params.teamName},function(err,teamobj){
      res.send(teamobj);
    });
  });
});
server.get('/organizations/:orgName',function(req,res){
  checkLoginBlock(req,res)
  Collections.Acl.findOne({collectionName:"Organizations","controlList.role":req.user.role},function(err,obj){
    if(err)
    res.send("you cant see this org");
    else
    Collections.Organizations.findOne({name:req.params.orgName},function(err,teamobj){
      res.send(teamobj);
    });
  });

});
server.get('/login',passport.authenticate('local'),function(req,res){
  res.send(req.user);
});

