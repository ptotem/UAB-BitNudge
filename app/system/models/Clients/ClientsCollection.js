var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var clientSchema=new Schema({
    name:String,
    org_Name:String,
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    created_at:Date
});
var clientTypes=mongoose.model('clientType',clientSchema);
module.exports=clientTypes;
//{ type: Schema.Types.ObjectId, ref: 'Story' }