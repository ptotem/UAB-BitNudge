var NudgeMailboxModel=require('../../models/NudgeMailbox');
var NudgeMailboxController={
  getNudgeMailboxOfUser:function(req,res){
    NudgeMailboxModel.getNudgeMailboxOfUser(req.params.userId,"","","",callback);
  }
};
module.exports=NudgeMailboxController;
