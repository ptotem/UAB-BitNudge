var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var levelsSchema=new Schema({
  name:String,
  orgId:{type:Schema.Types.ObjectId,ref:'organizations'},
  calculationFn:String,
  createdAt :Date
});
var levels=mongoose.model('levels',levelsSchema);
module.exports=levels;
