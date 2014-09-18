var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var trainingSchema=new Schema({
    name:String,
    link:String,
    pointFunction:String,
    orgId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var training=mongoose.model('training',trainingSchema);
module.exports=training;

//org_Id :{type:Schema.Types.ObjectId,ref:'organization'}