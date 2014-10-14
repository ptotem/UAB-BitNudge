var OrganizationsModel=require('../../models/Organizations');
var TeamModel=require('../../models/Teams');
var TeamPeriodPointsModel=require('../../models/TeamPeriodPoints');
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
    // getTeamsOfOrganization:function(req,res){
    //   var r=req.query.limits;
    //   var last=req.query.offset;
    //   TeamModel.getTeamsOfOrganization(req.params.orgId,"",{ limit : req.query.limits ,skip :req.query.offset},"",function(err,objs){
    //       if(err){
    //           res.send("fail");
    //           return handleError(err);
    //       }
    //       res.send(objs);
    //   });
    // },
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
    TeamModel.createTeam(req.params.orgId,req.body,function(err,team){
      if(err) return res.send(err);
      TeamPeriodPointsModel.createTeamPeriodPoints(req.params.orgId,team._id,{},function(err1){res.send(err1);});
      if(req.body.members)
        req.body.members.forEach(function(userId){
          UserModel.Users.addTeam(userId,team._id,function(){});
        });
      res.send(team);
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
      TeamModel.addMembersToTeam(req.params.teamId,req.body.members,function(err,obj){
          if(err){
            res.send("fail");
            return handleError(err);
          }
          else{
            if(req.body.members)
              req.body.members.forEach(function(userId){
                UserModel.addTeam(userId,req.params.teamId,function(){});
              });
            res.send("success");
          }
      });
  },
//     getMembersOfTeam:function(req,res){
//         TeamModel.getMembersOfTeam(req.params.teamId,"members",  {  slice: {  limits: parseInt(req.query.limits), offset: parseInt(req.query.offset) }
//  } ,"members",function(err,obj){
// //          console.log(req.params.teamId,"members","","members",req.params.limits);
//             if(err){
//                 res.send("fail");
//                 return handleError(err);
//             }
//             else{
//                 res.send(obj);
//             }
//         });
//     },
 getMembersOfTeam:function(req,res){
     TeamModel.getTeam(req.params.teamId,"members","","members",function(err,obj){
         if(err){
           res.send("fail");
           return handleError(err);
         }
         else{
           res.send(obj);
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
    TeamModel.getSubTeam(req.params.teamId,"teams",req.query.limits,"teams",req.query.limits,req.query.offset, function(err,teams){
      if(err){
        res.send("fail");
        return handleError(err);
      }
      else{
        res.send(teams);
      }
    });
  },
  deleteTeam:function(req,res){
       TeamModel.deleteTeam(req.params.teamId);
  },
//    getStoresOfTeam:function(req,res){
//        // if(AuthorizationController.IsAuthorized(req.userId,Store,read)) {
//        TeamModel.getStoresOfTeam(req.params.teamId,function(err,obj){
//            if(err) res.send(err);
//            else res.send(obj);
//        });
//        // }
//    },
    getStoresOfTeam:function(req,res){
        TeamModel.getStoresOfTeam(req.params.teamId,"stores",  {  slice: {  limits: parseInt(req.query.limits), offset: parseInt(req.query.offset) }} ,"stores",function(err,obj){
            if(err){
                res.send("fail");
                return handleError(err);
            }
            else{
                res.send(obj);
            }
        });
    },

    addSubteam:function(req,res){
    TeamModel.addSubteams(req.params.teamId,req.body.subteam,function(err,obj){
      if(err){
        res.send("fail");
        return handleError(err);
      }
      else{
        res.send(obj);
      }
    });
  }
};
module.exports=HierarchyEngine;
