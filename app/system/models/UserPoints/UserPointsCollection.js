var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    teamId:Schema.Types.ObjectId,     //needed for sorting stuff. Do not remove. See RankController.
    date:Date,
    points:[{pointsEarned:Number,type:String,from:Schema.Types.ObjectId}],
    totalPoints:Number,
    orgId:Schema.Types.ObjectId,
    createdAt:Date
});
var actionSchemas=mongoose.model('action',userPointsSchema);
module.exports=actionSchemas;
