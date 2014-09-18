var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var LeaderboardSchema=new Schema({
  month:Date,
  orgId:Schema.Types.ObjectId,
  playerRanks:[{
    rankNo:Number,
    player:{type:Schema.Types.ObjectId,ref:'users'}
  }],
  teamRanks:[{
    rankNo:Number,
    team:{type:Schema.Types.ObjectId,ref:'teams'}
    // team:String
  }],
  playerInTeamRanks:[{
    team:Schema.Types.ObjectId,
    playerRanks:[{
      rankNo:Number,
      player:{type:Schema.Types.ObjectId,ref:'users'}
    // player:String
    }]
  }],
  movers:[{
    rankNo:Number,
    player:{type:Schema.Types.ObjectId,ref:'users'}
    // player:String
  }],
  shakers:[{
    rankNo:Number,
    player:{type:Schema.Types.ObjectId,ref:'users'}
    // player:String
  }]
},{strict:false});
var LeaderboardCollection=mongoose.model('monthLeaderboard',LeaderboardSchema);
module.exports=LeaderboardCollection;
