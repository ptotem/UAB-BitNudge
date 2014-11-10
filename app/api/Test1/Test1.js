var UserModel=require('../../system/models/Users').Users;
var UserCollection=require('../../system/models/Users/UsersCollection.js');
var GoalCollection=require('../../system/models/GoalMaster/GoalMasterCollection.js');
var TransactionModel=require('../../system/models/TransactionMaster');
var TransactionCollection=require('../../system/models/TransactionMaster/TransactionMasterCollection.js');
var userController=require('../../system/controllers/UsersController.js');
var tempModel=require('../../system/models/Users');
var UserModel=tempModel.Users;
var TransactionsModel=tempModel.Transactions;
var useractions=[];
var userObj={};
var actionFn=function(orgId,obj){
    var allData=obj[0].data;
    var headers=allData[0];
    if(!headers[4])return;
    allData.forEach(function(data,index){
//        console.log(data[6]);
        if(index!==0) {
            var actionObj = {};
            var actionObj1 = {};
            var transactionname=data[0];
            actionObj[headers[0]] = data[0];
            actionObj[headers[1]] = data[1];
            actionObj[headers[2]] = data[2];
            actionObj[headers[3]] = data[3];
            actionObj[headers[4]] = data[4];
            actionObj[headers[5]] = data[5];
            UserCollection.findOne({email: data[6]}, function (err, user) {
                TransactionCollection.findOne({name: data[0]} , function(err,transaction)
                {
                    actionObj1["transactionMaster"] =transaction._id;
                        TransactionsModel.addTransaction(user._id,actionObj1,function(err,obj){
                        if(err)console.log("error"+err)
                        else console.log("transaction._id");
                    });
            });
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
                console.log( actions.transactions);
                // prints "The creator is Aaron"
            })

    },
    'get /org/:orgId/transactions':function(req,res){
        TransactionCollection.find({}, function(err, data) {
            console.log(data);
            res.send(data);
        });
    },
    'get /org/:orgId/transactions/:transactionId/name':function(req,res){
        TransactionCollection.findOne({_id: req.params.transactionId },function(err, data) {
            console.log(data);
            res.send(data.name);
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
    'get /org/:orgId/goals/:goalId':function(req,res){
        GoalCollection.findOne({_id:req.params.goalId},function(err, goal) {
            console.log(goal);
            res.send(goal.name);


        });
    },
    'get /org/:orgId/transaction/:transactionId/users':function(req,res){
        UserCollection.find({},{ transactions :{ $elemMatch: { transactionMaster: req.params.transactionId } } },function(err, data) {
            console.log(data);
            res.send(data);
        });
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