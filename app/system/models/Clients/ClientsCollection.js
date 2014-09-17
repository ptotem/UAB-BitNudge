var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var clientSchema=new Schema({
    name:String,
    orgName:String,
    orgId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var clientTypes=mongoose.model('clientType',clientSchema);
module.exports=clientTypes;
//{ type: Schema.Types.ObjectId, ref: 'Story' }
