var TeamsCollection=require('./TeamsCollection.js');
var mongoose=require('mongoose');
//var UserCollection=require('./UserManagementCollection.js');

var Team= {
//    getTeamDetail: function (team,fields,options,populationData,callback){
//        TeamsCollection.find(({'_id': team}),fields,options).populate(populationData).exec(callback);
//    },
    getTeamSchema: function () {
        return TeamsCollection.Schema;
    },
    createTeam: function (orgId, data) {
        var team = new TeamsCollection(data);
        team.orgId=mongoose.Types.ObjectId(orgId);
        team.createdAt = new Date();
        team.save();
        return true;
    },
    sortTeamsByField:function(queryObj,fieldName,callback){
      TeamsCollection.find(queryObj).sort(fieldName).exec(callback);
    },
    deleteTeam:function (id, callback) {
        TeamsCollection.remove({'_id': id}, callback);
    },
    getTeam: function (id,fields,options,populationData,callback){
        TeamsCollection.findOne({'_id': id},fields,options).populate(populationData).exec(callback);
    },
    setTeamFieldById: function (id, fieldName, value, callback) {
        TeamsCollection.update({_id: id}, {$set: {fieldName: value}}, callback);
    },
    getTeamsInOrg: function (orgId, fields,options, populationData,callback) {
        TeamsCollection.find({orgId: orgId},fields,options).populate(populationData).exec(callback);
    },
    getTeamLeader: function (id,fields,options,populationData,callback){
        TeamsCollection.findOne(({'_id': id}),fields,options).populate(populationData).exec(callback);
    },
    setTeamLeader: function (id, leaderId, callback) {
        TeamsCollection.update({_id: id}, {$set: {teamLeaderId: leaderId}}, callback);
    },
    updateTeam: function (id, updateDate, callback) {
        TeamsCollection.update({_id: id}, {$set: updateData}, callback);
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
//    createTeamInOrg:function(data,org_id){
//        var team=new TeamsCollection({data:data,organizationId :org_id});
//        team.save();
//        console.log('data Saved')
//        return true;
//    },
    assign_trainingToTeam: function (teamId, trainingId, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {training: trainingId}}, callback);
    },
    AddTeamInOrg: function (orgId, data) {
        data.orgId = mongoose.Types.ObjectId(orgId);
        var team = new TeamsCollection(data);
        team.createdAt = new Date();
        team.save();
        return true;
    },


    findDetailsOfTeam: function (id, fieldname, calback) {
        var field = fieldname;
        TeamsCollection.findOne({ '_id': id })
            .populate('revenue').exec(function (err, revenues) {
                if (err) return handleError(err);
                console.log('The creator is %s', revenues.revenue.field);
                return revenues.revenue.field;
            })
    },
    findParent_Team_name_ofTeam: function (id, calback) {
        TeamsCollection.findOne({'_id': id })
            .populate('parentTeamId').exec(function (err, parent) {
                if (err) return handleError(err);
//                console.log('The creator is %s', revenues.revenue.field);
                return parent.parentTeamId.name;
            })
    },
    findLeader_name_ofTeam: function (id, calback) {
        TeamsCollection.findOne({'_id': id })
            .populate('teamLeaderId').exec(function (err, leader) {
                if (err) return handleError(err);
//                console.log('The creator is %s', revenues.revenue.field);
                return leader.teamLeaderId.name;
            })

    }
//    findTeam_of_Member: function (memberid, callback) {
//
//        for (var i = 0; i<TeamsCollection[0].members.length; i++) {
//            if(TeamsCollection[0].members[i]==memberid)
//            {
//                console.log(TeamsCollection[0].members[i]);
//            }
//        }
//    }

};

module.exports=Team;
