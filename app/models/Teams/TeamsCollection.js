var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost/test');
var Schema=mongoose.Schema;

var teamsSchema=new Schema({
    name:String,
    teamLeaderId:Schema.Types.ObjectId,
    organizationId:Schema.Types.ObjectId,
    members :[Schema.Types.ObjectId],
    parentTeamId :Schema.Types.ObjectId,
    teams :[Schema.Types.ObjectId],
    stores :[Schema.Types.ObjectId]
});
var Team=mongoose.model('team',teamsSchema);
module.exports=Team;

//name:String,teamLeaderId:String,organizationId:String,members:Array, parentTeamId:String, teams:Array
