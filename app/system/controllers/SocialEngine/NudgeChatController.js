var NudgeChatModel=require('../../models/NudgeChat');
var NudgeChatController={
  getNudgeChatOfUser:function(userId,limit,callback){
    NudgeChatModel.getNudgeChatOfUser(userId,callback);
  },
  sendNudgeMessage:function(userId,messageData,callback){
    NudgeChatModel.addMessageToChat(userId,messageData,callback);
  }
};
module.exports=NudgeChatController;
