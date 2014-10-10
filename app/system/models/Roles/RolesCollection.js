var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var roleSchema=new Schema({
    name:String,
    capabilities:[{model:String,
      capabilities:[{method:String,capability:{type:Schema.Types.ObjectId,ref:'capabilities'}}]
    }],
    // orgId :{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var Role=mongoose.model('roles',roleSchema);
module.exports=Role;

