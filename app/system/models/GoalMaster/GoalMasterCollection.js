var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalMasterSchema=new Schema({
    name:String,
    transactionId:[{type:Schema.Types.ObjectId,ref:'transaction'}],
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt :Date
});
var goalMaster=mongoose.model('goalMaster',goalMasterSchema);
module.exports=goalMaster;