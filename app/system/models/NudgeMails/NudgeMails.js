var NudgeMailsCollection=require('./ClientsCollection.js');

var NudgeMail= {
    getNudgeMailDetail:function(client,fieldName){
        NudgeMailsCollection.find(({'_id' :client}).fieldName,callback);
    },

    getNudgeMailSchema:function(){
        return NudgeMailsCollection.Schema;
    },
    createNudgeMail:function(data){
        var mail=new NudgeMailsCollection(data);
        mail.createdAt=new Date();
        mail.save();
        return true;
    },
    deleteNudgeMail:function(id,callback){
        NudgeMailsCollection.remove({'_id':id},callback);
    },
    getNudgeMail:function(id,callback){
        NudgeMailsCollection.findOne({'_id':id},callback);
    },
    getNudgeMailByOrgId:function(orgid,callback){
        NudgeMailsCollection.find(({organizationId :orgid}),callback);
    },
    updateNudgeMail:function(id,fieldName,value,callback){
        var temp={};
        temp[fieldName]=value;
        NudgeMailsCollection.update({_id:id},{$set:temp},callback);
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