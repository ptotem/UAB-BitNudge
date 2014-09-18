var TrainingsCollection=require('./TrainingsCollection.js');

var Training= {
    getTrainingDetail:function(_id,fieldName){
        TrainingsCollection.find(({'_id' :_id}).fieldName,callback);
    },
    getTrainingSchema:function(){
        return TrainingsCollection.Schema;
    },
    createTraining:function(data){
        var training=new TrainningsCollection(data);
        training.created_at=new Date();
        training.save();
        return true;
    },
    deleteTraining:function(id,callback){
        TrainingsCollection.remove({'_id':id},callback);
    },
    getTraining:function(id,callback){
        TrainingsCollection.findOne({_id:id},callback);
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
