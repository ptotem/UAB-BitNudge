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
//                        else console.log("transaction._id");
                    });
                });
            });
        }
    });
};
var userTags={
    'get /org/:orgId/transactions/:transactionId/name':function(req,res){
        TransactionCollection.findOne({_id: req.params.transactionId },function(err, data) {
            res.send(data.name);
        });
    },
    'get /org/:orgId/transactions/:transactionId':function(req,res){
        TransactionCollection.findOne({_id: req.params.transactionId },function(err, data) {
            res.send(data);
        });
    },
    'get /org/:orgId/goals/:goalId/goaldata':function(req,res){
        GoalCollection.findOne({_id:req.params.goalId},function(err, goal) {
            res.send(goal);


        });
    },
    'get /org/:orgId/goals/:goalId':function(req,res){
        GoalCollection.findOne({_id:req.params.goalId},function(err, goal) {
            res.send(goal.name);


        });
    },
    'get /org/:orgId/transaction/:transactionId/users':function(req,res){
//        { $match: {tracks: {$elemMatch: {'language': 'en'}} } },
        UserCollection.find({ transactions :{ $elemMatch: { transactionMaster: req.params.transactionId } } },function(err, data) {
            res.send(data);
        });
    }

};


var uploadAction={
    'post /org/:orgId/excel/action/new':function(req,res,next){
        var xlsx = require('node-xlsx');
        var obj = xlsx.parse(req.files.actions.path); // parses a file
        actionFn(req.params.orgId,obj);
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
