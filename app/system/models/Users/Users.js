var UserCollection=require('./UsersCollection.js');
var mongoose=require('mongoose');
var UserManagement={
  getUserSchema:function(){
    return UserCollection.Schema;
  },
  //the attribute data is an object which contains key value pairs of the fields and values.
  createUser:function(organizationId,data){
    //password is in plain text, they must be salted and shed
    //obviously, salt and hash it properly.
    data.createdAt=new Date();
    data.organizationId=mongoose.Types.ObjectId(organizationId);
    if(data.password){
      data.passwordSalt=data.password+"salt!";
      data.passwordHash=data.password+"hash!";
    }
    else return false;
    delete data.password;
    var newUser=new UserCollection(data);
    newUser.save();
    return true;
  },
  //this sets the field of a user given the user object
  updateUser:function(id,updateDate,callback){
    UserCollection.update({_id:id},{$set:updateData},callback);
  },
  // getGoals:function(id,fields,options,callback){
  //   UserCollection.findOne({_id:id},fields,options).populate('goals').exec(function(err,objs){
  //     if(objs)
  //       return callback(err,objs.goals);
  //     else return callback(err,null);
  //   });
  // },
  getRoles:function(id,fields,options,callback){
    UserCollection.findOne({_id:id},fields,options).populate('roles').exec(function(err,objs){
      if(objs)
        return callback(err,objs.roles);
      else return callback(err,null);
    });
  },
  getMedals:function(id,fields,options,callback){
    UserCollection.findOne({_id:id},fields,options).populate('medals').exec(function(err,objs){
      if(objs)
        return callback(err,objs.medals);
      else return callback(err,null);
    });
  },
  getItems:function(id,fields,options,callback){
    UserCollection.findOne({_id:id},fields,options).populate('items').exec(function(err,objs){
      if(objs)
        return callback(err,objs.items);
      else return callback(err,null);
    });
  },
  addRole:function(userId,role,callback){
    UserCollection.update({_id:userId},{$push:{roles:role}},callback);
  },
  addPoints:function(userId,points,callback){
    UserCollection.update({_id:userId},{$push:{points:points}},callback);
  },
  // addGoal:function(userId,goalId,callback){
  //   UserCollection.update({userId:userId},{$push:{goals:goalId}},callback);
  // },
  addClient:function(userId,clientId,callback){
    UserCollection.update({userId:userId},{$push:{clients:clientId}},callback);
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
  //pointsData is an object {pointsEarned,from,fromGoal}
  incrementUserCashAndPointsBy:function(userId,points,callback){
    UserCollection.update({_id:userId},{$inc:{totalPoints:points,totalCash:points}},callback);
    // UserCollection.update({_id:userId},{$inc:{cash:points}},callback);
  },
  getUser:function(id,fields,options,populationData,callback){
    UserCollection.findOne({_id:id},fields,options).exec(callback);
  },
  getUserByAuthentication:function(username,password,callback){
    passwordSalt=password+"salt!";
    UserCollection.findOne({username:username,passwordSalt:passwordSalt},callback);
  },
    buyItemToUser:function(userId,itemsdata,cost,callback){
        UserCollection.update({_id:userId},{$push:{items:itemsdata},$inc:{totalCash:-cost}},callback);
    },
    // getUserRole:function(userId,callback){
    //     UserCollection.findOne({_id:userId}).roles
    // },
    // getGoalOfUser:function(userId,callback){ //fetch goal of user
    //     UserCollection.findOne({_id:userId}).goals
    // },
    addGoalToUser:function(userId,goaldata,callback){
        UserCollection.update({_id:userId},{$push:{goals:goaldata}});//add goal to user
    }
};
module.exports=UserManagement;
