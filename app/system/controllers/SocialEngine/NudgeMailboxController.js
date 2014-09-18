var NudgeMailboxModel=require('../../models/NudgeMailbox');
var NudgeMailboxController={
  getNudgeMailboxOfUser:function(req,res){
    NudgeMailboxModel.getNudgeMailboxOfUser(userId,callback);
  }
};
module.exports=NudgeMailboxController;
