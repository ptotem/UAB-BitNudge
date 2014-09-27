// End Points For Users:
// TODO:- move to user resources folder. But it's already tested.

var hierarchyModel=require('../../system/controllers/HierarchyEngine');

var orgRoutes={
  'post /org':function(req,res){
    hierarchyModel.OrganizationsController.createOrganization(req,res);
  },
  'post /org/:orgId':function(req,res){
    hierarchyModel.OrganizationsController.updateOrganization(req,res);
  },
  'get /org/:orgId':function(req,res){
    hierarchyModel.OrganizationsController.getOrganization(req,res);
  }
};

 // End Points for Roles:
// var roleModel=require('../../system/controllers/RoleController.js');
// var roleModelRoutes={
//     'get org/:orgId/roles/:roleId':function(req,res) {
//         roleModel.getRole(req,res),function(err,obj){
//             console.log(err+obj);
//         }
//     },
//     'post / org/:orgId /roles':function(req,res){
//         roleModel.createRole(req.query);
//     },
//     'post /org/:orgId /roles/:roleId':function(req,res){
//         roleModel.createRole(req.query);
//     },
//     'del org/:orgId/users/:roleId':function(req,res){
//         roleModel.deleteRole(req.params.id,function(err,obj){
//             if(err)
//                 res.send(err);
//             else res.send(obj);
//         });
//     }
// }

// End Points for Stores
var eCommerceEngine=require('../../system/controllers/eCommerceEngine');
var storeModelRoutes={
  'get org/:orgId/stores/:storeId':function(req,res) {
    eCommerceEngine.StoreController.getStore(req,res);
  },
  'get org/:orgId/stores':function(req,res) {
    eCommerceEngine.StoreController.getStoresOfOrganization(req,res);
  },
  'post /org/:orgId/stores':function(req,res){
    eCommerceEngine.StoreController.createStore(req,res);
  },
  'post /org/:orgId/stores/:storeId':function(req,res){
    eCommerceEngine.StoreController.updateStore(req,res);
  },
  'post /org/:orgId/stores/:storeId/items':function(req,res){
    eCommerceEngine.StoreController.assignStoreItemToStore(req,res);
  },
  'del org/:orgId/stores/:storeId':function(req,res){
    eCommerceEngine.StoreController.deleteStore(req,res);
  }
};

//End Points for StoreItems

var storeItemModel=eCommerceEngine.StoreItemController;
var storeItemModelRoutes={
    'get org/:orgId/storeitems/:storeItemId':function(req,res) {
      storeItemModel.getStoreItem(req,res);
    },
    'get /org/:orgId/storeitems':function(req,res){
        storeItemModel.getStoreItemsOfOrganization(req,res);
    },
    'post /org/:orgId/storeitems':function(req,res){
        storeItemModel.createStoreItem(req,res);
    },
    'post /org/:orgId/storeitems/:storeItemId':function(req,res){
        storeItemModel.updateStoreItem(req,res);
    },
    'del org/:orgId/storeitems/:storeItemId':function(req,res){
        storeItemModel.deleteStoreItem(req,res);
    }
};


//End Points for Medals:

var medalModel=require('../../system/controllers/MedalsController.js');
var medalModelRoutes={
    'get org/:orgId/medals':function(req,res) {
        medalModel.getMedalsOfOrganization(req,res);
    },
    'get org/:orgId/medals/:medalId':function(req,res) {
        medalModel.getMedal(req,res);
    },
    'post /org/:orgId/medals':function(req,res){
        medalModel.createMedal(req,res);
    },
    'post /org/:orgId/medals/:medalId':function(req,res){
        medalModel.updateMedal(req,res);
    }
};

// End Points for Trainings:

// var trainingModel=require('../../system/controllers/TrainingController.js');
// var trainingModelRoutes={
//     'get org/:orgId/training':function(req,res) {
//         trainingModel.getTrainingOrg(req,res),function(err,obj){
//             console.log(err+obj);
//         }
//     },
//     'get org/:orgId/training/:trainingId':function(req,res) {
//         trainingModel.getTrainingInfo(req,res),function(err,obj){
//             console.log(err+obj);
//         }
//     },
//
//     'post /org/:orgId /training/trainingId':function(req,res){
//         trainingModel.updateTrainings(req,res);
//     },
//     'post /org/:orgId /training':function(req,res){
//         trainingModel.addTrainingToOrg(res,req);
//     },
//     'post /org/:orgId /teams/:teamId/training':function(req,res){
//         trainingModel.addTrainingToTeam(res,req);
//     },
//     'get org/:orgId /users/:userId/training':function(req,res){
//         trainingModel.fetchTrainingFromUser(res,req);
//     },
//     'del org/:orgId/:trainingId':function(req,res){
//         trainingModel.removeTraining(req,res),function(err,obj){
//             if(err)
//                 res.send(err);
//             else res.send(obj);
//         };
//     }
//
// }


