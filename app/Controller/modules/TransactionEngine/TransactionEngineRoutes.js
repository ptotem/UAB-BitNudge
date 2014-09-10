var SocialEngineModel=require('./SocialEngine.js');
var SocialEngineRoutes={
  'post /status/:id/comments':function(req,res){
    //get orgId from authentication.
    SocialEngineModel.addCommentToStatus(null,req.params.id,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  'post /status/:id/likes':function(req,res){
    //get orgId from authentication.
    SocialEngineModel.addLikeToStatus(null,req.params.id,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  'post /users/:id/status':function(req,res){
    //get orgId from authentication.
    SocialEngineModel.addUserStatus(null,req.params.id,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  'post /users/:id/status':function(req,res){
    SocialEngineModel.getAllStatusesOfUser(req.params.id,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  }
};
module.exports=SocialEngineRoutes;
