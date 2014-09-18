var TeamsCollection=require('./TeamsCollection.js');
var mongoose=require('mongoose');

var Team= {
    getTeamDetail: function (team, fieldName) {
        TeamsCollection.find(({'_id': team}).fieldName, callback);
    },
    getTeamSchema: function () {
        return TeamsCollection.Schema;
    },
    createTeam:function(organizationId, data,callback) {
      data.orgId=mongoose.Types.ObjectId(organizationId);
      data.createdAt = new Date();
      var team = new TeamsCollection(data);
      team.save(callback);
    },
    sortTeamsByField:function(queryObj,fieldName,callback){
      TeamsCollection.find(queryObj).sort(fieldName).exec(callback);
    },
    deleteTeam:function (id, callback) {
        TeamsCollection.remove({'_id': id}, callback);
    },
    getTeam: function (id,fields,options,populationData, callback) {
        TeamsCollection.findOne({'_id': id},fields,options).populate(populationData).exec(callback);
    },
    setTeamFieldById: function (id, fieldName, value, callback) {
        TeamsCollection.update({_id: id}, {$set: {fieldName: value}}, callback);
    },
    getTeamsInOrg: function (id, fields,options, populationData,callback) {
      if(populationData)
        TeamsCollection.find({orgId: id}).populate(populationData).exec(callback);
      else{ 
        TeamsCollection.find({orgId:mongoose.Types.ObjectId(id)},callback);
      }
    },
    getTeamLeader: function (id, callback) {
        TeamsCollection.findOne(({'_id': id}).teamLeaderId, callback);
    },
    setTeamLeader: function (id, leader_id, callback) {
        TeamsCollection.update({_id: id}, {$set: {teamLeaderId: leader_id}}, callback);
    },
    updateTeam: function (id, updateDate, callback) {
        TeamsCollection.update({_id: id}, {$set: updateData}, callback);
    },
    addMembersToTeam: function (teamId, memberData, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {members: memberData}}, callback);
    },
    removeMembersFromTeam: function (teamId, members, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: {members: members}}, callback);
    },
    addSubteams: function (teamId, teamData, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {teams: teamData}}, callback);
    },
    removeSubteam: function (teamId, teams, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: {teams: teams}}, callback);
    },
    // addGoalToTeam:function(teamId,data,callback){
    //   TeamsCollection.update({_id:teamId},{$push:{goals:data}},callback);
    // },
    addStoresToTeam: function (teamId, storeData, callback) {
        TeamsCollection.update({_id: teamId}, {$push: storeData}, callback);
    },
    removeStoresFromTeam: function (teamId, storeData, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: storeData}, callback);
    },
    removeStoresFromAllTeams:function(storeData, callback) {
        TeamsCollection.update({}, {$pull: storeData}, callback);
    },
    assignTrainingToTeam: function (teamId, training_id, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {training: training_id}}, callback);
    }
    // AddTeamInOrg: function (organizationId, data) {
    //     data.organizationId = organizationId;
    //     var team = new TeamsCollection(data);
    //     team.created_at = new Date();
    //     team.save();
    //     return true;
    // }
};
module.exports=Team;
