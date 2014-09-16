var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var trainingSchema=new Schema({
    name:String,
    link:String,
    point_function:String,
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    user:[{type:Schema.Types.ObjectId,ref:'user'}],
    createdAt:Date
});
var training=mongoose.model('training',trainingSchema);
module.exports=training;

//org_Id :{type:Schema.Types.ObjectId,ref:'organization'}