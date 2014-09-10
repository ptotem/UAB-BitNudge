var TrainningsCollection=require('./TrainningsCollection.js');

var Trainning= {
    initialize: function (server) {
        console.log("Trainings initialized");
    },
    getTrainingDetail:function(_id,fieldName){
        TrainningsCollection.find(({'_id' :_id}).fieldName,callback);
    },

    getTrainingSchema:function(){
        return TrainningsCollection.Schema;
    },
    createTraining:function(data){
        var training=new TrainningsCollection(data);
        training.created_at=new Date();
        training.save();
        return true;
    },
    deleteTraining:function(id,callback){
        TrainningsCollection.remove({'_id':id},callback);
    },
    getTraining:function(id,callback){
        TrainningsCollection.findOne({_id:id},callback);
    },
    getTrainingByOrgId:function(orgid,callback){
        TrainningsCollection.find(({organizationId :orgid}),callback);
    },
    updateTraining:function(id,fieldName,value,callback){
        var temp={};
        temp.created_at=new Date();
        temp[fieldName]=value;
        TrainningsCollection.update({_id:id},{$set:temp},callback);
    }

}
module.exports=Trainning;


//Assign Training to Teams and Organizations