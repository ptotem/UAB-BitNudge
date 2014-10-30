var UserModel=require('../../system/models/Users').Users;
var UserCollection=require('../../system/models/Users/UsersCollection.js');
var RolesModel=require('../../system/models/Roles');
var userFn=function(orgId,obj){
    var allData=obj[0].data;
    var headers=allData[0];
    if(!headers[5])return;
    var users=[];
    allData.forEach(function(data,index){
        if(index!==0){
            var userObj={};
            data.forEach(function(fieldData,indexNew){
                if(indexNew==5)
                    RolesModel.getRolesFromQuery({name:fieldData},"","","",function(err,role){
                        // userObj[headers[indexNew]]=[role._id];
                        if(err) console.log(err);
                        UserCollection.update({email:userObj.email,name:userObj.name},{$set:{roles:[role[0]._id]}},function(err,ans){
                            if(err) console.log(err);
                            else console.log("setted roles");
                        });
                    });
                else userObj[headers[indexNew]]=fieldData;
            });
            // users.push(userObj);
            UserModel.createUser(orgId,userObj,function(err){
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
    if(!headers[5])return;
    var users=[];
    allData.forEach(function(data,index){
        if(index!==0){
            var userObj={};
            data.forEach(function(fieldData,indexNew){
                if(indexNew==5)
                    RolesModel.getRolesFromQuery({name:fieldData},"","","",function(err,role){
                        if(err) console.log(err);
                        UserCollection.update({email:userObj.email,name:userObj.name},{$set:{roles:[role[0]._id]}},function(err,ans){
                            if(err) console.log(err);
                            else console.log("setted roles");
                        });
                        // userObj[headers[indexNew]]=[role._id];
                    });
                else userObj[headers[indexNew]]=fieldData;
            });
            // users.push(userObj);
            UserCollection.find({name:userObj.name},function(err,userQuery){
                UserModel.updateUser(userQuery._id,userObj,function(err){
                    if(err)
                        console.log("err creating user from excel"+err);
                    else console.log("created User from excel"+index);
                });
            });
        }
    });
};
//this is a temp model cuz this is dummy data. Ideally, this should be the capability model,
//but that is not being used this test cuz shit can go down.
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var roleSchema=new Schema({
    name:String,
    role:{type:Schema.Types.ObjectId,ref:'roles'},
    abilities:[{type:Schema.Types.ObjectId,ref:'abilities'}],
    // createdAt:Date
});
var RoleAbilitiesCollection=mongoose.model('roleAbilities',roleSchema);








var userAuthentication={
    'post /org/:orgId/excel/user/new':function(req,res,next){
        var xlsx = require('node-xlsx');
        var obj = xlsx.parse(req.files.users.path); // parses a file
        userFn(req.params.orgId,obj);
        res.send(obj);
    },
    'post /org/:orgId/excel/user/edit':function(req,res,next){
        var xlsx = require('node-xlsx');
        var obj = xlsx.parse(req.files.users.path); // parses a file
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
    'get /org/:orgId/users/:userId/abilities/:abilityId':function(req,res){
        UserModel.getUser(req.params.userId,"","","",function(err,user){
            RoleAbilitiesCollection.find({role:user.roles[0],abilities:req.params.abilityId}).populate({path:"abilities",model:"abilities"}).exec(function(err,result){
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
            RoleAbilitiesCollection.find({role:user.roles[0]}).populate({path:"abilities",model:"abilities"}).exec(function(err,result){
                if(err) res.send(err);
                else res.send(result[0].abilities);
            });
        });
    },
    'get /org/:orgId/abilities/:abilityId/users':function(req,res){
        RoleAbilitiesCollection.find({abilities:req.params.abilityId},function(err,roleAbilites){
            roleAbilites.forEach(function(raObj){
                var role=raObj.role;
                UserCollection.find({roles:role},function(err1,user){
                    if(err1) res.send(err1);
                    else res.send(user);
                });
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
                if(user.reportsTo){
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
                if(user.reportsTo){
                    recur(user._id);
                }
                else res.send(users);
            });
        };
        recur(req.params.userId);
    }
};
var OrgTagsCollection=require('../../system/models/OrgTags/OrgTags.js');
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
        UserCollection.find({orgtags:req.query.orgtags},function(err,tags){
            if(err) res.send(err);
            else res.send(tags);
        });
    }
};
var stuff=[userAuthentication,userAuthorization,organizationStructure,organizationTags];
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