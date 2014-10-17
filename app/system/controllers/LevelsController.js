var LevelsModel=require('../models/Levels');
var LevelsController={
  createLevelForOrganization:function(req,res){
    LevelsModel.getLevelOfOrganization(req.params.orgId,"","","",function(err1,obj1){
      if(!obj1)
        LevelsModel.createLevel(req.params.orgId,req.body,function(err,obj){
          if(err)res.send(err);
          else res.send(obj);
        });
      else LevelsModel.updateLevel(obj1._id,req.body,function(err,obj){
        if(err) res.send(err);
        else res.send("success");
      });
    });
  },
  getLevelOfOrganization:function(req,res){
    LevelsModel.getLevelOfOrganization(req.params.orgId,"","","",function(err,obj){
      if(err)res.send(err);
      else res.send(obj);
    });
  }
};
module.exports=LevelsController;
