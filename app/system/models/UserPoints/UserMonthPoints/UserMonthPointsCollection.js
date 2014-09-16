var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
  _id:String,
  userId:String,
    // userId:{type:Schema.Types.ObjectId,ref:'user'},
    date:Date,
    points:[{pointsEarned:Number,type:String,from:Schema.Types.ObjectId}],
    totalPoints:Number,
    orgId:String,
    // orgId:Schema.Types.ObjectId,
    createdAt:Date
});
var actionSchemas=mongoose.model('userMonthPoints',userPointsSchema);
module.exports=actionSchemas;
