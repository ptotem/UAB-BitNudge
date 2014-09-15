
//End Points for roles in  UserResourcesRoutes:
var userModel=equire('../../system/controllers/UserController.js');
var roleModel=require('../../system/controllers/RoleController.js');
var roleModelRoutes={
    'get org/:orgId/user/:userId':function(req,res) {
        roleModel.getRoleofUser(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /user/:userId/role/:roleId':function(req,res){
        roleModel.assignRole(req.query);
    }
}

// End Points for Transactions in UserResourcesRoutes:

var transactionModel=require('../../system/controllers/TransactionController.js');
var transactionModelRoutes={
    'get org/:orgId/user/:userId/transactions':function(req,res) {
        transactionModel.getTransactionofUser(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /user/:userId/transactions/':function(req,res){
        transactionModel.createTransaction(req,res,callback);
    },
    'del org/:orgId/users/:userId/transaction/:transactionId':function(req,res){
        roleModel.deleteTransactionOfUser(req,res,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }

}

//End Points for StoreItems in UserResourcesRoutes:

var storesItemModel=require('../../system/controllers/StoreController.js');
var storeItemModelRoutes={
    'get org/:orgId/user/:userId/transactions':function(req,res) {
        transactionModel.getstoreItemofUser(req,res),function(err,obj){
            console.log(err+obj);
        }
    }
//    'post/org/:orgId /user/:userId/transactions/':function(req,res){
//        transactionModel.createTransaction(req,res,callback);
//    }

}

//End Points for Teams in UserResourcesRoutes:

var teamModel=require('../../system/controllers/StoreController.js');
var teamModelRoutes={
    'get org/:orgId/user/:userId/transactions':function(req,res) {
        transactionModel.getUserTeam(req,res),function(err,obj){
            console.log(err+obj);
        }
    }
}

//End Points for Statuses:

//End Points for Rank:
var RankModelRoutes={
    'get org/:orgId/user/:userId/rank':function(req,res) {
        userModel.getUserRank(req,res),function(err,obj){
            console.log(err+obj);
        }
    }
}

//End Points for Level:
var levelModelRoutes={
    'get org/:orgId/user/:userId/rank':function(req,res) {
        userModel.getUserRank(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /user/:userId/rank/':function(req,res){
        transactionModel.setUserRank(req,res,callback);
    }
}

//End Points for Medals in UserResourcesRoutes:
var medalModelRoutes={

    'get org/:orgId/user/:userId/medal':function(req,res) {
        userModel.getUserMedal(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /user/:userId/medal/':function(req,res){
        transactionModel.setUserMedal(req,res,callback);
    }
}

//End Points for Clients:

var levelModelRoutes={
    'get org/:orgId/user/:userId/rank':function(req,res) {
        userModel.getUserRank(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /user/:userId/rank/':function(req,res){
        transactionModel.setUserRank(req,res,callback);
    }
}

//End Points For Products:

//End Points for Revenues:


//End Points For Trainings:

//End Points For Goals:

//End Points For SocialFeed:

//End Points For NudgeChat:


//End Points For NudgeMailbox:


//End Points For NudgeMails
