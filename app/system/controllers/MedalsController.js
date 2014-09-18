var MedalsModel=require('../models/Medals');

var MedalsController={
  createMedal:function(req,res){
    MedalsModel.createMedal(req.params.orgId,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send("success");
    });
  },
  updateMedal:function(req,res){
    MedalsModel.updateMedal(req.params.medalId,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send("success");
    });
  },
  getMedal:function(req,res){
    MedalsModel.getMedal(req.params.medalId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  getMedalsOfUser:function(req,res){
    UsersModel.getMedals(req.params.userId,function(err,goals){
      if(err) res.send(err);
      else res.send(goals);
    });
  },
  getMedalsOfOrganization:function(req,res){
    UserMedalsModel.getMedalsOfOrganization(req.params.orgId,function(err,objs){
      if(err) res.send(err);
      else res.send(objs);
    });
  },
  assignMedalToUser:function(req,res){
    UsersModel.giveMedalToUser(req.params.userId,req.query.medal,function(err,obj){
      if(err) res.send(err);
      else res.send("success");
    });
  },
};
module.exports=MedalsController;
