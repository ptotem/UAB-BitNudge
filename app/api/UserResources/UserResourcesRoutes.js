var leaderboardController=require('../../system/controllers/LeaderboardController.js');
var transactionController=require('../../system/controllers/TransactionsController.js');
var storeItemController=require('../../system/controllers/eCommerceEngine').StoreItemController;
var medalController=require('../../system/controllers/MedalsController.js');
var goalController=require('../../system/controllers/GoalsController.js');
var socialEngine=require('../../system/controllers/SocialEngine');
var userController=require('../../system/controllers/UsersController.js');
var userRoutes={
  'get /org/:orgId/users/:userId':function(req,res){
    userController.getUser(req,res);
//      console.log('hello');
  },
  'get /org/:orgId/users':function(req,res){
//      console.log('klll');
    userController.getUsersOfOrganization(req,res);
  },
  'post /org/:orgId/users':function(req,res){
    userController.createUser(req,res);
  },
  'post /org/:orgId/users/:userId':function(req,res){
    userController.updateUser(req,res);
  },
  'post /org/:orgId/teams/:teamId/members':function(req,res){
    userController.addUserToTeam(req,res);
  }
  // 'del /org/:u'
};

// End Points for Transactions in UserResourcesRoutes:
var transactionRoutes={
    'get org/:orgId/users/:userId/transactions':function(req,res) {
        transactionController.getTransactionsOfUser(req,res);
    },
    'get org/:orgId/users/:userId/transactions/:transactionId/approve':function(req,res){
      transactionController.approveTransaction(req,res);
    },
    'post /org/:orgId/users/:userId/transactions/':function(req,res){
      transactionController.createTransaction(req,res);
    },
    'del org/:orgId/users/:userId/transaction/:transactionId':function(req,res){
        transactionController.deleteTransactionOfUser(req,res);
    }
};

//End Points for StoreItems in UserResourcesRoutes:
var storeItemRoutes={
  'get org/:orgId/users/:userId/items':function(req,res) {
//      console.log('herro');
//      res.send(req.query.limits);
    storeItemController.getStoreItemsOfUser(req,res);
  },
  'post /org/:orgId/users/:userId/items/':function(req,res){
    storeItemController.buyItemForUser(req,res);
  }
};
var transactionHistoryRoutes={
  'get /org/:orgId/users/:userId/transactionHistory':function(req,res){
    userController.getTransactionHistoryOfUser(req,res);
  }
//
//    'get /login':function(req,res){
////        res.send('kll');
//        userController.IsAuthenticated(req,res);
//    }
};


// var rankController=require('../../system/controllers/PointsEngine/RankController.js');
// //End Points for Rank:
// var rankRoutes={
//     'get org/:orgId/users/:userId/rank':function(req,res) {
//         rankController.getUserRank(req,res);
//     }
// };

var medalRoutes={
    'get org/:orgId/users/:userId/medals':function(req,res) {
      medalController.getMedalsOfUser(req,res);
    },
    'post /org/:orgId/users/:userId/medals':function(req,res){
      medalController.assignMedalToUser(req,res);
    }
};

//End Points For Goals:
var goalRoutes={
    'get org/:orgId/users/:userId/goals':function(req,res){
      goalController.getLiveUserGoals(req,res);
    },
    'post /org/:orgId/users/:userId/goals':function(req,res){
//      console.log("test");
      goalController.createGoal(req,res);
    }
};

var leaderboardRoutes={
  'get org/:orgId/leaderboard/users':function(req,res){
    leaderboardController.getUserLeaderboard(req,res);
  }
};

//End Points For SocialFeed:
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
  // 'get /org/:org:id/users/:userId/statuses/:statusId/comments':function(req,res){
  //   socialEngine.StatusMessagesController.getCommentsOfStatus(req,res);
  // },
  'post /org/:org:id/users/:userId/statuses/:statusId/comments':function(req,res){
    socialEngine.StatusMessagesController.commentOnStatusMessage(req,res);
  },
  'post /org/:org:id/users/:userId/statuses/:statusId/like':function(req,res){
    socialEngine.StatusMessagesController.likeStatusMessage(req,res);
  },
  'del /org/:orgId/users/:userId/statuses/:statusId':function(req,res){
    socialEngine.StatusMessagesController.deleteStatusMessage(req,res);
  }
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
var nudgeMailBoxRoutes={
    'get org/:orgId/users/:userId/mails':function(req,res){
        socialEngine.NudgeMailboxController.getNudgeMailboxOfUser(req,res);
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
var stuff=[storeItemRoutes,leaderboardRoutes,userRoutes,transactionRoutes,transactionHistoryRoutes,goalRoutes,nudgeChatRoutes,nudgeMailBoxRoutes,nudgeMailRoutes,statusMessagesRoutes,socialFeedRoutes,medalRoutes];
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
