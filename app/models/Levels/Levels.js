var LevelsCollection=require('./LevelsCollection.js');
var LevelRoutes=require('./LevelRoutes.js');
var Levels={
  initialize:function(server){
    //initializing routes.
    for(property in LevelRoutes)
    {
      methods=property.split(" ");
      eval("server."+methods[0]+"('"+methods[1]+"',"+LevelRoutes[property]+');');
    }
    console.log("Levels initialized");
  },
  createLevel:function(organizationId,rangeMin,rangeMax){
    if(!Levels.validateRanges(rangeMin,rangeMax))
      return false;
    var l=new LevelsCollection({organizationId:organizationId,rangeMin:rangeMin,rangeMax:rangeMax});
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
  updateLevel:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    LevelsCollection.update({_id:id},{$set:temp},callback);
  },
  validateRanges:function(rangeMin,rangeMax){
    //put some validation effects. The ranges must not intersect.
    return true;
  }
};
module.exports=Levels;
