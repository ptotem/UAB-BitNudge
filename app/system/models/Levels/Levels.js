var LevelsCollection=require('./LevelsCollection.js');
var mongoose = require('mongoose');
var Levels={
  createLevel:function(orgId,data){
      data.createdAt=new Date();
      data.orgId=mongoose.Types.ObjectId(orgId);
      var l=new LevelsCollection(data);
      l.save();
      return true;
  },
  getLevel:function(id,fields,options,populationData,callback){
    LevelsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
  },
  getLevelsOfOrganization:function(orgId,fields,options,populationData,callback){
    LevelsCollection.find({orgId:orgId},fields,options).populate(populationData).exec(callback);
  },
  getLevelSchema:function(){
    return LevelsCollection.Schema;
  },
  deleteLevel:function(id,callback){
    LevelsCollection.remove({_id:id},callback);
  },
  updateLevel:function(id,updateData,callback){
    LevelsCollection.update({_id:id},{$set:updateData},callback);
  },
  validateRanges:function(rangeMin,rangeMax){
    //put some validation effects. The ranges must not intersect.
    return true;
  }
};
module.exports=Levels;
