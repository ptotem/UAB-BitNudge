var TeamsCollection=require('./TeamsCollection.js');

var Team= {
    initialize: function (server) {
        console.log("Team initialized");
    },
    getTeamDetail:function(team,fieldName){
        TeamsCollection.find({'_id' :team},callback).fieldName;
    },
    getTeamSchema:function(){
        return TeamsCollection.Schema;
    },
    createTeam:function(data){
        var team=new TeamsCollection(data);
        team.save();
        console.log('data Saved')
        return true;
    },
    deleteTeam:function(id,callback){
        TeamsCollection.remove({'_id':id},callback);
    },
    getTeam:function(id,callback){
        TeamsCollection.findOne({_id:id},callback);
    },
    setTeamFieldById:function(id,fieldName,value,callback){
        TeamsCollection.update({_id:id},{$set:{fieldName:value}},callback);
    },
    Teams_in_org:function(id,callback){
        TeamsCollection.find({organizationId:id},callback);
    },
    getTeamLeader:function(id,callback){
        TeamsCollection.findOne({'_id':id},callback).teamLeaderId;
    },
    setTeamLeader:function(id,leader_id,callback){
        TeamsCollection.update({_id:id},{$set:{teamLeaderId:leader_id}},callback);
    },
    updateTeam:function(id,fieldName,value,callback){
        var temp={};
        temp[fieldName]=value;
        TeamsCollection.update({_id:id},{$set:temp},callback);
    },
    addMembersToTeam:function(teamId,memberData,callback){
        TeamsCollection.update({_id:teamId},{$set:memberData},callback);
    },
    removeMembersToTeam:function(teamId,members,callback){
        TeamsCollection.update({_id:teamId},{$pull:{members:members}},callback);
    },
    addTeamsToTeam:function(teamId,teamData,callback){
        TeamsCollection.update({_id:teamId},{$set:teamData},callback);
    },
    removeTeamsToTeam:function(teamId,teams,callback){
        TeamsCollection.update({_id:teamId},{$pull:{teams:teams}},callback);
    },
    addStoresToTeam:function(teamId,storeData,callback){
        TeamsCollection.update({_id:teamId},{$set:storeData},callback);
    },
    createTeamInOrg:function(data,org_id){
        var team=new TeamsCollection({data:data,organizationId :org_id});
        team.save();
        console.log('data Saved')
        return true;
    }
}
module.exports=Team;
