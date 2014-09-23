var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema=mongoose.Schema;
var tagSchema=new Schema({
    name:String,
    organizationId :{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt :Date
});
var Tag=mongoose.model('tag',tagSchema);
module.exports=Tag;