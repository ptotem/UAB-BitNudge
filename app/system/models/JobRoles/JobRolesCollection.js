var mongoose=require('mongoose');
var Schema=mongoose.Schema;
// var SALT_WORK_FACTOR=10;
var jobRolesSchema=new Schema({
  orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
  jobRoles:[{
    name:String
  }],
  createdAt:Date
});
var JobRoles=mongoose.model('jobRoles',jobRolesSchema);
module.exports=JobRoles;
