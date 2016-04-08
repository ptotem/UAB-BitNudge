var SimulatedUserCollection=require('./SimulatedUsersCollection.js');
var mongoose=require('mongoose');
var SimulatedUserGoals=require('./SimulatedUserGoals.js');
var SimulatedUserTransactions=require('./SimulatedUserTransactions.js');
var bcrypt=require('bcryptjs');

var SimulatedUserManagement={
  getSimulatedUserSchema:function(){
    return SimulatedUserCollection.schema;
  },
  createSimulationOfUser:function(clonedUserData,callback){
    clonedUserData._id=undefined;
    if(!clonedUserData.orgId)
      callback("orgId of the doc must be set");
    if(!clonedUserData.userId)
      callback("userId of the doc must be set");
    clonedUserData.createdAt=new Date();
    SimulatedUserCollection.findOne({userId:clonedUserData.userId},function(err,simUser){
      if(!simUser){
        var newUser=new SimulatedUserCollection(clonedUserData);
        newUser.save(callback);
      }
      else
        SimulatedUserCollection.update({userId:clonedUserData.userId},{$set:clonedUserData},callback);
    });
  },
  setLevelOfSimulatedUser:function(userId,levelNo,callback){
    SimulatedUserCollection.update({_id:userId},{$set:{level:levelNo}},callback);
  },
  getMedals:function(id,fields,options,populationdata,callback){
      if(options.slice.limits)
      {
          SimulatedUserCollection.findOne({'_id': id},fields,{ medals:{ $slice:[parseInt(options.slice.offset),parseInt(options.slice.limits)] } }).populate('medals').exec(callback);
      }

      else{
         SimulatedUserCollection.findOne({_id:id},fields,options).populate('medals').exec(function(err,objs){
             if(objs)
                 return callback(err,objs.medals);
             else return callback(err,null);
         });
      }
  },
  getStoreItemsOfSimulatedUser:function(id,fields,options,limit,offset,callback){
      if(options.slice.limits)
      {
          SimulatedUserCollection.findOne({'_id': id},fields,{ items:{ $slice:[parseInt(options.slice.offset),parseInt(options.slice.limits)] } }).populate('items').exec(callback);
      }
      else{
          SimulatedUserCollection.findOne({'_id':id},fields,options).populate('items').exec(callback);
      }
  },
  addFollower:function(userId,followerId,callback){
    SimulatedUserCollection.update({userId:userId},{$push:{followers:followerId},$inc:{followerCount:1}},callback);
  },
  giveMedalToSimulatedUser:function(userId,medalId,callback){
    SimulatedUserCollection.update({_id:userId},{$push:{medals:medalId}},callback);
  },
  giveItemToSimulatedUser:function(userId,itemId,callback){
    SimulatedUserCollection.update({_id:userId},{$push:{items:itemId}},callback);
  },
  getSimulatedUser:function(id,fields,options,populationData,callback){
    SimulatedUserCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getSimulatedUsersOfOrganization: function (orgId, fields,options,populationData,callback) {
      SimulatedUserCollection.find({orgId:orgId},fields,options).exec(callback);
  },
  addPointsObject:function(userId,pointsObj,callback){
    if(!pointsObj.date)
      pointsObj.date=new Date();
    SimulatedUserCollection.update({userId:userId},{$push:{points:pointsObj},$inc:{totalCash:pointsObj.pointsEarned,totalPoints:pointsObj.pointsEarned}},callback);
  },
  buyItemForSimulatedUser:function(userId,itemId,time,cost,callback){
    var temp={
      time:time,
      item:itemId
    };
    SimulatedUserCollection.update({_id:userId},{$push:{items:temp},$inc:{totalCash:-cost}},callback);
  },
  getTransactionHistoryOfSimulatedUser:function(userId,callback){
    SimulatedUserCollection.findOne({_id:userId},"items",{sort:"items.time"}).populate("items.item").exec(callback);
  }
};
module.exports={
  Users:SimulatedUserManagement,
  Goals:SimulatedUserGoals,
  Transactions:SimulatedUserTransactions
};
