
//End Points for roles in  UserResourcesRoutes:
var userModel=require('../../system/controllers/UsersController.js');
// var roleModel=require('../../system/controllers/RoleController.js');
// var roleModelRoutes={
//     'get org/:orgId/users/:userId':function(req,res) {
//         roleModel.getRoleofUser(req,res);
//     },
//     'post /org/:orgId /users/:userId/role/:roleId':function(req,res){
//         roleModel.assignRole(req.query);
//     }
// };

var userModelRoutes={
  'get /org/:orgId/users/:userId':function(req,res){
    userModel.getUser(req,res);
  },
  'get /org/:orgId/users':function(req,res){
    userModel.getUsersOfOrganization(req,res);
  },
  'post /org/:orgId/users':function(req,res){
    userModel.createUser(req,res);
  },
  'post /org/:orgId/users/:userId':function(req,res){
    userModel.updateUser(req,res);
  },
  'post /org/:orgId/teams/:teamId/members':function(req,res){
    userModel.addUserToTeam(req,res);
  }
  // 'del /org/:u'
};

// End Points for Transactions in UserResourcesRoutes:

// var transactionModel=require('../../system/controllers/TransactionController.js');
// var transactionModelRoutes={
//     'get org/:orgId/users/:userId/transactions':function(req,res) {
//         transactionModel.getTransactionofUser(req,res);
//     },
//     'post /org/:orgId /users/:userId/transactions/':function(req,res){
//         transactionModel.createTransaction(req,res);
//     },
//     'del org/:orgId/users/:userId/transaction/:transactionId':function(req,res){
//         roleModel.deleteTransactionOfUser(req,res);
//     }
// };

//End Points for StoreItems in UserResourcesRoutes:

var storeItemModel=require('../../system/controllers/eCommerceEngine').StoreItemController;
var storeItemModelRoutes={
  'get org/:orgId/users/:userId/items':function(req,res) {
    storeItemModel.getStoreItemsOfUser(req,res);
  },
  'post /org/:orgId/users/:userId/items/':function(req,res){
    storeItemModel.buyItemForUser(req,res);
  }
};


var rankModel=require('../../system/controllers/PointsEngine/RankController.js');
//End Points for Rank:
var rankModelRoutes={
    'get org/:orgId/users/:userId/rank':function(req,res) {
        rankModel.getUserRank(req,res);
    }
};

// //End Points for Level:
// var levelModelRoutes={
//     'get org/:orgId/users/:userId/rank':function(req,res) {
//         userModel.getUserRank(req,res);
//     },
//     'post /org/:orgId /users/:userId/rank/':function(req,res){
//         transactionModel.setUserRank(req,res);
//     }
// };

var medalController=require('../../system/controllers/MedalsController.js');
var medalModelRoutes={
    'get org/:orgId/users/:userId/medals':function(req,res) {
      medalController.getMedalsOfUser(req,res);
    },
    'post /org/:orgId/users/:userId/medals':function(req,res){
      medalController.assignMedalToUser(req,res);
    }
};

//End Points for Clients:
// var levelModelRoutes={
//     'get org/:orgId/users/:userId/rank':function(req,res) {
//         userModel.getUserRank(req,res);
//     },
//     'post /org/:orgId /users/:userId/rank/':function(req,res){
//         transactionModel.setUserRank(req,res);
//     }
// };

//End Points For Products:
// var productModel=require('../../system/controllers/ProductController.js');
// var productModelRoutes={
//     'get org/:orgId/users/:userId/product':function(req,res) {
//         userModel.getUserRank(req,res);
//     },
//     'post /org/:orgId /users/:userId/rank/':function(req,res){
//         transactionModel.setUserRank(req,res);
//     }
// };


//End Points for Revenues:
// var revenueModel=require('../../system/controllers/revenueController.js');
// var revenueModelRoutes={
//     'get org/:orgId/users/:userId/revenue':function(req,res){
// //        revenueModel.getRevenueByOrgId(req.params.orgId);
//         revenueModel.getRevenueByOrgId(req,res);
//     },
//     //    'get org/:orgId/users/:userId/product':function(req,res) {
//     //        userModel.getUserRank(req,res)
//     //    },
//     'post /org/:orgId/users/:userId/revenue/':function(req,res){
//            revenueModel.setRevenue(req.params.userId,req.params.revenue);
//         }
// };

