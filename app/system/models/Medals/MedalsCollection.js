var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var medalsSchema=new Schema({
  name:String,
  orgId:Schema.Types.ObjectId
});
var medals=mongoose.model('medals',medalsSchema);
module.exports=medals;
