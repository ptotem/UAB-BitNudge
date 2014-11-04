var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var teamPointsSchema=new Schema({
    // userId:{type:Schema.Types.ObjectId,ref:'user'},
  teamId:Schema.Types.ObjectId,
  date:Date,
  // points:[{pointsEarned:Number,type:String,from:Schema.Types.ObjectId}],
  totalPoints:Number,
  orgId:Schema.Types.ObjectId,
  createdAt:Date
});
var actionSchemas=mongoose.model('teamQuarterPoints',teamPointsSchema);
module.exports=actionSchemas;
