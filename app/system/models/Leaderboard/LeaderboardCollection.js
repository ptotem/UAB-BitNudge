var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var LeaderboardSchema=new Schema({
  date:Date,
  orgId:Schema.Types.ObjectId,
  playerRanks:[{
    rankNo:Number,
    player:{type:Schema.Types.ObjectId,ref:'users'}
  }],
  teamRanks:[{
    rankNo:Number,
    team:{type:Schema.Types.ObjectId,ref:'teams'}
  }],
  playerInTeamRanks:[{
    team:Schema.Types.ObjectId,
    playerRanks:[{
      rankNo:Number,
      player:{type:Schema.Types.ObjectId,ref:'users'}
    }]
  }],
  movers:[{
    rankNo:Number,
    player:{type:Schema.Types.ObjectId,ref:'users'}
  }],
  shakers:[{
    rankNo:Number,
    player:{type:Schema.Types.ObjectId,ref:'users'}
  }]
});
var LeaderboardCollection=mongoose.model('leaderboard',LeaderboardSchema);
module.exports=LeaderboardCollection;
