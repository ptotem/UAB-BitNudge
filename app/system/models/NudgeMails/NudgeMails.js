var NudgeMailsCollection=require('./NudgeMailsCollection.js');
var mongoose=require('mongoose');
var NudgeMail= {
    getNudgeMailDetail:function(client,fieldName){
        NudgeMailsCollection.find(({'_id' :client}).fieldName,callback);
    },
    getNudgeMailSchema:function(){
        return NudgeMailsCollection.Schema;
    },
    createNudgeMail:function(orgId,data,callback){
        var mail=new NudgeMailsCollection(data);
        mail.orgId=mongoose.Types.ObjectId(orgId);
        mail.createdAt=new Date();
        mail.save(callback);
    },
    deleteNudgeMail:function(id,callback){
        NudgeMailsCollection.remove({'_id':id},callback);
    },
    getNudgeMail:function(id,fields,options,populationData,callback){
        NudgeMailsCollection.findOne({'_id':id},fields,options).populate(populationData).exec(callback);
    },
    getNudgeMailByOrgId:function(orgid,fields,options,populationData,callback){
        NudgeMailsCollection.find(({orgid :orgid}),fields,options).populate(populationData).exec(callback);
    },
    updateNudgeMail:function(id,updateData,callback){
        NudgeMailsCollection.update({_id:id},{$set:updateData},callback);
    },
    addReceiverNudgeMail :function(id,receiverId,calback){
        NudgeMailsCollection.update({'_id':id},{$push:{
            receivers:receiverId
        }});
    },
    deleteReceiverNudgeMail :function(id,receiverId,calback){
      NudgeMailsCollection.update({'_id':id},{$pull:{
        receivers:receiverId
      }});
    }
};
module.exports=NudgeMail;
