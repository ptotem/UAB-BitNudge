var UserCollection=require('./UsersCollection.js');
var mongoose=require('mongoose');
var UserGoals=require('./UserGoals.js');
var UserTransactions=require('./Transactions.js');

var UserManagement={
  getUserSchema:function(){
    return UserCollection.Schema;
  },
  //the attribute data is an object which contains key value pairs of the fields and values.
  createUser:function(organizationId,data,callback){
    //password is in plain text, they must be salted and shed
    //obviously, salt and hash it properly.
    data.createdAt=new Date();
    data.orgId=mongoose.Types.ObjectId(organizationId);
    if(data.password){
      data.passwordSalt=data.password+"salt!";
      data.passwordHash=data.password+"hash!";
    }
    else return false;
    delete data.password;
    var newUser=new UserCollection(data);
    newUser.save(callback);
  },
  //this sets the field of a user given the user object
  updateUser:function(id,updateData,callback){
    UserCollection.update({_id:id},{$set:updateData},callback);
  },
  getRoleOfUser:function(id,fields,options,callback){
    UserCollection.findOne({_id:id},fields,options).populate('roles').exec(function(err,objs){
      if(objs)
        return callback(err,objs.roles);
      else return callback(err,null);
    });
  },
  getTotalCash: function (id,fields,options,populationData,callback){
      UserCollection.findOne({_id: id},fields,options).populate(populationData).exec(callback);
  },
  setLevelOfUser:function(userId,levelNo,callback){
    UserCollection.update({_id:userId},{$set:{level:levelNo}},callback);
  },
  getMedals:function(id,fields,options,populationdata,callback){
      if(options.slice.limits)
      {
          UserCollection.findOne({'_id': id},fields,{ medals:{ $slice:[parseInt(options.slice.offset),parseInt(options.slice.limits)] } }).populate('medals').exec(callback);
      }

      else{
         UserCollection.findOne({_id:id},fields,options).populate('medals').exec(function(err,objs){
             if(objs)
                 return callback(err,objs.medals);
             else return callback(err,null);
         });
      }
  },
  getStoreItemsOfUser:function(id,fields,options,limit,offset,callback){
      if(options.slice.limits)
      {
          UserCollection.findOne({'_id': id},fields,{ items:{ $slice:[parseInt(options.slice.offset),parseInt(options.slice.limits)] } }).populate('items').exec(callback);
      }
      else{
          UserCollection.findOne({'_id':id},fields,options).populate('items').exec(callback);
      }
  },
  addRole:function(userId,role,callback){
    UserCollection.update({_id:userId},{$push:{roles:role}},callback);
  },
  setLastLogin:function(userId,date,callback){
    UserCollection.update({_id:userId},{$set:{lastLogin:date}},callback);
  },
  addTeam:function(userId,teamId,callback){
    UserCollection.update({_id:userId},{$push:{teams:teamId}},callback);
  },
  removeTeam:function(userId,role,callback){
    UserCollection.update({_id:userId},{$pull:{teams:teamId}},callback);
  },
  addFollower:function(userId,followerId,callback){
    UserCollection.update({userId:userId},{$push:{followers:followerId},$inc:{followerCount:1}},callback);
  },
  giveMedalToUser:function(userId,medalId,callback){
    UserCollection.update({_id:userId},{$push:{medals:medalId}},callback);
  },
  giveItemToUser:function(userId,itemId,callback){
    UserCollection.update({_id:userId},{$push:{items:itemId}},callback);
  },
  deleteUser:function(id,callback){
    UserCollection.remove({'_id':id},callback);
  },
  sortUsersByField:function(queryObj,fieldName,callback){
    UserCollection.find(queryObj).sort(fieldName).exec(callback);
  },
  getUser:function(id,fields,options,populationData,callback){
    UserCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getUsersOfOrganization: function (orgId, fields,options,populationData,callback) {
      UserCollection.find({orgId:orgId},fields,options).exec(callback);
  },
  addPointsObject:function(userId,pointsObj,callback){
    if(!pointsObj.date)
      pointsObj.date=new Date();
    UserCollection.update({userId:userId},{$push:{points:pointsObj},$inc:{totalCash:pointsObj.pointsEarned,totalPoints:pointsObj.pointsEarned}},callback);
  },
  getUserByAuthentication:function(username,password,callback){
    passwordSalt=password+"salt!";
    UserCollection.findOne({email:username,passwordSalt:passwordSalt},callback);
  },
  buyItemForUser:function(userId,itemId,time,cost,callback){
    var temp={
      time:time,
      item:itemId
    };
    UserCollection.update({_id:userId},{$push:{items:temp},$inc:{totalCash:-cost}},callback);
  },
  getTransactionHistoryOfUser:function(userId,callback){
    UserCollection.findOne({_id:userId},"items",{sort:"items.time"}).populate("items.item").exec(callback);
  }
};
module.exports={
  Users:UserManagement,
  Goals:UserGoals,
  Transactions:UserTransactions
};
