var UserModel=require('../../system/models/Users').Users;
var UserCollection=require('../../system/models/Users/UsersCollection.js');
var TransactionModel=require('../../system/models/TransactionMaster');
var TransactionCollection=require('../../system/models/TransactionMaster/TransactionMasterCollection.js');
var useractions=[];
var userObj={};
var actionFn=function(orgId,obj){
//    console.log('hello')
    var allData=obj[0].data;
    var headers=allData[0];
    if(!headers[4])return;
    var actions=[];
    allData.forEach(function(data,index){
        if(index!==0){
            var actionObj={};
            data.forEach(function(fieldData,indexNew){
//                if(indexNew==4)
//                    RolesModel.getRolesFromQuery({name:fieldData},"","","",function(err,role){
//                        // userObj[headers[indexNew]]=[role._id];
//                        if(err) console.log(err);
//                        UserCollection.update({email:userObj.email,name:userObj.name},{$set:{roles:[role[0]._id]}},function(err,ans){
//                            if(err) console.log(err);
//                            else console.log("setted roles");
//                        });
//                    });
//                else userObj[headers[indexNew]]=fieldData;
            });
            actions.push(actionObj);
            TransactionModel.createTransactionMaster(orgId,actionObj,function(err){
                if(err)
                    console.log("err creating user from excel"+err);
                else console.log("created Actions from excel"+index);
            });
        }
    });
};
var userTags={
    'get /org/:orgId/users/:userId/actions':function(req,res){
        UserCollection.findOne({_id: req.params.userId },function(err, action) {
                console.log(action.transactions);
//            console.log(action.transactions.length)

                var option_html;
//                action.forEach(function(actiondata){
//                    console.log("User Name :"+actiondata);
////                    res.send(actiondata.transactions);
//                });

            for (var i=0;i<=action.transactions.length;i++){

                var array={};

                var userObj={};
                var transaction=action.transactions[i].transactionMaster;
                TransactionCollection.findOne({_id: transaction },function(err, actions) {
                    userObj={name:actions.name};
                    useractions.push(userObj);
//                    useractions[i]=actions.name;

                    array=userObj;
//                    console.log(array);
//                    console.log(userObj);
//                    res.send(useractions);

                });
                console.log(array);
                console.log(userObj);
//                console.log("Data"+userObj);
                useractions.push(userObj);
//                 console.log(useractions)
//                 console.log(useractions)
//                 console.log(userObj)
//                res.send(useractions);
            }
//            res.send(action.transactions);
            });
    },
    'get /org/:orgId/transactions':function(req,res){
        TransactionCollection.find({}, function(err, data) {
            console.log(data);
            res.send(data);
        });
    },
    'get /org/:orgId/transactions/:transactionId':function(req,res){
        TransactionCollection.findOne({_id: req.params.transactionId },function(err, data) {
          console.log(data);
            res.send(data);
        });
    },


    'get /org/:orgId/users/:userId/downlineactions':function(req,res){
        UserCollection.findOne({reportsTo: req.params.userId }) .populate('reportsTo') .exec(function (err, downlineactions) {
                if (err) return handleError(err);
                var actions=downlineactions.reportsTo;
                console.log(actions.name);
                res.send(actions);
            })
    },
    'get /org/:orgId/users/:userId/downlinepoints':function(req,res){
        UserCollection.findOne({reportsTo: req.params.userId }) .populate('reportsTo') .exec(function (err, downlinepoints) {
            if (err) return handleError(err);
            var actions=downlinepoints.reportsTo;
            console.log(actions.totalPoints);
            res.send(actions);
        })
    },
    'get /org/:orgId/transactions/:transactionId/users':function(req,res){
        UserCollection.findOne({roles: req.params.transactionId }) .populate('transactions') .exec(function (err, users) {
            if (err) return handleError(err);
            var actions=users.transactions;
            console.log(actions.name);
            res.send(actions.name);
        })
    },
    'get /org/:orgId/users/:userId/uplinkuser':function(req,res){
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
    'get /org/:orgId/users/:userId/downlinkuser':function(req,res){
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
var uploadAction={
    'post /org/:orgId/excel/action/new':function(req,res,next){
        var xlsx = require('node-xlsx');
        var obj = xlsx.parse(req.files.actions.path); // parses a file
        actionFn(req.params.orgId,obj);
        res.send(obj);
    },
    'post /org/:orgId/excel/user/edit':function(req,res,next){
        var xlsx = require('node-xlsx');
        var obj = xlsx.parse(req.files.actions.path); // parses a file
        actionEditFn(req.params.orgId,obj);
        res.send(obj);
    }
}
var routes_data=[userTags,uploadAction];
module.exports={
    initialize:function(server,handlers){
        routes_data.forEach(function(routesObj){
            for(var property in routesObj) {
                methods=property.split(" ");
                if(handlers)
                    eval("server."+methods[0]+"('"+methods[1]+"',"+handlers+","+routesObj[property]+');');
                else
                    eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
            }
        });
        console.log("Test1 Routes initialized");
    }
};