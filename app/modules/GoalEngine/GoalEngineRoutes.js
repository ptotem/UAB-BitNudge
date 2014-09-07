var GoalEngineModel=require('./GoalEngine.js');
var GoalEngineRoutes={
  'post /status/:id/comments':function(req,res){
    //get orgId from authentication.
    GoalEngineModel.addCommentToStatus(null,req.params.id,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  'post /status/:id/likes':function(req,res){
    //get orgId from authentication.
    GoalEngineModel.addLikeToStatus(null,req.params.id,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  'post /users/:id/status':function(req,res){
    //get orgId from authentication.
    GoalEngineModel.addUserStatus(null,req.params.id,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  'post /users/:id/status':function(req,res){
    GoalEngineModel.getAllStatusesOfUser(req.params.id,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  }
};
module.exports=GoalEngineRoutes;
