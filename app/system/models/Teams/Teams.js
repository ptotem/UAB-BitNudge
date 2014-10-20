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

        if(options.slice.limits)
        {
            TeamsCollection.findOne({'_id': teamId},fields,{ stores:{ $slice:[parseInt(options.slice.offset),parseInt(options.slice.limits)] } }).populate(populationData).exec(callback);
        }

        else{
            TeamsCollection.findOne({'_id':teamId},fields).populate(populationData).exec(callback);
        }
//        if(populationData)
//        if(options)
//            TeamsCollection.findOne( {'_id':teamId},{ stores:{ $slice: [ parseInt(offset),parseInt(limit) ] } }).populate(populationData).exec(callback);
//            else{
//            TeamsCollection.find({_id: teamId}).populate(populationData).exec(callback);
//
//        }
//      else{
//        TeamsCollection.find({_id:mongoose.Types.ObjectId(teamId)},fields,options,callback);
//      }
//        TeamsCollection.findOne( {'_id':teamId},{ stores:{ $slice: [ parseInt(offset),parseInt(limit) ] } }).populate(populationData).exec(callback);
//        TeamsCollection.findOne({'_id': teamId},fields,options).populate(populationData).exec(callback);
    },
    getTeamsOfUser: function (id,fields,options,populationData,callback){
        TeamsCollection.findOne({members: id},fields,options).populate(populationData).exec(callback);
    },
    getTeam: function (id,fields,options,populationData,callback){
        TeamsCollection.findOne({'_id': id},fields,options).populate(populationData).exec(callback);

//        TeamsCollection.findOne({members:id},fields,options).populate(populationData).exec(callback));
    },
    getSubTeam: function (id,fields,options,populationData,callback){
//        TeamsCollection.findOne({'_id': id},fields,options).populate(populationData).exec(callback);
        if(options.slice.limits)
        {
            TeamsCollection.findOne({'_id': id},fields,{ teams:{ $slice:[parseInt(options.slice.offset),parseInt(options.slice.limits)] } }).populate(populationData).exec(callback);
        }

        else{
            TeamsCollection.findOne({'_id':id},fields).populate(populationData).exec(callback);
        }
//        if(options){
//            TeamsCollection.findOne( {'_id':id} ,fields,{ teams:{ $slice: [ parseInt(offset),parseInt(limit) ] } }).populate(populationData).exec(callback);
//
//        }
//        else{
//            TeamsCollection.findOne({'_id':id},fields).populate(populationData).exec(callback);
//        }

//        TeamsCollection.findOne({members:id},fields,options).populate(populationData).exec(callback));
    },
    getMembersOfTeam: function (id,fields,options,populationData,callback){
        if(options.slice.limits)
        {
        TeamsCollection.findOne({'_id': id},{ members:{ $slice:[parseInt(options.slice.offset),parseInt(options.slice.limits)] } }).populate(populationData).exec(callback);
        }

        else{
            TeamsCollection.findOne({'_id':id},fields).populate(populationData).exec(callback);
        }

//        TeamsCollection.findOne({members:id},fields,options).populate(populationData).exec(callback));

    },
    setTeamFieldById: function (id, fieldName, value, callback) {
        TeamsCollection.update({_id: id}, {$set: {fieldName: value}}, callback);
    },
//    getTeamsOfOrganization:function(orgId, fields,options, populationData,callback) {
//      TeamsCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
//    },
    getTeamsOfOrganization: function (id, fields,options,populationData,callback) {
//        console.log(options);
//        TeamsCollection.find({}).limit(limit).populate(populationData).exec(callback);
        TeamsCollection.find({orgId:id},fields,options).populate(populationData).exec(callback);

//        var p=parseInt(limit);
//        if(populationData)
//            TeamsCollection.find({orgId: id}).skip(parseInt(offset)).populate(populationData).limit(limit).exec(callback);
////        TeamsCollection.find({orgId: id}).populate(populationData).limit(limit).exec(callback);
//        else{
//            TeamsCollection.find({orgId:mongoose.Types.ObjectId(id)},fields,options,callback);
//        }

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
      TeamsCollection.update({_id: teamId},{$addToSet:{members:{$each: memberData}}}, callback);
    },
    removeMemberFromTeam: function (teamId, members, callback) {
      TeamsCollection.update({_id: teamId}, {$pull: {members: members}}, callback);
    },
    addSubteams: function (teamId, teamData, callback) {
      TeamsCollection.update({_id: teamId}, {$addToSet: {teams:{$each:teamData}}}, callback);
    },
    removeSubteam: function (teamId, subteams, callback) {
      TeamsCollection.update({_id: teamId}, {$pull: {teams: subteams}}, callback);
    },
    // addGoalToTeam:function(teamId,data,callback){
    //   TeamsCollection.update({_id:teamId},{$push:{goals:data}},callback);
    // },
    addStoresToTeam: function (teamId, storeData, callback) {
      TeamsCollection.update({_id: teamId}, {$addToSet: storeData}, callback);
    },
    removeStoresFromTeam: function (teamId, storeData, callback) {
        TeamsCollection.update({_id: teamId}, {$pull: storeData}, callback);
    },
    removeStoresFromAllTeams:function(storeData, callback) {
        TeamsCollection.update({}, {$pull: storeData}, callback);
    },
    // assignTrainingToTeam: function (teamId, training_id, callback) {
    //     TeamsCollection.update({_id: teamId}, {$push: {training: training_id}}, callback);
    // },
    findTeamOfUser:function(orgId,userId,callback){
        TeamsCollection.findOne({orgId:orgId},callback);
    }
};
module.exports=Team;
