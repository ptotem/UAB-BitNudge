var NudgeMailsCollection=require('./NudgeMailsCollection.js');
var mongoose=require('mongoose');
var NudgeMail= {
    initialize: function (server) {
        console.log("NudgeMails initialized");
    },
    getNudgeMailDetail:function(client,fields,options,populationData,callback){
        NudgeMailsCollection.find(({'_id' :client}).fields,options).populate(populationData).exec(callback);
    },

    getNudgeMailSchema:function(){
        return NudgeMailsCollection.Schema;
    },
    createNudgeMail:function(orgId,data){
        var mail=new NudgeMailsCollection(data);
        mail.orgId=mongoose.Types.ObjectId(orgId);
        mail.createdAt=new Date();
        mail.save();
        return true;
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
        }})
    },
    deleteReceiverNudgeMail :function(id,receiverId,calback){
        NudgeMailsCollection.update({'_id':id},{$pull:{
            receivers:receiverId
        }})
    }

}
module.exports=NudgeMail;