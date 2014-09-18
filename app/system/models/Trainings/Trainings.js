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
    getTrainingByOrgId:function(orgId,fields,options,populationData,callback){
        TrainingsCollection.find(({orgId :orgId}),fields,options).populate(populationData).exec(callback);
    },
    updateTraining:function(id,updateDate,callback){
        TrainingsCollection.update({_id:id},{$set:updateData},callback);
    }

}
module.exports=Training;


//Assign Training to Teams and Organizations