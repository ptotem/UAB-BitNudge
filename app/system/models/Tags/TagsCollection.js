var mongoose=require('mongoose');
<<<<<<< HEAD
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
=======
mongoose.connect('mongodb://localhost/test');
var Schema=mongoose.Schema;

var tagSchema=new Schema({
    name:String,
    organizationId :{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt :Date
});
var Tag=mongoose.model('tag',tagSchema);
module.exports=Tag;

>>>>>>> transaction Master,Goal Master and Tags
