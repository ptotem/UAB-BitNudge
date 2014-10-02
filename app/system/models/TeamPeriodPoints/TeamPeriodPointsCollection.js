var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var teamPointsSchema=new Schema({
  teamId:Schema.Types.ObjectId,
  periods:[{
    period:String,
    date:Date,
    totalPoints:Number
  }],
  orgId:Schema.Types.ObjectId,
  createdAt:Date
});
var actionSchemas=mongoose.model('teamPeriodPoints',teamPointsSchema);
module.exports=actionSchemas;
