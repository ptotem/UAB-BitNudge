var UserModel=require('../../system/models/Users').Users;
var UserCollection=require('../../system/models/Users/UsersCollection.js');
var TransactionCollection=require('../../system/models/TransactionMaster/TransactionMasterCollection.js');
var RolesModel=require('../../system/models/Roles');
var GoalMasterModel=require('../../system/models/GoalMaster');
var GoalMasterCollection=require('../../system/models/GoalMaster/GoalMasterCollection.js');
var GoalCollection=require('../../system/models/GoalMaster/GoalMasterCollection.js');
var UserGoalsModel=require('../../system/models/Users').Goals;
var UsersCollection=require('../../system/models/Users/UsersCollection.js');
var async=require('async');
var userFn=function(orgId,obj){
    var roleColumnNumber=4;
    var allData=obj[0].data;
    var headers=allData[0];
    if(!headers[roleColumnNumber])return;
    var users=[];
    allData.forEach(function(data,index){
        if(index!==0){
            var userObj={};
            data.forEach(function(fieldData,indexNew){
                if(indexNew==roleColumnNumber)
                    RolesModel.getRolesFromQuery({name:fieldData},"","","",function(err,role){
                        // userObj[headers[indexNew]]=[role._id];
                        if(err) console.log(err);
                        UsersCollection.update({email:userObj.email,name:userObj.name},{$set:{role:[role[0]._id]}},function(err,ans){
                            if(err) console.log(err);
                            else console.log("setted roles");
                        });
                    });
                else userObj[headers[indexNew]]=fieldData;
            });
            // users.push(userObj);
            UserModel.createUser(orgId,userObj,function(err,user){
                NudgeMailbox.createNudgeMailbox(req.params.orgId,user._id,{},function(){});
                NudgeChat.createNudgeChat(req.params.orgId,user._id,{},function(){});
                NotificationCenterModel.createNotificationCenter(req.params.orgId,user._id,{},function(){});
                UserPeriodPointsModel.createUserPeriodPoints(req.params.orgId,user._id,{},function(){});
                if(err)
                    console.log("err creating user from excel"+err);
                else console.log("created User from excel"+index);
            });
        }
    });
};
var userEditFn=function(orgId,obj){
    var allData=obj[0].data;
    var headers=allData[0];
    var roleColumnNumber=4;
    if(!headers[roleColumnNumber])return;
    var users=[];
    allData.forEach(function(data,index){
        if(index!==0){
            var userObj={};
            data.forEach(function(fieldData,indexNew){
                if(indexNew==roleColumnNumber)
                    RolesModel.getRolesFromQuery({name:fieldData},"","","",function(err,role){
                        if(err) console.log(err);
                        UsersCollection.update({email:userObj.email,name:userObj.name},{$set:{role:role[0]._id}},function(err,ans){
                            if(err) console.log(err);
                            else console.log("setted roles");
                        });
                        // userObj[headers[indexNew]]=[role._id];
                    });
                else userObj[headers[indexNew]]=fieldData;
            });
            // users.push(userObj);
            UsersCollection.findOne({email:userObj.email},function(err,userQuery){
                UserModel.updateUser(userQuery._id,userObj,function(err){
                    if(err)
                        console.log("err editing user from excel"+err);
                    else console.log("editing User from excel"+index);
                });
            });
        }
    });
};
var userGoalFn=function(orgId,creator,obj,lastCallback){
    var allData=obj[0].data;
    var headers=allData.shift();
    async.eachSeries(allData,function(row,callback){
      var goalObj={goalType:"goal",creator:creator,createdAt:new Date()};
      goalObj[headers[0]]=row[0];
      goalObj[headers[1]]=row[1];
      goalObj[headers[5]]=new Date(row[5]);
      goalObj[headers[6]]=new Date(row[6]);
      goalObj[headers[8]]="function(t){return "+row[8]+";}";
      goalObj.action={};
      if(row[1]=="Action"){
        goalObj.action.targetValue=row[4];
        var transactions=row[2].split(",");
        var transactionIds=[];
        async.each(transactions,function(transName,eachCallback){
          TransactionCollection.findOne({name:transName},function(err,obj){
            if(err)
              eachCallback(err);
            else {
              if(obj)
                transactionIds.push(obj._id);
              eachCallback();
            }
          });
        },
        function(err,results){
          goalObj.action.allowedTransactions=transactionIds;
          GoalMasterModel.createGoalMaster(orgId,goalObj,function(err,goalMasterObj){
            if(!err)
              UserGoalsModel.createGoal(creator,goalObj,function(err,obj){
                if(err)console.log(err);
                else console.log("success");
                callback(err);
              });
            else callback(err);
          });
        });
      }
      else if(row[1]=="Subgoal"){
        var subgoalObjs=[];
        async.each(row[2].split(","),function(subgoalName,eachCallback){
          GoalMasterCollection.findOne({name:subgoalName},function(err,subgoalMasterObj){
            if(err)eachCallback(err);
            var temp={};
            temp.allowedTransactions=subgoalMasterObj.action.allowedTransactions;
            temp.subgoal=subgoalMasterObj._id;
            temp.targetValue=row[4];
            subgoalObjs.push(temp);
            eachCallback();
          });
        },
        function(err,results){
          goalObj.subgoals=subgoalObjs;
          UsersCollection.findOne({email:row[7]},function(err,user){
            if(!user)eachCallback(err);
            UserGoalsModel.createGoal(user._id,goalObj,function(err,obj){
              if(err)console.log(err);
              else console.log(obj);
              callback(err);
            });
          });
        });
      }
    },
    function(err,results){
      if(err) lastCallback(err);
      else lastCallback("done with bulk upload goals");
    });
};

