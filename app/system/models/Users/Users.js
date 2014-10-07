var UserCollection=require('./UsersCollection.js');
var mongoose=require('mongoose');
var UserGoals=require('./UserGoals.js');
var UserTransactions=require('./Transactions.js');
var jwt = require('jwt-simple');

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
  getRoles:function(id,fields,options,callback){
    UserCollection.findOne({_id:id},fields,options).populate('roles').exec(function(err,objs){
      if(objs)
        return callback(err,objs.roles);
      else return callback(err,null);
    });
  },
  getTotalCash: function (id,fields,options,populationData,callback){
      UserCollection.findOne({_id: id},fields,options).populate(populationData).exec(callback);
  },
  getMedals:function(id,fields,options,populationdata,limit,offset,callback){
      if(populationdata)
          UserCollection.findOne( {'_id':id},{ items:{ $slice: [ parseInt(offset),parseInt(limit) ] } },fields,options).populate('medals').exec(callback);
      else
      {
          UserCollection.findOne({'_id':id},fields,options).populate('medals').exec(callback);

      }
//    UserCollection.findOne({_id:id},fields,options).populate('medals').exec(function(err,objs){
//      if(objs)
//        return callback(err,objs.medals);
//      else return callback(err,null);
//    });
  },
  getStoreItemsOfUser:function(id,fields,options,limit,offset,callback){
      if(options)
          UserCollection.findOne( {'_id':id},{ items:{ $slice: [ parseInt(offset),parseInt(limit) ] } }).populate('items').exec(callback);
      else
      {
          UserCollection.findOne({'_id':id}).exec(callback);

//          UserCollection.findOne({'_id':id},fields,options).populate('items').exec(callback);

      }
//      UserCollection.findOne({'_id':id}).exec(callback);

  },
  addRole:function(userId,role,callback){
    UserCollection.update({_id:userId},{$push:{roles:role}},callback);
  },
  addPoints:function(userId,points,callback){
    UserCollection.update({_id:userId},{$push:{points:points}},callback);
  },

  addTeam:function(userId,teamId,callback){
    UserCollection.update({_id:userId},{$push:{teams:teamId}},callback);
  },
  removeTeam:function(userId,role,callback){
    UserCollection.update({_id:userId},{$pull:{teams:teamId}},callback);
  },
  addFollower:function(userId,followerId,callback){
    UserCollection.update({userId:userId},{$push:{followers:followerId}},callback);
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

//  getUsersOfOrganization:function(orgId,fields,options,populationData,callback){
//    UserCollection.find({orgId:orgId},fields,options).exec(callback);
//  },
    getUsersOfOrganization: function (orgId, fields,options,populationData,limit,offset,callback) {
        if(options)
            UserCollection.find({orgId: orgId},fields).skip(parseInt(offset)).populate(populationData).limit(limit).exec(callback);
        else
            UserCollection.find({orgId:orgId},fields,options).exec(callback);

    },
  addPointsObject:function(userId,pointsObj,callback){
    if(!pointsObj.date)
      pointsObj.date=new Date();
    UserCollection.update({userId:userId},{$push:{points:pointsObj},$inc:{totalCash:pointsEarned,totalPoints:pointsObj.pointsEarned}},callback);
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
    IsAuthenticated:function(username,password,callback)
{
//    console.log('koop');

    var  user_email =username;
    var user_password =password;
    var username = { username: user_email };
    var secret = '123';
    var token = jwt.encode(username, secret);
// decode
        var decoded = jwt.decode(token, secret);
        var http = require('https');
        var pathOfLogin='/apiauthtoken/nb/create?SCOPE=Zohopeople/peopleapi&EMAIL_ID='+user_email+'&PASSWORD='+user_password;
//    console.log(pathOfLogin);
        var data = '';
        var options = {
            hostname: 'accounts.zoho.com',
            method: "POST",
            path:pathOfLogin,
            headers: {
                Accept:"application/json"
            }
        };
        var request = http.request(options, function(res) {
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function(chunk) {
//         resdata.send(token);
                console.log(data);
                return data;
//                resdata.send(data);
            });
        });

        request.end();
        request.on('error', function(e) {
            console.error(e);
        });

    },
  getTransactionHistoryOfUser:function(userId,callback){
    UserCollection.findOne({_id:userId},"items",{sort:"items.time"}).populate("items.item").exec(callback);
  }
  // getLiveGoalsOfUser:function(userId,currDate,tags,callback){
  //   var goalQuery={};
  //   goalQuery['goals.startDate']={$lte:currDate};
  //   goalQuery['goals.endDate']={$gte:currDate};
  //   if(tags)
  //     goalQuery.tags=tags;
  //   UserCollection.aggregate({$match:{_id:userId}}, {$unwind:'$goals'}, {$match:goalQuery}, {$group:{_id:'$_id',goals:{$push:'$goals'}}});
  // },
  // getUserRole:function(userId,callback){
  //     UserCollection.findOne({_id:userId}).roles
  // },
  // getGoalOfUser:function(userId,callback){ //fetch goal of user
  //     UserCollection.findOne({_id:userId}).goals
  // },
};
module.exports={
  Users:UserManagement,
  Goals:UserGoals,
  Transactions:UserTransactions
};
