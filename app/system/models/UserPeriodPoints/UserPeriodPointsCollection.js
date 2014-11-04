var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'users'},
  periods:[{
    period:String,
    date:Date,
    totalPoints:Number
  }],
  orgId:Schema.Types.ObjectId,
  createdAt:Date
});
var actionSchemas=mongoose.model('userPeriodPoints',userPointsSchema);
module.exports=actionSchemas;
