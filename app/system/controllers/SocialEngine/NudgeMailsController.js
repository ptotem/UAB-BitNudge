var NudgeMailsModel=require('../../models/NudgeMails');
var NudgeMailboxModel=require('../../models/NudgeMailbox');
var NudgeMailsController={
  // createMail:function(req,res){
  //   NudgeMailsModel.createNudgeMail(orgId,mailData,callback);
  // },
  getMail:function(req,res){
    NudgeMailsModel.getNudgeMail(req.params.mailId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  sendMail:function(req,res){
    var receivers=req.query.receivers;
    NudgeMailsModel.createNudgeMail(req.params.orgId,req.query,function(err,obj){
      if(err) return handleError(err);
      receivers.forEach(function(receiver){
        NudgeMailboxModel.addMailToUserMailbox(req.params.userId,obj._id,function(){});
      });
      return res.send("success");
    });
  },
  updateMail:function(req,res){
    NudgeMailsModel.updateMail(req.params.mailId,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  deleteMail:function(req,res){
    NudgeMailsModel.deleteMail(req.params.mailId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  }
};
module.exports=NudgeMailsController;
