var UsersModel=require('../models/Users');
var Authentication={
  authenticate:function(req,res){
  },
  isAuthenticated:function(req){
    return req.isAuthenticated();
  },
  getUserDetail:function(req,detailField){
    if(Authentication.isAuthenticated(req))
      return req.user[detailField];
    else return null;
  },
  getUser:function(req){
    if(Authentication.isAuthenticated(req))
      return req.user;
    else return null;
  },
  getCurrentUser:function(req){
        if(Authentication.isUserAuthenticated())
          return req.user;
  }
};
module.exports=Authentication;
