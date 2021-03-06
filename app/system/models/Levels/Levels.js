var LevelsCollection=require('./LevelsCollection.js');
var mongoose = require('mongoose');
var Levels={
  createLevel:function(orgId,data,callback){
    Levels.getLevelOfOrganization(orgId,"","","",function(err,lev){
      if(lev){
        Levels.updateLevel(lev._id,data,callback);
      }
      else{
        data.createdAt=new Date();
        data.orgId=mongoose.Types.ObjectId(orgId);
        var l=new LevelsCollection(data);
        l.save(callback);
      }
    });
  },
  // getLevel:function(id,fields,options,populationData,callback){
  //   LevelsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  // },
  getLevelOfOrganization:function(orgId,fields,options,populationData,callback){
    LevelsCollection.findOne({orgId:orgId},fields,options).populate(populationData).exec(callback);
  },
  getLevelSchema:function(){
    return LevelsCollection.Schema;
  },
  deleteLevel:function(id,callback){
    LevelsCollection.remove({_id:id},callback);
  },
  updateLevel:function(id,updateData,callback){
    LevelsCollection.update({_id:id},{$set:updateData},callback);
  }
};
module.exports=Levels;
