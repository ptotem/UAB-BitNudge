var NudgeChatModel=require('../../models/NudgeChat');
var NudgeChatController={
  getNudgeChatOfUser:function(req,res){
    NudgeChatModel.getNudgeChatOfUser(userId,callback);
  },
  sendNudgeMessage:function(req,res){
    NudgeChatModel.addMessageToChat(userId,messageData,callback);
  }
};
module.exports=NudgeChatController;
