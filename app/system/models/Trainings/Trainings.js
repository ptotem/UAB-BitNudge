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
    getTrainingByOrgId:function(orgid,callback){
        TrainingsCollection.find(({organizationId :orgid}),callback);
    },
    updateTraining:function(id,updateDate,callback){
        TrainingsCollection.update({_id:id},{$set:updateData},callback);
    }

}
module.exports=Training;


//Assign Training to Teams and Organizations