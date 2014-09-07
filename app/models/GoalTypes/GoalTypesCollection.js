var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goalTypesSchema=new Schema({
  name:String,
  pointsRanges:Number,
  organizationId:Schema.Types.ObjectId,
});
var goalTypes=mongoose.model('goalTypes',goalTypesSchema);
module.exports=goalTypes;
