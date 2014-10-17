var TrainingModel=require('../../models/Training');
var TeamModel=require('../../models/Teams');
// var AuthorizationController=('../../controllers/AuthorizationController.js');

var TrainingController={
    getTrainingInOrganization:function(req,res){
        // if(AuthorizationController.IsAuthorized(req.userId,Training,read)) {
            TrainingModel.getTrainingsOfOrg(req.parms.orgId,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    getTraining:function(req,res){
      TrainingModel.getTraining(req.params.storeId,"",{},null,function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    },
    getTrainingsOfTeam:function(req,res){
        // if(AuthorizationController.IsAuthorized(req.userId,Training,read)) {
            TrainingModel.getTrainingsOfTeam(req.params.teamId,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    // addTrainingItemInTraining:function(req,res){
    //     // if(AuthorizationController.IsAuthorized(req.userId,Trainingitem,write)) {
    //         TrainingModel.addItemToTraining(req.params.storeId, req.query.item,function(err,obj){
    //           if(err) res.send(err);
    //           else res.send(obj);
    //         });
    //     // }
    // },
    createTraining:function(req,res){
        // if(AuthorizationController.IsAuthorized(req.userId,Trainingitem,write)) {
            TrainingModel.createTraining(req.params.orgId, req.query,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    addTrainingInTeam:function(req,res) {
        // if (AuthorizationController.IsAuthorized(req.userId, Training, write)) {
            TeamModel.addTrainingsToT54191265d185bc0000884dfbeam(req.params.teamId, req.query.store,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
        // }
    },
    removeTrainingFromTeam:function(req,res){
        TeamModel.removeTrainingsFromTeam(req.params.teamId,req.query.store,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
    },
    removeTrainingFromAllTeams:function(req,res){
        TeamModel.removeTrainingsFromAllTeams(req.query.store,function(err,obj){
              if(err) res.send(err);
              else res.send(obj);
            });
    },
    // removeTrainingFromOrganization:function(req,res){
    //
    // },
    updateTraining:function(req,res){
      TrainingModel.updateTraining(req.params.storeId,function(err,obj){
        if(err) res.send(err);
        else res.send(obj);
      });
    }
};
module.exports=TrainingController;