//End Points For Trainings:
// var trainingModel=require('../../system/controllers/trainingController.js');
// var trainingModelRoutes={
//     'get org/:orgId/users/:userId/training':function(req,res){
//         trainingModel.getTrainingOfUser(req,res);
// //        revenueModel.getTrainingOfUser(req.userId);
//     },
// 'post /org/:orgId /users/:userId/training/:trainingId/':function(req,res){
//     trainingModel.assignTrainingToUser(req.params.userId,req.params.trainingId);
// }
//
// };

//End Points For Goals:
// var goalModel=require('../../system/controllers/GoalsController.js');
// var goalModelRoutes={
//     'get org/:orgId/users/:userId/goals':function(req,res){
//       goalModel.getLiveUserGoals(req,res);
//     },
//     'post /org/:orgId/users/:userId/goals':function(req,res){
//       goalModel.assignGoalToUser(req,res);
//     }
// };

var leaderboardModel=require('../../system/controllers/LeaderboardController.js');
var leaderboardRoutes={
  'get org/:orgId/leaderboard/users':function(req,res){
    leaderboardModel.getUserLeaderboard(req,res);
  }
};

//End Points For SocialFeed:
var socialEngine=require('../../system/controllers/SocialEngine');
var socialFeedRoutes={
  'get /org/:orgId/users/:userId/socialfeed':function(req,res){
    socialEngine.SocialFeedController.getSocialFeedOfUser(req,res);
  }
};

var statusMessagesRoutes={
  'post /org/:orgId/users/:userId/statuses/:statusId':function(req,res){
    socialEngine.StatusMessagesController.updateStatusMessage(req,res);
  },
  'post /org/:orgId/users/:userId/statuses':function(req,res){
    socialEngine.StatusMessagesController.createStatusMessage(req,res);
  },
  'get /org/:orgId/users/:userId/statuses':function(req,res){
    socialEngine.StatusMessagesController.getStatusMessagesOfUser(req,res);
  },
  'get /org/:orgId/users/:userId/statuses/:statusId':function(req,res){
    socialEngine.StatusMessagesController.getStatusMessage(req,res);
  },
  // 'del /org/:orgId/users/:userId/statuses/:statusId':function(req,res){
  //   socialEngine.StatusMessagesController.deleteStatusMessage(req,res);
  // }
};


//End Points For NudgeChat:
var nudgeChatRoutes={
    'get org/:orgId/users/:userId/chat':function(req,res){
        socialEngine.NudgeChatController.getNudgeChatOfUser(req,res);
    },
    'post /org/:orgId /users/:userId/chat/':function(req,res){
        socialEngine.NudgeChatController.sendNudgeMessage(req,res);
    }
};

//End Points For NudgeMailbox:
var nudgeMailBoxModelRoutes={
    'get org/:orgId/users/:userId/mails':function(req,res){
        socialEngine.NudgeMailboxController.getMailboxOfUser(req,res);
    }
};

//End Points For NudgeMails
var nudgeMailRoutes={
    'get org/:orgId/users/:userId/mails/:mailId':function(req,res){
        socialEngine.NudgeMailsController.getMail(req,res);
    },
    'post /org/:orgId/users/:userId/mails/:mailId':function(req,res) {
        socialEngine.NudgeMailsController.updateMail(req,res);
    },
   'post /org/:orgId/user/:userId/mails':function(req,res) {
        socialEngine.NudgeMailsController.sendMail(req,res);
    },
    'del org/:orgId/:users/:userId/mails/:mailId':function(req,res){
        socialEngine.NudgeMailsController.deleteMail(req,res);
    }
};
var stuff=[storeItemModelRoutes,leaderboardRoutes,userModelRoutes/* roleModelRoutes transactionModelRoutes/* ,storeItemModelRoutes rankModelRoutes,userModelRoutes,socialFeedRoutes,leaderboardRoutes/*,levelModelRoutes,medalModelRoutes,productModelRoutes,revenueModelRoutes/* ,trainingModelRoutes,goalModelRoutes ,nudgeChatRoutes,nudgeMailBoxModelRoutes,nudgeMailRoutes*/];
module.exports={
  initialize:function(server){
    stuff.forEach(function(routesObj){
    for(var property in routesObj) {
      methods=property.split(" ");
      eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
    }
    });
    console.log("User Routes initialized");
  }
};
