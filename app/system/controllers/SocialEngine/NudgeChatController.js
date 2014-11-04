var NudgeChatModel=require('../../models/NudgeChat');
var NudgeChatController={
  getNudgeChatOfUser:function(req,res){
    NudgeChatModel.getNudgeChatOfUser(req.params.userId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  sendNudgeMessage:function(req,res){
    NudgeChatModel.addMessageToChat(req.params.userId,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send("success");
    });
  }
};
module.exports=NudgeChatController;
