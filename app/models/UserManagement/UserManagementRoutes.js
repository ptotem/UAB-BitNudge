var userModel=require('./UserManagement.js');
var userManagementRoutes={
  'get /users/:id':function(req,res){
    userModel.getUser(req.params.id,function(err,obj){
      console.log(err+obj);
    });
  },
  'post /users':function(req,res){
    userModel.createUser(req.query);
  },
  'del /users/:id':function(req,res){
    userModel.deleteUser(req.params.id,function(err,obj){
      if(err)
        res.send(err);
      else res.send(obj);
    });
  },
  'post /users/:id':function(req,res){
    userModel.updateUserById(req.params.id,req.query,function(err,obj){
      if(err)
        res.send(err);
      else res.send(obj);
    });
  }
};
