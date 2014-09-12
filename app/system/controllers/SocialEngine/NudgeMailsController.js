var NudgeMailsModel=require('../../models/NudgeMails');
var NudgeMailboxModel=require('../../models/NudgeMailbox');
var NudgeMailsController={
  createMail:function(req,res){
    NudgeMailsModel.createNudgeMail(orgId,mailData,callback);
  },
  sendMail:function(req,res){
    var receivers=mailData.receivers;
    NudgeMailsModel.createNudgeMail(orgId,mailData,function(err,obj){
      if(err) return handleError(err);
      receivers.forEach(function(receiver){
        NudgeMailboxModel.addMailToUserMailbox(userId,obj._id,function(){});
      });
      return callback(err,obj);
    });
  },
  editMail:function(req,res){
    NudgeMailsModel.updateMail(id,updatedData,callback);
  },
  deleteMail:function(req,res){
    NudgeMailsModel.deleteMail(id,callback);
  }
};
module.exports=NudgeMailsController;