//this is a temp model cuz this is dummy data. Ideally, this should be the capability model,
//but that is not being used this test cuz shit can go down.
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var roleSchema=new Schema({
    name:String,
    role:{type:Schema.Types.ObjectId,ref:'roles'},
    abilities:[{type:Schema.Types.ObjectId,ref:'abilities'}]
    // createdAt:Date
});
var RoleAbilitiesCollection=mongoose.model('roleAbilities',roleSchema);


var userAuthentication={
    'post /org/:orgId/excel/user/new':function(req,res,next){
        console.log(req.files.file.path)
//        res.send(req)
        var xlsx = require('node-xlsx');
        var obj = xlsx.parse(req.files.file.path); // parses a file
        userFn(req.params.orgId,obj);
        res.send(obj);
    },
    'post /org/:orgId/excel/user/edit':function(req,res,next){
        var xlsx = require('node-xlsx');
        var obj = xlsx.parse(req.files.file.path); // parses a file
        userEditFn(req.params.orgId,obj);
        res.send(obj);
    }
};
var AbilitiesCollection=require('../../system/models/Abilities/Abilities.js');
var userAuthorization={
    'get /abilities':function(req,res,next){
        AbilitiesCollection.find({},function(err,abs){
            res.send(abs);
        });
    },
    'post /org/:orgId/roles/:roleId/abilities':function(req,res){
        if(!req.body.abilities)
            res.send("Please set the body parameters abilities as an array");
        else RoleAbilitiesCollection.update({role:req.params.roleId},{$set:{abilities:req.body.abilities}},{upsert:true},function(err,result){
            if(err) res.send(err);
            else res.send("success");
        });
    },
    'get /org/:orgId/roles/:roleId/abilities':function(req,res){
        // UserModel.getUser(req.params.userId,"","","",function(err,user){
        RoleAbilitiesCollection.findOne({role:mongoose.Types.ObjectId(req.params.roleId)}).populate({path:'abilities',model:'abilities'}).exec(function(err,result){
            if(err) res.send(err);
            else{
                if(result)
                    res.send(result.abilities);
            }
        });
        // });
    },
    'get /org/:orgId/users/:userId/abilities/:abilityId':function(req,res){
        UserModel.getUser(req.params.userId,"","","",function(err,user){
            RoleAbilitiesCollection.find({role:user.role,abilities:req.params.abilityId}).populate({path:"abilities",model:"abilities"}).exec(function(err,result){
                if(err) res.send(err);
                else {
                    if(result[0])
                        res.send("yes");
                    else res.send("no");
                    // res.send(result[0]);
                }
            });
        });
    },
    'get /org/:orgId/users/:userId/abilities':function(req,res){
        UserModel.getUser(req.params.userId,"","","",function(err,user){
            RoleAbilitiesCollection.find({role:user.role}).populate({path:"abilities",model:"abilities"}).exec(function(err,result){
                if(err) res.send(err);
                else{
                    if(result[0])
                        res.send(result[0].abilities);
                }
            });
        });
    },
    'get /org/:orgId/abilities/:abilityId/users':function(req,res){
        var roles=[];
        RoleAbilitiesCollection.find({abilities:req.params.abilityId},function(err,roleAbilites){
            roleAbilites.forEach(function(raObj){
                roles.push(raObj.role);
                // UserCollection.find({roles:{$in:`roleAbilites},function(err1,user){
                //     if(err1) res.send(err1);
                //     else res.send(user);
                // });
            });
            UserCollection.find({role:{$in:roles}},function(err1,user){
                if(err1) res.send(err1);

                else res.send(user);
            });
        });
    }
};
var UserCollection=require('../../system/models/Users/UsersCollection.js');
var organizationStructure={
    'post /org/:orgId/users/:userId/reportsto':function(req,res){
        var reporter=req.body.reportsTo;
        if(!reporter)
            res.send("please set the reportsTo field of body as the id of the manager");
        else UserCollection.update({_id:req.params.userId},{$set:{reportsTo:reporter}},function(err,obj){
            if(err) res.send(err);
            else res.send("success");
        });
    },
    'get /org/:orgId/users/:userId/uplink':function(req,res){
        var users=[];
        var recur=function(userId){
            UserModel.getUser(userId,"","","",function(err,user){
                if(err) res.send(err);
                users.push(user);
                if(user&&user.reportsTo){
                    recur(user.reportsTo);
                }
                else res.send(users);
            });
        };
        recur(req.params.userId);
    },
    'get /org/:orgId/users/:userId/downlink':function(req,res){
        var users=[];
        UserModel.getUser(req.params.userId,"","","",function(err,user1){
            users.push(user1);
        });
        var recur=function(userId){
            UserCollection.findOne({reportsTo:userId},function(err,user){
                if(err) res.send(err);
                if(!user) res.send(users);
                users.push(user);
                if(user&&user.reportsTo){
                    recur(user._id);
                }
                else res.send(users);
            });
        };
        recur(req.params.userId);
    }
};
var OrgTagsCollection=require('../../system/models/OrgTags/OrgTagsCollection.js');
var organizationTags={
    'get /orgtags':function(req,res){
        OrgTagsCollection.find({},function(err,tags){
            if(err) res.send(err);
            else res.send(tags);
        });
    },
    'post /org/:orgId/users/:userId/orgtags':function(req,res){
        var orgtags=req.body.orgtags;
        if(!orgtags||!orgtags instanceof Array)
            res.send("please set the orgtags field of body as the id of the manager. It must be an array");
        else UserCollection.update({_id:req.params.userId},{$set:{orgtags:orgtags}},function(err,obj){
            if(err) res.send(err);
            else res.send("success");
        });
    },
    'get /org/:orgId/tags/users':function(req,res){
        if(!req.query.orgtags)
            res.send("Please set orgtags in query as an Array of tags you are searching");
        UserCollection.find({orgtags:{$in:JSON.parse(req.query.orgtags)}},function(err,tags){
            if(err) res.send(err);
            else res.send(tags);
        });
    }
};

//bulk goal creation
var usersGoals={
    'post /org/:orgId/users/:userId/excel/goals/new':function(req,res,next){
        var xlsx = require('node-xlsx');
//        console.log(req.files)
        //var obj = xlsx.parse(req.files.users.path); // parses a file
        var obj = xlsx.parse(req.files.file.path); // parses a file
        userGoalFn(req.params.orgId,req.params.userId,obj,function(tem){res.send(tem)});
    }
};

var stuff=[userAuthentication,userAuthorization,organizationStructure,organizationTags, usersGoals];
module.exports={
    initialize:function(server,handlers){
        stuff.forEach(function(routesObj){
            for(var property in routesObj) {
                methods=property.split(" ");
                if(handlers)
                    eval("server."+methods[0]+"('"+methods[1]+"',"+handlers+","+routesObj[property]+');');
                else
                    eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
            }
        });
        console.log("Test Routes initialized");
    }
};
