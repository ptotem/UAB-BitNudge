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
//        console.log(data[6]);
        if(index!==0) {
            var actionObj = {};

        }
//        if(indexNew==4)
        UserCollection.findOne({email:data[6]},function(err, user) {
//            console.log(user._id);
            data.forEach(function(fieldData,indexNew) {

                actions.push(actionObj[headers[indexNew]]=fieldData);
                console.log("actions"+actions);
                UserCollection.update({_id: user._id}, {$push: {trialTransaction:actions}}, function (err, ans) {
//
                });
            });

        });

    });
};
var userTags={
    'get /org/:orgId/users/:userId/actions':function(req,res){

        UserCollection.findOne({_id: req.params.userId },function(err, action) {
                console.log(action.transactions);
//            console.log(action.transactions.length)

                var option_html;
            for (var i=0;i<=action.transactions.length;i++){

                var array={};
                var userObj={};
                var transaction=action.transactions[i].transactionMaster;
                TransactionCollection.findOne({_id: transaction },function(err, actions) {
                    userObj={name:actions.name};
                    useractions.push(userObj);
//                    useractions[i]=actions.name;
                      array=userObj;

                });
//                console.log(array);
//                console.log(userObj);
                useractions.push(userObj);
            }
            res.send(action.transactions);
            });

        UserCollection
            .findOne({_id: req.params.userId })
            .populate('transactions') .exec(function (err, actions) {
                if (err) return handleError(err);
                console.log( actions.transactions.name);
                // prints "The creator is Aaron"
            })
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
    'get /org/:orgId/user/:userId/goals':function(req,res){
        UserCollection.findOne({_id: req.params.userId },function(err, data) {
//            if(data){
//                data.forEach(function(users){
//                    console.log("User Name :"+users.name+"Points :"+users.totalPoints)
//                });
//            }
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
//updateUser:function(req,res){
//    UsersModel.updateUser(req.params.userId,req.body,function(err,obj){
//        if(err) res.send("fail");
//        else
//            res.send("success");
//    });
//},
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