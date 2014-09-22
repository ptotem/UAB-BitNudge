var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var roleSchema=new Schema({
    name:String,
    capabilities:[{model:String,permission:{
        read:Boolean,
        write:Boolean,
        update:Boolean,
        delete:Boolean,
        assign:Boolean,
        approve:Boolean
    }}],
    orgId :{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var Role=mongoose.model('role',roleSchema);
module.exports=Role;

