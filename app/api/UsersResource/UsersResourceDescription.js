var AuthorizationController=require('../../system/controllers/AuthorizationController.js');
// var restifyValidator = require('restify-validator2');
var Stuff={
  Users:{
    read:{
      swagger:{
        summary: 'Get a particular User',
        notes: 'Get a particular User\'s information',
        nickname: 'getUserById'
      },
      validation:function(req,res,next){
        console.log("here");
        req.check(req.query,"test");
        // return next();
      }
    }
  }
};
module.exports={
  authorizeAndValidate:function(model,method,req,res,next){
    // return [AuthorizationController.isAuthorized(model,method,req,res,next),Stuff[model][method].swagger,Stuff[model][method].validation];
    // AuthorizationController.isAuthorized(model,method,req,res,function(){
    console.log("sdf");
    // console.log(Stuff[model][method].validation);
    Stuff[model][method].validation(req,res,next);
    // });// ,Stuff[model][method].validation;
  }
};