//End Points For Goals:

// var goalModel=require('../../system/controllers/GoalsController.js');
// var goalModelRoutes={
//     'post org/:orgId/goals':function(req,res) {
//         goalModel.createGoal(req,res);
//     },
//     'get org/:orgId/goals/:goalId':function(req,res) {
//         goalModel.getGoal(req,res);
//     },
//     // 'get org/:orgId/teams/:teamId/goals':function(req,res) {
//     //     goalModel.getTeamGoal(req,res,function(err,obj){
//     //         console.log(err+obj);
//     //     });
//     // },
//     // 'post /org/:orgId/goals/:goalId':function(req,res){
//     //     goalModel.updateGoal(req,res);
//     // },
//     'get /org/:orgId/goals':function(req,res){
//         goalModel.getGoalsOfOrganization(res,req);
//     },
//     // 'post /org/:orgId/teams/:teamId/goals':function(req,res){
//     //     goalModel.addGoalToTeam(res,req);
//     // },
//     // 'post /org/:orgId/teams/:teamId/goals/goalId':function(req,res){
//     //     goalModel.updateGoalToTeam(res,req);
//     // },
//     // 'post /org/:orgId/teams/:userId/goals/goalId':function(req,res){
//     //     goalModel.updateGoalToUser(res,req);
//     // },
//     // 'del org/:orgId/:goalId':function(req,res){
//     //     goalModel.removeTraining(req,res,function(err,obj){
//     //         if(err)
//     //             res.send(err);
//     //         else res.send(obj);
//     //     });
//     // }
// };

//End Points For LeaderBoard:

var leaderboardModel=require('../../system/controllers/LeaderboardController.js');
var leaderboardModelRoutes={
    'get org/:orgId/leaderboard':function(req,res) {
        leaderboardModel.getOrganizationLeaderboard(req,res);
    }
    // 'get org/:orgId/teams/:teamId/leaderboard':function(req,res) {
    //     leaderboardModel.getleaderboardTeam(req,res);
    // },
};

//End Points for Clients:

// var clientModel=require('../../system/controllers/ClientController.js');
// var ClientsModelRoutes={
//     'get org/:orgId/clients':function(req,res) {
//         clientModel.getClientsFromOrg(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     },
//     'get org/:orgId/clients/:clientId':function(req,res) {
//         clientModel.getClientInfo(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     },
//     'get org/:orgId/users/:userId/clients':function(req,res) {
//         clientModel.fetchClientOfUser(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     },
//     'post /org/:orgId/clients/:clientId':function(req,res){
//         clientModel.updateClientData(req,res);
//     },
//     'post /org/:orgId/clients':function(req,res){
//         clientModel.addClientsToOrg(res,req);
//     },
//     'post /org/:orgId/leaderboards':function(req,res){
//         clientModel.addGoalToTeam(res,req);
//     },
//     'post /org/:orgId/users/:userId/clients':function(req,res){
//         clientModel.assignClientToUser(res,req);
//     },
//     'del org/:orgId/:clients':function(req,res){
//         clientModel.removeClients(req,res,function(err,obj){
//             if(err)
//                 res.send(err);
//             else res.send(obj);
//         });
//     }
// };
var stuff=[/*ClientsModelRoutes*/,leaderboardModelRoutes/*,goalModelRoutes/* ,trainingModelRoutes ,revenueModelRoutes,productModelRoutes*/,medalModelRoutes,storeItemModelRoutes,storeModelRoutes/*,roleModelRoutes */,orgRoutes];
module.exports={
  initialize:function(server){
    stuff.forEach(function(routesObj){
      for(var property in routesObj) {
        methods=property.split(" ");
        eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
      }
    });
    console.log("Org Routes initialized");
  }
};
