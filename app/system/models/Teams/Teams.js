var TeamsCollection=require('./TeamsCollection.js');
//var UserCollection=require('./UserManagementCollection.js');

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
    sortTeamsByField:function(queryObj,fieldName,callback){
      TeamsCollection.find(queryObj).sort(fieldName).exec(callback);
    },
    deleteTeam:function (id, callback) {
        TeamsCollection.remove({'_id': id}, callback);
    },
    getTeam: function (id, callback) {
        TeamsCollection.findOne({'_id': id}, callback);
    },
    setTeamFieldById: function (id, fieldName, value, callback) {
        TeamsCollection.update({_id: id}, {$set: {fieldName: value}}, callback);
    },
    getTeamsInOrg: function (id, fields,options, populationData,callback) {
      if(populationData)
        TeamsCollection.find({organizationId: id}).populate(populationData).exec(callback);
      else TeamsCollection.find({orgId:id},callback);
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
//    createTeamInOrg:function(data,org_id){
//        var team=new TeamsCollection({data:data,organizationId :org_id});
//        team.save();
//        console.log('data Saved')
//        return true;
//    },
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

    },
//    findTeam_of_Member: function (memberid, callback) {
//
//        for (var i = 0; i<TeamsCollection[0].members.length; i++) {
//            if(TeamsCollection[0].members[i]==memberid)
//            {
//                console.log(TeamsCollection[0].members[i]);
//            }
//        }
//    }

}
module.exports=Team;
