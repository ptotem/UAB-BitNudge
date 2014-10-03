var TrainingsCollection=require('./TrainingsCollection.js');
var mongoose=require('mongoose');
var Training= {

//    getTrainingDetail:function(_id,fields,options,populationData,callback){
//        TrainingsCollection.find(({'_id' :_id}),fields,options).populate(populationData).exec(callback);
//    },

    getTrainingSchema:function(){
        return TrainingsCollection.Schema;
    },
    createTraining:function(orgId,data){
        var training=new TrainningsCollection(data);
        training.orgId=mongoose.Types.ObjectId(orgId);
        training.createdAt=new Date();
        training.save();
        return true;
    },
    deleteTraining:function(id,callback){
        TrainingsCollection.remove({'_id':id},callback);
    },
    getTraining:function(id,fields,options,populationData,callback){
        TrainingsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getTrainingOfOrganization:function(orgid,callback){
        TrainingsCollection.find(({orgId :orgid}),callback);
    },
    updateTraining:function(id,updateData,callback){
        TrainingsCollection.update({_id:id},{$set:updateData},callback);
    }
    // assignTrainingToUser:function(trainingId,userdata){
    //     TrainingsCollection.update({_id:trainingId},{$push:{user:userdata}});
    // }
};
module.exports=Training;
