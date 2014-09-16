var OrganizationsModel=require('../../models/Organizations');
var TeamModel=require('../../models/Teams');
var AuthorizationController=('../../controllers/AuthorizationController.js');
var HierarchyEngine={
    getTeamOrg:function(req,res){
        if(AuthorizationController.IsAuthorized(req.userId,teams,read)){
        TeamModel.getTeamOrg(req.id);
        }
    },
    addTeamToOrg:function(req,res){
        TeamModel.createTeam(req.orgId,req.data,function(err,obj){
            if(err) callback(err);
            else{
                TeamModel.addTeamsToTeam(obj._id,req.data);
            }
        });
    },
    addMemberToTeam:function(req,res){
        TeamModel.addMembersToTeam(req.id,req.data,function(err,obj){
            if(err){

            }
            if(err) callback(err);
            else{
                TeamModel.addMemberToTeam(obj._id,req.data);
            }
        });
    },
    removeTeamFromTeam:function(res,req)
    {
//        if(AuthorizationController.IsAuthorized(req.userId,teams,delete)) {
            TeamModel.removeTeamsToTeam(req.id, req.teams, callback)
//        }
    },
    deleteTeamFromOrg:function(res,req){
        TeamModel.deleteTeam(res.teamId);
    },
    updateTeam:function(req,res,callack){
        TeamModel.updateTeam(req,res);
    },
    addMembersToTeam:function(req,res){
        TeamModel.addMembersToTeam(req.teadId,req.data);
    }
};
module.exports=HierarchyEngine;
