var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var tagSchema=new Schema({
    name:String,
    type:String,
    value:String,
    organizationId :{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt :Date
});
var Tag=mongoose.model('tags',tagSchema);
module.exports=Tag;
