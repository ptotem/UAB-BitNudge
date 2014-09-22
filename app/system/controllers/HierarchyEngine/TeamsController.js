var OrganizationsModel=require('../../models/Organizations');
var TeamModel=require('../../models/Teams');
var AuthorizationController=('../../controllers/AuthorizationController.js');
var HierarchyEngine={
  getTeam:function(req,res){
    TeamModel.getTeam(req.params.teamId,{_id:0},{},{path:'teams'},function(err,obj){
      if(err){
        res.send("fail"+err);
        return handleError(err);
      }
      res.send(obj);
    });
  },
  getTeamsOfOrganization:function(req,res){
    TeamModel.getTeamsOfOrganization(req.params.orgId,{_id:0},{},{path:'teams'},function(err,objs){
      if(err){
        res.send("fail");
        return handleError(err);
      }
      res.send(objs);
    });
  },
  createTeam:function(req,res){
    TeamModel.createTeam(req.params.orgId,req.body,function(err,obj){
      if(err) res.send("fail");
      else res.send(obj);
    });
  },
  updateTeam:function(req,res){
    TeamModel.updateTeam(req.params.teamId,req.body,function(err,obj){
      if(err){
        res.send("fail");
        return handleError(err);
      }
      res.send("success");
    });
  },
  addMemberToTeam:function(req,res){
      TeamModel.addMembersToTeam(req.id,req.body,function(err,obj){
          if(err){
            res.send("fail");
            return handleError(err);
          }
          else{
            res.send("success");
          }
      });
  },
  getMembersOfTeam:function(req,res){
      TeamModel.getTeam(req.params.teamId,"members","","members",function(err,obj){
          if(err){
            res.send("fail");
            return handleError(err);
          }
          else{
            res.send("success");
          }
      });
  },
  removeMemberFromTeam:function(req,res){
      TeamModel.removeMemberFromTeam(req.params.teamId,req.params.userId,function(err,obj){
          if(err){
            res.send("fail");
            return handleError(err);
          }
          else{
            res.send("success");
          }
      });
  },
  removeSubteam:function(res,req)
  {
    TeamModel.removeSubteam(req.params.teamId, req.params.subteamId, function(err){
      if(err){
        res.send("fail");
        return handleError(err);
      }
      else{
        res.send("success");
      }
    });
  },
  getSubteams:function(req,res){
    TeamModel.getTeam(req.params.teamId,"teams",{},{path:"teams"},function(err,teams){
      if(err){
        res.send("fail");
        return handleError(err);
      }
      else{
        res.send(teams);
      }
    });
  },
  // deleteTeamFromOrg:function(res,req){
  //     TeamModel.deleteTeam(res.teamId);
  // },
  addSubteam:function(req,res){
    TeamModel.addSubteams(req.params.teamId,req.body.subteam,function(err,obj){
      if(err){
        res.send("fail");
        return handleError(err);
      }
      else{
        res.send("success");
      }
    });
  }
};
module.exports=HierarchyEngine;
