var UserCollection=require('./UserManagementCollection.js');
var userRoutes=require('./UserManagementRoutes.js');
var UserManagement={
  getUserSchema:function(){
    return UserCollection.Schema;
  },
  //the attribute data is an object which contains key value pairs of the fields and values.
  createUser:function(organizationId,data){
    //password is in plain text, they must be salted and shed
    //obviously, salt and hash it properly.
    data.createdAt=new Date();
    data.organizationId=organizationId;
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
  addRole:function(userId,role,callback){
    UserCollection.update({_id:userId},{$push{roles:role}},callback);
  },
  addPoints:function(userId,points,callback){
    UserCollection.update({_id:userId},{$push:{points:points}},callback);
  },
  addGoal:function(userId,goalId,callback){
    UserCollection.update({userId:userId},{$push:{goals:goalId}},callback);
  },
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
  //pointsData is an object {pointsEarned,fromTransaction,fromGoal}
  incrementUserCashAndPointsBy:function(userId,pointsData,callback){
    var points=pointsData.pointsEarned;
    UserCollection.update({_id:userId},{$push:{points:pointsData},$inc:{totalPoints:points,totalCash:points}},callback);
    // UserCollection.update({_id:userId},{$inc:{cash:points}},callback);
  },
  getUser:function(id,fields,options,populationData,callback){
    UserCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getUserByAuthentication:function(username,password,callback){
    passwordSalt=password+"salt!";
    UserCollection.findOne({username:username,passwordSalt:passwordSalt},callback);
  }
}
module.exports=UserManagement;
