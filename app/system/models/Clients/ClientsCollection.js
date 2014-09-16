var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var clientSchema=new Schema({
    name:String,
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var clientTypes=mongoose.model('client',clientSchema);
module.exports=clientTypes;
