var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var teamPointsSchema=new Schema({
  teamId:Schema.Types.ObjectId,
  date:Date,
  totalPoints:Number,
  orgId:Schema.Types.ObjectId,
  createdAt:Date
});
var actionSchemas=mongoose.model('teamMonthPoints',teamPointsSchema);
module.exports=actionSchemas;
