var MedalsModel=require('../models/Medals');

var MedalsController={
  createMedal:function(req,res){
    MedalsModel.createMedal(orgId,data);
  },
  updateMedal:function(req,res){
    MedalsModel.updateMedal(id,updateData,function(err,obj){
      res.send(obj);
    });
  },
  getMedal:function(req,res){
    MedalsModel.getMedal(id,function(err,obj){
      res.send(obj);
    });
  },
  getMedalsOfUser:function(req,res){
    UsersModel.getMedals(userId,function(err,goals){
      res.send(goals);
    });
  },
  getMedalsOfOrganization:function(req,res){
    UserMedalsModel.getMedalsOfOrganization(orgId,function(err,objs){
      res.send(objs);
    });
  },
  assignMedalToUser:function(req,res){
    UsersModel.giveMedalToUser(userId,medalId,function(err,obj){
      res.send("success");
    });
  },
};
module.exports=MedalsController;
