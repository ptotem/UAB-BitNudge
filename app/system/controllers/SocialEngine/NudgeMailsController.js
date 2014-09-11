var NudgeMailsModel=require('../../models/NudgeMails');
var NudgeMailboxModel=require('../../models/NudgeMailbox');
var NudgeMailsController={
  createMail:function(orgId,mailData,callback){
    NudgeMailsModel.createNudgeMail(orgId,mailData,callback);
  },
  sendMail:function(mailData,callback){
    var receivers=mailData.receivers;
    NudgeMailsModel.createNudgeMail(orgId,mailData,function(err,obj){
      if(err) return handleError(err);
      receivers.forEach(function(receiver){
        NudgeMailboxModel.addMailToUserMailbox(userId,obj._id,function(){});
      });
      return callback(err,obj);
    });
  },
  editMail:function(id,updatedData,callback){
    NudgeMailsModel.updateMail(id,updatedData,callback);
  },
  deleteMail:function(id,callback){
    NudgeMailsModel.deleteMail(id,callback);
  }
};
module.exports=NudgeMailsController;
