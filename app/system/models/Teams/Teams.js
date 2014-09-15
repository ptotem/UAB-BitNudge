var TeamsCollection=require('./TeamsCollection.js');
//var UserCollection=require('./UserManagementCollection.js');
var userRoutes=require('./TeamsRoutes.js');

var Team= {
    getTeamDetail: function (team, fieldName) {
        TeamsCollection.find(({'_id': team}).fieldName, callback);
    },
    getTeamSchema: function () {
        return TeamsCollection.Schema;
    },
    createTeam: function (organizationId, data) {
        var team = new TeamsCollection(data);
        team.created_at = new Date();
        team.save();
        return true;
    },
    deleteTeam: function (id, callback) {
        TeamsCollection.remove({'_id': id}, callback);
    },
    getTeam: function (id, callback) {
        TeamsCollection.findOne({'_id': id}, callback);
    },
    setTeamFieldById: function (id, fieldName, value, callback) {
        TeamsCollection.update({_id: id}, {$set: {fieldName: value}}, callback);
    },
    Teams_in_org: function (id, callback) {
        TeamsCollection.find({organizationId: id}, callback);
    },
    getTeamLeader: function (id, callback) {
        TeamsCollection.findOne(({'_id': id}).teamLeaderId, callback);
    },
    setTeamLeader: function (id, leader_id, callback) {
        TeamsCollection.update({_id: id}, {$set: {teamLeaderId: leader_id}}, callback);
    },
    updateTeam: function (id, fieldName, value, callback) {
        var temp = {};
        temp.created_at = new Date();
        temp[fieldName] = value;
        TeamsCollection.update({_id: id}, {$set: temp}, callback);
    },
    addMembersToTeam: function (teamId, memberData, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {members: memberData}}, callback);
    },
    removeMembersToTeam: function (teamId, members, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: {members: members}}, callback);
    },
    addTeamsToTeam: function (teamId, teamData, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {teams: teamData}}, callback);
    },
    removeTeamsToTeam: function (teamId, teams, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: {teams: teams}}, callback);
    },
    addStoresToTeam: function (teamId, storeData, callback) {
        TeamsCollection.update({_id: teamId}, {$push: storeData}, callback);
    },
    assign_trainingToTeam: function (teamId, training_id, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {training: training_id}}, callback);
    },
    AddTeamIn_org: function (organizationId, data) {
        data.organizationId = organizationId;
        var team = new TeamsCollection(data);
        team.created_at = new Date();
        team.save();
        return true;
    },
    findDetailsOfTeam: function (id, fieldname, calback) {
        var field = fieldname;
        TeamsCollection..findOne({ '_id': id })
            .populate('revenue').exec(function (err, revenues) {
                if (err) return handleError(err);
                console.log('The creator is %s', revenues.revenue.field);
                return revenues.revenue.field;
            })
    },
    findParent_Team_name_ofTeam: function (id, calback) {
        TeamsCollection..findOne({'_id': id })
            .populate('parentTeamId').exec(function (err, parent) {
                if (err) return handleError(err);
//                console.log('The creator is %s', revenues.revenue.field);
                return parent.parentTeamId.name;
            })
    },
    findLeader_name_ofTeam: function (id, calback) {
        TeamsCollection..findOne({'_id': id })
            .populate('teamLeaderId').exec(function (err, leader) {
                if (err) return handleError(err);
//                console.log('The creator is %s', revenues.revenue.field);
                return leader.teamLeaderId.name;
            })

    },

    //New Content:



    createTeam:function(organizationId,data){
        data.organizationId=organizationId;
        data.createdAt=new Date();
        var team=new TeamsCollection(data);
        team.save();
        return true;
    },
    getTeam:function(id,fields,options,populationData,callback){
        TeamsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getSocialFeedOfUser:function(userId,fields,options,populationParams,callback){
        TeamsCollection.find({userId:userId},fields,options).populate(populationParams).exec(callback);
    },
    addStoreToTeam:function(teamId,itemData,callback){
        TeamsCollection.update({_id:teamId},{$set:itemData},callback);
    },
    removeStoresToTeam: function (teamId, stores, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: {stores: stores}}, callback);
    }




}
module.exports=Team;
