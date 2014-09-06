var UserCollection=require('./UserManagementCollection.js');
var UserManagement={
  initialize:function(server){
    console.log("Users initialized");
  },
  getUserDetail:function(user,fieldName){
  },
  getUserSchema:function(){
    return UserCollection.Schema;
  },
  //the attribute data is an object which contains key value pairs of the fields and values.
  createUser:function(data){
    //password is in plain text, they must be salted and shed
    //obviously, salt and hash it properly.
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
  deleteUser:function(id,callback){
    UserCollection.remove({'_id':id},callback);
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
