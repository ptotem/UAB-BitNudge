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
    points:String,
    createdAt : Date
});
var Team=mongoose.model('team',teamsSchema);
module.exports=Team;

//name:String,teamLeaderId:String,organizationId:String,members:Array, parentTeamId:String, teams:Array

//{name,users,teams,leader,orgId,goals,stores,clients,revenue}

//org_Id :{type:Schema.Types.ObjectId,ref:'organization'}


