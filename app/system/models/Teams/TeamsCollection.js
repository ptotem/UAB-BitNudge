var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost/test');
var Schema=mongoose.Schema;

var teamsSchema=new Schema({
    name:String,
    teamLeaderId:{type:Schema.Types.ObjectId,ref:'user'},
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    members :[{type:Schema.Types.ObjectId,ref:'user'}],
    parentTeamId :{type:Schema.Types.ObjectId,ref:'team'},
    teams :[{type:Schema.Types.ObjectId,ref:'team'}],
    stores :[{type:Schema.Types.ObjectId,ref:'store'}],
    training :[{type:Schema.Types.ObjectId,ref:'training'}],
    clients :[{type:Schema.Types.ObjectId,ref:'clientType'}],
    revenue :[{type:Schema.Types.ObjectId,ref:'revenues'}],
    points:Number,
    createdAt : Date
});
var Team=mongoose.model('teams',teamsSchema);
module.exports=Team;
