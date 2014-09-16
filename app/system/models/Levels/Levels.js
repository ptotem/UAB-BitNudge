var LevelsCollection=require('./LevelsCollection.js');
var Levels={
  createLevel:function(organizationId,data){
//    if(!Levels.validateRanges(data.rangeMin,data.rangeMax))
//      return false;
    data.organizationId=organizationId;
    var l=new LevelsCollection(data);
    l.save();
    return true;
  },
  getLevel:function(id,callback){
    LevelsCollection.findOne({_id:id},callback);
  },
  getLevelsOfOrganization:function(orgId,callback){
    LevelsCollection.find({organizationId:orgId},callback);
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
