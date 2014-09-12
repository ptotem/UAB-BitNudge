var OrgModel=require('../../System/models/Organizations');
var TeamModel=require('../../System/models/Teams');
//var TeamModel=require('../../System/models/UserManagement');
var HierarchyEngine={

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
        TeamModel.removeTeamsToTeam(req.id,req.teams,callback)
    }



}



//
//var NudgeMailsModel=require('../../models/NudgeMails');
//var NudgeMailboxModel=require('../../models/NudgeMailbox');
//var NudgeMailsController={
//    createMail:function(orgId,mailData,callback){
//        NudgeMailsModel.createNudgeMail(orgId,mailData,callback);
//    },
//    sendMail:function(mailData,callback){
//        var receivers=mailData.receivers;
//        NudgeMailsModel.createNudgeMail(orgId,mailData,function(err,obj){
//            if(err) return handleError(err);
//            receivers.forEach(function(receiver){
//                NudgeMailboxModel.addMailToUserMailbox(userId,obj._id,function(){});
//            });
//            return callback(err,obj);
//        });
//    },
//    editMail:function(id,updatedData,callback){
//        NudgeMailsModel.updateMail(id,updatedData,callback);
//    },
//    deleteMail:function(id,callback){
//        NudgeMailsModel.deleteMail(id,callback);
//    }
//};
module.exports=NudgeMailsController;
