var UserModel=require('../../system/models/Users');
var UserCollection=require('../../system/models/Users/UsersCollection.js');
var RolesModel=require('../../system/models/Roles');
var userFn=function(orgId,obj){
    var allData=obj[0].data;
    var headers=allData[0];
    // if(!headers[5])return;
    var users=[];
    allData.forEach(function(data,index){
        if(index!==0){
            var userObj={};
            data.forEach(function(fieldData,indexNew){
                /*if(indexNew==5)
                    RolesModel.getRolesFromQuery({name:fieldData},"","","",function(err,role){
                        userObj[headers[indexNew]]=[role._id];
                    });
                else*/ userObj[headers[indexNew]]=fieldData;
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
    // if(!headers[5])return;
    var users=[];
    allData.forEach(function(data,index){
        if(index!==0){
            var userObj={};
            data.forEach(function(fieldData,indexNew){
                /*if(indexNew==5)
                    RolesModel.getRolesFromQuery({name:fieldData},"","","",function(err,role){
                        userObj[headers[indexNew]]=[role._id];
                    });
                else*/ userObj[headers[indexNew]]=fieldData;
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
    }
};
var UserCollection=require('../../system/models/Users/UsersCollection.js');
var organizationStructure={
    'post /org/:orgId/users/:userId/reportsTo':function(req,res){
        var reporter=req.body.reportsTo;
        if(!reporter)
            res.send("please set the reportsTo field of body as the id of the manager");
        else UserCollection.update({_id:req.params.userId},{$set:{reportsTo:reporter}});
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
        else UserCollection.update({_id:req.params.userId},{$set:{orgtags:orgtags}});
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
