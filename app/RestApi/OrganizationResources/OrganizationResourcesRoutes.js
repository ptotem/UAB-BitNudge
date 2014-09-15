
// End Points For Users:
var userModel=require('../../system/controllers/AuthorizationController.js');
var userModelRoutes={
    'get org/:orgId/users/:userId':function(req,res) {
        userModel.getuser(req.id),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /users':function(req,res){
        userModel.createUser(req.query);
    },
    'post/org/:orgId /users/:userId':function(req,res){
        userModel.createUser(req.query);
    },
    'del org/:orgId/users/:userId':function(req,res){
        userModel.deleteUser(req.params.id,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    },
    'post /org/:orgId/users/:userId':function(req,res){
        userModel.updateUserById(req.params.id,req.query,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }
}

 // End Points for Roles:
var roleModel=require('../../system/controllers/RoleController.js');
var roleModelRoutes={
    'get org/:orgId/roles/:roleId':function(req,res) {
        roleModel.getRole(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /roles':function(req,res){
        roleModel.createRole(req.query);
    },
    'post/org/:orgId /roles/:roleId':function(req,res){
        roleModel.createRole(req.query);
    },
    'del org/:orgId/users/:roleId':function(req,res){
        roleModel.deleteRole(req.params.id,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }
}

// End Points for Stores
var storeModel=require('../../system/controllers/eCommerceEngine/StoreController');
var storeModelRoutes={
    'get org/:orgId/stores/:storeId':function(req,res) {
        storeModel.getStoreOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/stores':function(req,res) {
        storeModel.getStore(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/teams/:teamId/stores/:storeId':function(req,res) {
        storeModel.getStoreTeam(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/teams/:teamId/stores':function(req,res) {
        storeModel.getStoreTeam(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /stores':function(req,res){
        storeModel.addStoreInOrg(req.query);
    },
    'post/org/:orgId/teams/:teamId/stores':function(req,res){
        storeModel.addStoreInTeam(req.query);
    },
    'post/org/:orgId /stores/:storeId':function(req,res){
        storeModel.addStoreInOrg(req.query);
    },
    'post/org/:orgId/teams/:teamId/stores/:storeId':function(req,res){
        storeModel.addStoreInTeam(req.query);
    },
    'del org/:orgId/stores/:storeId':function(req,res){
        storeModel.deleteUser(req.params.id,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }


}

//End Points for StoreItems

var storeItemModel=require('../../system/controllers/eCommerceEngine/StoreItemController.js');
var storeItemModelRoutes={
    'get org/:orgId/storeItems/:storeItemId':function(req,res) {
        storeItemModel.getStoreItemOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /storeItems':function(req,res){
        storeItemModel.createStoreItemInOrg(req,res);
    },
    'post/org/:orgId /store/:storeId':function(req,res){
        storeItemModel.updateStoreItem(req.query);
    },
    'del org/:orgId/store/:storeId':function(req,res){
        storeItemModel.storeItemId(req.params.storeId,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }
}

//End Points for Teams:

var teamModel=require('../../system/controllers/HierarchyEngine/HierarchyEngine.js');
var teamModelRoutes={
    'get org/:orgId/teams/:teamId':function(req,res) {
        teamModel.getTeamOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /teams':function(req,res){
        teamModel.addTeamToOrg(req,res);
    },
    'post/org/:orgId /teams/:teamId':function(req,res){
        teamModel.updateTeam(res,req);
    },
    'del org/:orgId/team/:teamId':function(req,res){
        teamModel.deleteTeamFromOrg(req.params.teamId,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }

}

//End Points for Medals:

var medalModel=require('../../system/controllers/HierarchyEngine/HierarchyEngine.js');
var medalModelRoutes={
    'get org/:orgId/medals':function(req,res) {
        medalModel.getOrgMedal(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/medals/:medalId':function(req,res) {
        medalModel.getMedalDetail(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/user/:userId/medals':function(req,res) {
        medalModel.getUserMedal(req,res),function(err,obj){
            console.log(err+obj);
        }
    },

    'post/org/:orgId /medals':function(req,res){
        medalModel.addMedalsToOrg(req,res);
    },
    'post/org/:orgId /user/:userId/medals/':function(req,res){
        medalModel.addMedalsToUser(res,req);
    },
    'post/org/:orgId /medals/:medalId':function(req,res){
        medalModel.updateMedalInOrg(res,req);
    },
    'del org/:orgId/team/:medalId':function(req,res){
        medalModel.deleteMedalFromOrg(req.params.medalId,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }


}


//End Points for Products:

var productModel=require('../../system/controllers/ProductController.js');
var productModelRoutes={

    'get org/:orgId/products':function(req,res) {
        medalModel.getProductFromOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/products/:productId':function(req,res) {
        medalModel.getProduct(req,res),function(err,obj){
            console.log(err+obj);
        }
    },

    'post/org/:orgId /products/productId':function(req,res){
        medalModel.updateProducts(req,res);
    },
    'post/org/:orgId /products':function(req,res){
        medalModel.addProductToOrg(res,req);
    },
    'get org/:orgId /users/:userId/products':function(req,res){
        medalModel.sellProductToClient(res,req);
    },
    'del org/:orgId/:productId':function(req,res){
        medalModel.removeProduct(req,res),function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        };
    }
}

//End Points for Revenues

var revenuesModel=require('../../system/controllers/RevenueController.js');
 var revenueModelRoutes={
     'get org/:orgId/revenue':function(req,res) {
         revenuesModel.getProductFromOrg(req,res),function(err,obj){
             console.log(err+obj);
         }
     },
     'get org/:orgId/revenue/:revenueId':function(req,res) {
         revenuesModel.getProduct(req,res),function(err,obj){
             console.log(err+obj);
         }
     },

     'post/org/:orgId /revenue/revenueId':function(req,res){
         revenuesModel.updateProducts(req,res);
     },
     'post/org/:orgId /revenue':function(req,res){
         revenuesModel.addProductToOrg(res,req);
     },
     'post/ org/:orgId /users/:userId/revenue':function(req,res){
         revenuesModel.sellProductToClient(res,req);
     },
     'del org/:orgId/:productId':function(req,res){
         revenuesModel.removeProduct(req,res),function(err,obj){
             if(err)
                 res.send(err);
             else res.send(obj);
         };
     }

 }

// End Points for Trainings:

var trainingModel=require('../../system/controllers/TrainingController.js');
var trainingModelRoutes={
    'get org/:orgId/training':function(req,res) {
        trainingModel.getTrainingOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/training/:trainingId':function(req,res) {
        trainingModel.getTrainingInfo(req,res),function(err,obj){
            console.log(err+obj);
        }
    },

    'post/org/:orgId /training/trainingId':function(req,res){
        trainingModel.updateTrainings(req,res);
    },
    'post/org/:orgId /training':function(req,res){
        trainingModel.addTrainingToOrg(res,req);
    },
    'post/org/:orgId /teams/:teamId/training':function(req,res){
        trainingModel.addTrainingToTeam(res,req);
    },
    'get org/:orgId /users/:userId/training':function(req,res){
        trainingModel.fetchTrainingFromUser(res,req);
    },
    'del org/:orgId/:trainingId':function(req,res){
        trainingModel.removeTraining(req,res),function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        };
    }

}


//End Points For Goals:

var goalModel=require('../../system/controllers/GoalController.js');
var goalModelRoutes={
    'get org/:orgId/goals':function(req,res) {
        goalModel.getGoalsOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/goals/:goalId':function(req,res) {
        goalModel.getGoalInfo(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/teams/:teamId/goals':function(req,res) {
        goalModel.getTeamGoal(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/users/:userId/goals':function(req,res) {
        goalModel.getUserGoal(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /goals/goalId':function(req,res){
        goalModel.updateGoal(req,res);
    },
    'post/org/:orgId /goals':function(req,res){
        goalModel.addGoalToOrg(res,req);
    },
    'post/org/:orgId /teams/:teamId/goals':function(req,res){
        goalModel.addGoalToTeam(res,req);
    },
    'post/org/:orgId /users/:userId/goals':function(req,res){
        goalModel.addGoalToUser(res,req);
    },
    'post/org/:orgId /teams/:teamId/goals/goalId':function(req,res){
        goalModel.updateGoalToTeam(res,req);
    },
    'post/org/:orgId /teams/:userId/goals/goalId':function(req,res){
        goalModel.updateGoalToUser(res,req);
    },
    'del org/:orgId/:goalId':function(req,res){
        goalModel.removeTraining(req,res),function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        };
    }

}

//End Points For LeaderBoard:

var leaderBoardModel=require('../../system/controllers/leaderBoardController.js');
var leaderBoardModelRoutes={
    'get org/:orgId/leaderBoard':function(req,res) {
        leaderBoardModel.getleaderBoardOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/leaderBoard/:leaderBoardId':function(req,res) {
        leaderBoardModel.getleaderBoardModelInfo(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/teams/:teamId/leaderBoard':function(req,res) {
        leaderBoardModel.getleaderBoardTeam(req,res),function(err,obj){
            console.log(err+obj);
        }
    }
//    'get org/:orgId/users/:userId/leaderBoard':function(req,res) {
//        goalModel.getUserGoal(req,res),function(err,obj){
//            console.log(err+obj);
//        }
//    },
//    'post/org/:orgId /leaderBoards/leaderBoardId':function(req,res){
//        goalModel.updateGoal(req,res);
//    },
//    'post/org/:orgId /leaderBoards':function(req,res){
//        goalModel.addGoalToOrg(res,req);
//    },
//    'post/org/:orgId /teams/:teamId/leaderBoards':function(req,res){
//        goalModel.addGoalToTeam(res,req);
//    },
//    'post/org/:orgId /users/:userId/leaderBoards':function(req,res){
//        goalModel.addGoalToUser(res,req);
//    },
//    'post/org/:orgId /teams/:teamId/leaderBoards/leaderBoardId':function(req,res){
//        goalModel.updateGoalToTeam(res,req);
//    },
//    'post/org/:orgId /teams/:userId/leaderBoards/leaderBoardId':function(req,res){
//        goalModel.updateGoalToUser(res,req);
//    },
//    'del org/:orgId/:leaderBoardId':function(req,res){
//        goalModel.removeTraining(req,res),function(err,obj){
//            if(err)
//                res.send(err);
//            else res.send(obj);
//        };
//    }

}

//End Points for Clients:

var clientModel=require('../../system/controllers/ClientController.js');
var ClientsModelRoutes={
    'get org/:orgId/clients':function(req,res) {
        clientModel.getClientsFromOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/clients/:clientId':function(req,res) {
        clientModel.getClientInfo(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/users/:userId/clients':function(req,res) {
        clientModel.fetchClientOfUser(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /clients/:clientId':function(req,res){
        clientModel.updateClientData(req,res);
    },
    'post/org/:orgId /clients':function(req,res){
        clientModel.addClientsToOrg(res,req);
    },
    'post/org/:orgId/leaderBoards':function(req,res){
        clientModel.addGoalToTeam(res,req);
    },
    'post/org/:orgId /users/:userId/clients':function(req,res){
        clientModel.assignClientToUser(res,req);
    },

    'del org/:orgId/:clients':function(req,res){
        clientModel.removeTraining(req,res),function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        };
    }

}