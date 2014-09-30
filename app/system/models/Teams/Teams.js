var TeamsCollection=require('./TeamsCollection.js');
var mongoose=require('mongoose');

var Team= {
//    getTeamDetail: function (team,fields,options,populationData,callback){
//        TeamsCollection.find(({'_id': team}),fields,options).populate(populationData).exec(callback);
//    },
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
        TeamsCollection.remove({_id: id}, callback);
    },
    getStoresOfTeam:function(teamId,fields,options,populationData,callback){
//        if(populationData)
//        TeamsCollection.find({_id: teamId}).populate(populationData).exec(callback);
//      else{
//        TeamsCollection.find({_id:mongoose.Types.ObjectId(teamId)},fields,options,callback);
//      }
        TeamsCollection.findOne({'_id': teamId},fields,options).populate(populationData).exec(callback);
    },
    getTeamsOfUser: function (id,fields,options,populationData,callback){
        TeamsCollection.findOne({members: id},fields,options).populate(populationData).exec(callback);
    },
    getTeam: function (id,fields,options,populationData,callback){
        TeamsCollection.findOne({'_id': id},fields,options).populate(populationData).exec(callback);

//        TeamsCollection.findOne({members:id},fields,options).populate(populationData).exec(callback));
    },
    setTeamFieldById: function (id, fieldName, value, callback) {
        TeamsCollection.update({_id: id}, {$set: {fieldName: value}}, callback);
    },
    getTeamsOfOrganization: function (id, fields,options, populationData,callback) {
      TeamsCollection.find({}).populate(populationData).exec(callback);
//      if(populationData)
//        TeamsCollection.find({orgId: id}).populate(populationData).exec(callback);
//      else{
//        TeamsCollection.find({orgId:mongoose.Types.ObjectId(id)},fields,options,callback);
//      }
    },
    getTeamLeader: function (id,fields,options,populationData,callback){
        TeamsCollection.findOne(({'_id': id}),fields,options).populate(populationData).exec(callback);
    },
    setTeamLeader: function (id, leaderId, callback) {
        TeamsCollection.update({_id: id}, {$set: {teamLeaderId: leaderId}}, callback);
    },
    updateTeam: function (id, updateData, callback) {
        TeamsCollection.update({_id: id}, {$set: updateData}, callback);
    },
    addMembersToTeam: function (teamId, memberData, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {members: memberData}}, callback);
    },
    removeMemberFromTeam: function (teamId, members, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: {members: members}}, callback);
    },
    addSubteams: function (teamId, teamData, callback) {
        TeamsCollection.update({_id: teamId}, {$push: {teams: teamData}}, callback);
    },
    removeSubteam: function (teamId, subteams, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: {teams: subteams}}, callback);
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
    },
    findTeamOfUser:function(orgId,userId,callback){
        TeamsCollection.findOne({orgId:orgId});
//        db.blogpost.find({ 'tags' : 'tag1'}); //1
    },
    // AddTeamInOrg: function (organizationId, data) {
    //     data.organizationId = organizationId;
    //     var team = new TeamsCollection(data);
    //     team.created_at = new Date();
    //     team.save();
    //     return true;
    // }
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
            });
    },
    findParent_Team_name_ofTeam: function (id, calback) {
        TeamsCollection.findOne({'_id': id })
            .populate('parentTeamId').exec(function (err, parent) {
                if (err) return handleError(err);
//                console.log('The creator is %s', revenues.revenue.field);
                return parent.parentTeamId.name;
            });
    },
    findLeader_name_ofTeam: function (id, calback) {
        TeamsCollection.findOne({'_id': id })
            .populate('teamLeaderId').exec(function (err, leader) {
                if (err) return handleError(err);
//                console.log('The creator is %s', revenues.revenue.field);
                return leader.teamLeaderId.name;
            });

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
