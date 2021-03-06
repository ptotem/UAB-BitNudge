var MedalsModel=require('../models/Medals');
var UsersModel=require('../models/Users').Users;
var MedalsController={
  createMedal:function(req,res){
    MedalsModel.createMedal(req.params.orgId,req.body,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  updateMedal:function(req,res){
    MedalsModel.updateMedal(req.params.medalId,req.body,function(err,obj){
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
//      UserModel.getStoreItemsOfUser(req.params.userId,"",{  slice: {  limits: parseInt(req.query.limits), offset: parseInt(req.query.offset) }},"",function(err,obj){

              UsersModel.getMedals(req.params.userId,"",{  slice: {  limits: parseInt(req.query.limits), offset: parseInt(req.query.offset) }},"",function(err,goals){
      if(err) res.send(err);
      else res.send(goals);
    });
  },
  getMedalsOfOrganization:function(req,res){
    MedalsModel.getMedalsOfOrganization(req.params.orgId,"","",req.query.limits,req.query.limits,req.query.offset,function(err,objs){
      if(err) res.send(err);
      else res.send(objs);
    });
  },
  assignMedalToUser:function(req,res){
    UsersModel.giveMedalToUser(req.params.userId,req.body.medal,function(err,obj){
      if(err) res.send(err);
      else res.send("success");
    });
  }
};
module.exports=MedalsController;
