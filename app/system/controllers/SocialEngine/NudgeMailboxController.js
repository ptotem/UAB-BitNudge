var NudgeMailboxModel=require('../../models/NudgeMailbox');
var NudgeMailboxController={
  getNudgeMailboxOfUser:function(userId,limit,callback){
    NudgeMailboxModel.getNudgeMailboxOfUser(userId,callback);
  }
  // sendNudgeMessage:function(userId,messageData,callback){
  //   NudgeMailboxModel.addMessageToChat(userId,messageData,callback);
  // }
};
module.exports=NudgeMailboxController;
