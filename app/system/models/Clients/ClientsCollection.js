var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var clientSchema=new Schema({
    name:String,
    org_Name:String,
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var clientTypes=mongoose.model('client',clientSchema);
clientTypes.save();
//module.exports=clientTypes;
//{ type: Schema.Types.ObjectId, ref: 'Story' }

