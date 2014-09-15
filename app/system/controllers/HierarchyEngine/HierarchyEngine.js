var OrgModel=require('../../models/Organizations');
var TeamModel=require('../../models/Teams');
var AuthorizationController=('../../controllers/AuthorizationController.js');
var HierarchyEngine={
    getTeamOrg:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,teams,read,callback)){
        TeamModel.getTeamOrg(req.id,callback);
        }
    },
    addTeamToOrg:function(req,res,callback){
        TeamModel.createTeam(req.orgId,req.data,function(err,obj){
            if(err) callback(err);
            else{
                TeamModel.addTeamsToTeam(obj._id,req.data,callback);
            }
        });
    },
    addMemberToTeam:function(req,res,callback){
        TeamModel.addMembersToTeam(req.id,req.data,function(err,obj){
            if(err){

            }
            if(err) callback(err);
            else{
                TeamModel.addMemberToTeam(obj._id,req.data,callback);
            }
        });
    },
    removeTeamFromTeam:function(res,req,callback)
    {
//        if(AuthorizationController.IsAuthorized(req.userId,teams,delete,callback)) {
            TeamModel.removeTeamsToTeam(req.id, req.teams, callback)
//        }
    },
    deleteTeamFromOrg:function(res,req,callback){
        TeamModel.deleteTeam(res.teamId);
    },
    updateTeam:function(req,res,callack){
        TeamModel.updateTeam(req,res,callback);
    },
    addMembersToTeam:function(req,res,callback){
        TeamModel.addMembersToTeam(req.teadId,req.data,callback);
    }



}
module.exports=HierarchyEngine;
