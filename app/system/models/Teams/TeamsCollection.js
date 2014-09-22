var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var teamsSchema=new Schema({
    name:String,
    teamLeaderId:{type:Schema.Types.ObjectId,ref:'users'},
    orgId:{type:Schema.Types.ObjectId,ref:'organization'},
    members :[{type:Schema.Types.ObjectId,ref:'users'}],
    parentTeamId :{type:Schema.Types.ObjectId,ref:'teams'},
    teams :[{type:Schema.Types.ObjectId,ref:'teams'}],
    stores :[{type:Schema.Types.ObjectId,ref:'store'}],
    training :[{type:Schema.Types.ObjectId,ref:'training'}],
    clients :[{type:Schema.Types.ObjectId,ref:'clientType'}],
    revenue :[{type:Schema.Types.ObjectId,ref:'revenues'}],
    points:Number,
    createdAt : Date
});
var Team=mongoose.model('teams',teamsSchema);
module.exports=Team;
