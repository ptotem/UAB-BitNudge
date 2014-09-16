var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    month:Date,
    points:[{pointsEarned:Number,type:String,from:Schema.Types.ObjectId}],
    totalPoints:Number,
    orgId:Schema.Types.ObjectId,
    createdAt:Date
});
var actionSchemas=mongoose.model('userMonthPoints',userPointsSchema);
module.exports=actionSchemas;
