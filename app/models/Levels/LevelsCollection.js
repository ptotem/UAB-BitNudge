var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var levelsSchema=new Schema({
  name:String,
  organizationId:Schema.Types.ObjectId,
  rangeMin:Number,
  rangeMax:Number
});
var levels=mongoose.model('levels',levelsSchema);
module.exports=levels;
