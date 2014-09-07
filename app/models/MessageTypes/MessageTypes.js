var MessageTypesCollection=require('./MessageTypesCollection.js');
var MessageTypes={
  initialize:function(server){
    console.log("medals initialized");
  },
  createMessageType:function(organizationId,data){
    data.organizationId=organizationId;
    var l=new MessageTypesCollection(data);
    l.save();
    return true;
  },
  getMessageType:function(id,callback){
    MessageTypesCollection.findOne({_id:id},callback);
  },
  getMessageTypeByName(name,callback){
    MessageTypesCollection.findOne({name:name},callback);
  },
  getMessageTypesOfOrganization:function(orgId,callback){
    MessageTypesCollection.find({organizationId:orgId},callback);
  },
  getMessageTypePoints:function(id,callback){
    MessageTypesCollection.findOne({_id:id},function(err,obj){
      if(err) return callback(null);
      callback(obj.points);
    });
  },
  getMessageTypeSchema:function(){
    return MessageTypesCollection.Schema;
  },
  deleteMessageType:function(id,callback){
    MessageTypesCollection.remove({_id:id},callback);
  },
  updateMessageType:function(id,fieldName,value,callback){
    var temp={};
    temp[fieldName]=value;
    MessageTypesCollection.update({_id:id},{$set:temp},callback);
  }
};
module.exports=MessageTypes;
