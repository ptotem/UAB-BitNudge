var UserCollection=require('./UserManagementCollection.js');
var userRoutes=require('./UserManagementRoutes.js');
var UserManagement={
  initialize:function(server){
    //initializing routes.
    for(property in userRoutes)
    {
      methods=property.split(" ");
      eval("server."+methods[0]+"('"+methods[1]+"',"+userRoutes[property]+');');
    }
    console.log("Users initialized");
  },
  getUserDetail:function(user,fieldName){
  },
  getUserSchema:function(){
    return UserCollection.Schema;
  },
  //the attribute data is an object which contains key value pairs of the fields and values.
  createUser:function(organizationId,data){
    //password is in plain text, they must be salted and shed
    //obviously, salt and hash it properly.
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
  setUserField:function(user,fieldName,value){
    user[fieldName]=value;
    user.save();
  },
  setUserFieldById:function(id,fieldName,value,callback){
    UserCollection.update({_id:id},{$set:{fieldName:value}},callback);
  },
  addRole:function(userId,role,callback){
    UserCollection.update({_id:userId},{$push:{roles:role}},callback);
  },
  addPoints:function(userId,points,callback){
    UserCollection.update({_id:userId},{$push:{points:points}},callback);
  },
  deleteUser:function(id,callback){
    UserCollection.remove({'_id':id},callback);
  },
  giveMedalToUser:function(userId,medalId,callback){
    UserCollection.update({_id:userId},{$push:{medals:medalId}},callback);
  },
  giveItemToUser:function(userId,itemId,callback){
    UserCollection.update({_id:userId},{$push:{items:itemId}},callback);
  },
  incrementUserCashAndPointsBy:function(userId,points,callback){
    UserManagement.addPoints(userId,points,callback);
    // UserManagement.getUserDetail(userId,'cash',function(err,obj){
    //   if(err) return;
    //   else {
    //     totalCash=obj+points;
    //     UserManagement.setUserFieldById(userId,'cash',totalCash,callback);
    //   }
    // });
    UserCollection.update({_id:userId},{$inc:{cash:points}},callback);
  },
  getUser:function(id,callback){
    UserCollection.findOne({_id:id},callback);
  },
  getUserByAuthentication:function(username,password,callback){
    passwordSalt=password+"salt!";
    UserCollection.findOne({username:username,passwordSalt:passwordSalt},callback);
  }
}
module.exports=UserManagement;
