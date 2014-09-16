
//End Points for roles in  UserResourcesRoutes:
var userModel=require('../../system/controllers/UsersController.js');
// var roleModel=require('../../system/controllers/RoleController.js');
// var roleModelRoutes={
//     'get org/:orgId/user/:userId':function(req,res) {
//         roleModel.getRoleofUser(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     },
//     'post /org/:orgId /user/:userId/role/:roleId':function(req,res){
//         roleModel.assignRole(req.query);
//     }
// };

// End Points for Transactions in UserResourcesRoutes:

var transactionModel=require('../../system/controllers/TransactionController.js');
var transactionModelRoutes={
    'get org/:orgId/user/:userId/transactions':function(req,res) {
        transactionModel.getTransactionofUser(req,res,function(err,obj){
            console.log(err+obj);
        });
    },
    'post /org/:orgId /user/:userId/transactions/':function(req,res){
        transactionModel.createTransaction(req,res,callback);
    },
    'del org/:orgId/users/:userId/transaction/:transactionId':function(req,res){
        roleModel.deleteTransactionOfUser(req,res,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }
};

//End Points for StoreItems in UserResourcesRoutes:

// var storesItemModel=require('../system/controllers/eCommerceEngine/StoreController.js');
// var storeItemModelRoutes={
//     'get org/:orgId/user/:userId/transactions':function(req,res) {
//         transactionModel.getstoreItemofUser(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     }
// //    'post /org/:orgId /user/:userId/transactions/':function(req,res){
// //        transactionModel.createTransaction(req,res,callback);
// //    }
//
// };

//End Points for Teams in UserResourcesRoutes:

// var teamModel=require('../../system/controllers/StoreController.js');
// var teamModelRoutes={
//     'get org/:orgId/user/:userId/transactions':function(req,res) {
//         transactionModel.getUserTeam(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     }
// };

//End Points for Statuses:

//End Points for Rank:
var RankModelRoutes={
    'get org/:orgId/user/:userId/rank':function(req,res) {
        userModel.getUserRank(req,res,function(err,obj){
            console.log(err+obj);
        });
    }
};

//End Points for Level:
var levelModelRoutes={
    'get org/:orgId/user/:userId/rank':function(req,res) {
        userModel.getUserRank(req,res,function(err,obj){
            console.log(err+obj);
        });
    },
    'post /org/:orgId /user/:userId/rank/':function(req,res){
        transactionModel.setUserRank(req,res);
    }
};

//End Points for Medals in UserResourcesRoutes:
var medalModelRoutes={

    'get org/:orgId/user/:userId/medal':function(req,res) {
        userModel.getUserMedal(req,res,function(err,obj){
            console.log(err+obj);
        });
    },
    'post /org/:orgId /user/:userId/medal/':function(req,res){
        transactionModel.setUserMedal(req,res);
    }
};

//End Points for Clients:
var levelModelRoutes={
    'get org/:orgId/user/:userId/rank':function(req,res) {
        userModel.getUserRank(req,res,function(err,obj){
            console.log(err+obj);
        });
    },
    'post /org/:orgId /user/:userId/rank/':function(req,res){
        transactionModel.setUserRank(req,res);
    }
};

//End Points For Products:
var productModel=require('../../system/controllers/ProductController.js');
var productModelRoutes={
    'get org/:orgId/user/:userId/product':function(req,res) {
        userModel.getUserRank(req,res,function(err,obj){
            console.log(err+obj);
        });
    },
    'post /org/:orgId /user/:userId/rank/':function(req,res){
        transactionModel.setUserRank(req,res,callback);
    }
};


//End Points for Revenues:
var revenueModel=require('../../system/controllers/revenueController.js');
var revenueModelRoutes={
    'get org/:orgId/user/:userId/revenue':function(req,res){
//        revenueModel.getRevenueByOrgId(req.params.orgId,callback);
        revenueModel.getRevenueByOrgId(req,res,function(err,obj){
            console.log(err+obj);
        });
    },
    //    'get org/:orgId/user/:userId/product':function(req,res) {
    //        userModel.getUserRank(req,res),function(err,obj){
    //            console.log(err+obj);
    //        }
    //    },
    'post /org/:orgId /user/:userId/revenue/':function(req,res){
           revenueModel.setRevenue(req.params.userId,req.params.revenue);
        }

};

//End Points For Trainings:
// var trainingModel=require('../../system/controllers/trainingController.js');
// var trainingModelRoutes={
//     'get org/:orgId/user/:userId/training':function(req,res){
//         trainingModel.getTrainingOfUser(req,res,function(err,obj){
//             console.log(err+obj);
//         });
// //        revenueModel.getTrainingOfUser(req.userId,callback);
//     },
// 'post /org/:orgId /user/:userId/training/:trainingId/':function(req,res){
//     trainingModel.assignTrainingToUser(req.params.userId,req.params.trainingId);
// }
//
// };

//End Points For Goals:
var goalModel=require('../../system/controllers/GoalsController.js');
var goalModelRoutes={
    'get org/:orgId/user/:userId/goals':function(req,res){
//        goalModel.getGoalOfUser(req.params.userId,callback);
        goalModel.getGoalOfUser(req,res,function(err,obj){
            console.log(err+obj);
        });

    },
    'post /org/:orgId /user/:userId/training/trainingId/':function(req,res){
        goalModel.assignTrainingToUser(req.params.userId,req.params.trainingId);
    }
};

//End Points For SocialFeed:



//End Points For NudgeChat:

// var nudgeChatModel=require('../../system/controllers/nudgeChatController.js');
// var nudgeChatModelRoutes={
//     'get org/:orgId/user/:userId/nudgeChat':function(req,res){
//         nudgeChatModel.nudgeChatOfUser(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     },
//     'post /org/:orgId /user/:userId/nudgeChat/':function(req,res){
//         nudgeChatModel.assignTrainingToUser(req.params.userId);
//     }
// };
//End Points For NudgeMailbox:

// var nudgeMailBoxModel=require('../../system/controllers/nudgeMailBoxController.js');
// var nudgeMailBoxModelRoutes={
//     'get org/:orgId/user/:userId/mails':function(req,res){
//         nudgeMailBoxModel.getmailboxOfUser(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     }
// };
//End Points For NudgeMails

// var nudgeMailModel=require('../../system/controllers/nudgeMailController.js');
// var nudgeMailModelRoutes={
//     'get org/:orgId/user/:userId/mails/:mailsId':function(req,res){
//         nudgeMailModel.getmailOfUser(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     },
//     'post /org/:orgId /user/:userId/mails/:mailId':function(req,res) {
//         nudgeMailModel.assignTrainingToUser(req,res);
//     },
//     'post /org/:orgId /user/:userId/mails':function(req,res) {
//         nudgeMailModel.assignTrainingToUser(req,res);
//     },
//     'del org/:orgId/:users/:userId/mails/:mailId':function(req,res){
//         nudgeMailModel.removeMail(req,res,function(err,obj){
//             if(err)
//                 res.send(err);
//             else res.send(obj);
//         });
//     }
// };
module.exports=[/* roleModelRoutes */transactionModelRoutes/* ,storeItemModelRoutes *//* ,teamModelRoutes */,RankModelRoutes,levelModelRoutes,medalModelRoutes,productModelRoutes,revenueModelRoutes/* ,trainingModelRoutes */,goalModelRoutes/* ,nudgeChatModelRoutes *//* ,nudgeMailBoxModelRoutes *//* ,nudgeMailModelRoutes */];
