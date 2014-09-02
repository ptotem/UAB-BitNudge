var Controller={
  addOrganization:function(Collections,response,userRole,userName,userTeams){
    Collections.Acl.findOne({collectionName:"Organizations","controlList.role":userRole},function(err,obj){
      if(err)
        response.send("You cant add Organizations.");
      else{
        var test=new Collections.Organizations({name:userName,teams:userTeams.split(',')});
        test.save();
        response.send("Org added.");
      }
    });
  },
  updateOrganization:function(Collections,res,orgName,fieldsObject){
    Collections.Acl.findOne({collectionName:"Organizations","controlList.role":userRole},function(err,obj){
      if(err)
        res.send("You cant update.");
      else{
        Collections.Organizations.update({name:orgName},fieldsObject,function(err,obj){
          if(err)
            res.send("Not possible");
          else
            res.send("Updated.");
        });
      }
    });
  },
  deleteOrganization:function(Collections,res,userRole,orgName){
    Collections.Acl.findOne({collectionName:"Organizations","controlList.role":userRole},function(err,obj){
      if(err)
        res.send("You cant delete.");
      else{
        Collections.Organizations.remove({name:orgName},function(err,obj){
          if(err)
            res.send("Not possible");
          else
            res.send("Deleted.");
        });
      }
    });
  },
  addTeam:function(Collections,res,userRole,userName,users){
    Collections.Acl.findOne({collectionName:"Teams","controlList.role":userRole},function(err,obj){
      if(err)
        res.send("You cant add Teams.");
      else{
        var test=new Collections.Teams({name:userName,users:users.split(',')});
        test.save();
        res.send("Team added.");
      }
    });
  },
  updateTeam:function(Collections,res,teamName,fieldsObject){
    Collections.Acl.findOne({collectionName:"Teams","controlList.role":userRole},function(err,obj){
      if(err)
        res.send("You cant update.");
      else{
        Collections.Teams.update({name:teamName},fieldsObject,function(err,obj){
          if(err)
            res.send("No such team");
          else
            res.send("Updated.");
        });
      }
    });
  },
  deleteTeam:function(Collections,res,userRole,teamName){
    Collections.Acl.findOne({collectionName:"Teams","controlList.role":userRole},function(err,obj){
      if(err)
        res.send("You cant delete.");
      else{
        Collections.Teams.remove({name:teamName},function(err,obj){
          if(err)
            res.send("No such team");
          else
            res.send("Deleted.");
        });
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
