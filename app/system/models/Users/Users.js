var UserCollection=require('./UsersCollection.js');
var mongoose=require('mongoose');
var UserGoals=require('./UserGoals.js');
var UserTransactions=require('./Transactions.js');
var bcrypt=require('bcryptjs');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var UserManagement={
  getUserSchema:function(){
    return UserCollection.schema;
  },
  //the attribute data is an object which contains key value pairs of the fields and values.
  createUser:function(organizationId,data,callback){
    //password is in plain text, they must be salted and shed
    //obviously, salt and hash it properly.
    data.createdAt=new Date();
    data.orgId=organizationId;
    if(data.password){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
          data.password=hash;
          var newUser=new UserCollection(data);
          newUser.save(callback);
        });
      });
      // data.passwordSalt=data.password+"salt!";
      // data.passwordHash=data.password+"hash!";
    }
    else return callback("please give a password");
  },
  //this sets the field of a user given the user object
  updateUser:function(id,updateData,callback){
    UserCollection.update({_id:id},{$set:updateData},callback);
  },
  getRoleOfUser:function(id,fields,options,callback){
    UserCollection.findOne({_id:id},fields,options).populate('role').exec(function(err,objs){
      if(objs)
        return callback(err,objs.role);
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
  setRole:function(userId,role,callback){
    UserCollection.update({_id:userId},{$set:{role:role}},callback);
  },
  // addRole:function(userId,role,callback){
  //   UserCollection.update({_id:userId},{$push:{roles:role}},callback);
  // },
  setLastLogin:function(userId,date,callback){
    UserCollection.update({_id:userId},{$set:{lastLogin:date}},callback);
  },
  addTeam:function(userId,teamId,callback){
    UserCollection.update({_id:userId},{$push:{teams:teamId}},callback);
  },
  removeTeam:function(userId,teamId,callback){
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
      UserCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
  },
  addPointsObject:function(userId,pointsObj,callback){
    if(!pointsObj.date)
      pointsObj.date=new Date();
    UserCollection.update({userId:userId},{$push:{points:pointsObj},$inc:{totalCash:pointsObj.pointsEarned,totalPoints:pointsObj.pointsEarned}},callback);
  },
  getUserByAuthentication:function(username,password,fields,options,populationData,callback){
    UserCollection.findOne({email:username},fields,options).populate(populationData).exec(function(err,user){
      if(user.password) {
        bcrypt.compare(password, user.password, function(err, res){
          if(res===true)
          return callback(err,user);
          else return callback(err);
        });
      }
      else return callback("Incorrect email");
    });
  },
  setPasswordForUser:function(userId,password,callback){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password,salt,function(err,hash){
        UserCollection.update({_id:userId},{$set:{password:hash}},callback);
      });
    });
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
