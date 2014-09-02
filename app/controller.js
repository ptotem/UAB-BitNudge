var Controller={

  addOrganization:function(Collections,response,userRole,userName,userTeams){
    Collections.Acl.findOne({collectionName:"Organizations","controlList.role":userRole},function(err,obj){
      // if(obj.
      if(err)
        response.send("You cant add Organizations.");
      var test=new Collections.Organizations({name:userName,teams:userTeams.split(',')});
      test.save();
      response.send("Org added.");
    });
  },
  addTeam:function(Collections,res,userRole,userName,users){
    Collections.Acl.findOne({collectionName:"Teams","controlList.role":userRole},function(err,obj){
      // if(obj.
      if(err)
        res.send("You cant add TEams.");
      else{
        var test=new Collections.Teams({name:userName,users:users.split(',')});
        test.save();
        res.send("Team added.");
      }
    });
  },
  getTeam:function(Collections,res,userRole,teamName){
    Collections.Acl.findOne({collectionName:"Teams","controlList.role":req.user.role},function(err,obj){
      if(err)
      res.send("you cant see this team");
      else
      Collections.Teams.findOne({name:teamName},function(err,teamobj){
        res.send(teamobj);
      });
    });
  },
  getOrganization:function(Collections,res,userRole,orgName){
    Collections.Acl.findOne({collectionName:"Organizations","controlList.role":userRole},function(err,obj){
      if(err)
      res.send("you cant see this org");
      else
      Collections.Organizations.findOne({name:orgName},function(err,teamobj){
        res.send(teamobj);
      });
    });
  }
}
module.exports=Controller;
