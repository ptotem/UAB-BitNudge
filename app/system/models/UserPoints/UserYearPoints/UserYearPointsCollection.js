var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    teams:[Schema.Types.ObjectId],     //needed for sorting stuff. Do not remove. See RankController.
    quarter:Date,
    totalPoints:Number,
    orgId:Schema.Types.ObjectId,
    createdAt:Date
});
var actionSchemas=mongoose.model('userYearPoints',userPointsSchema);
module.exports=actionSchemas;
