var leaderboardController=require('../../system/controllers/LeaderboardController.js');
var medalController=require('../../system/controllers/MedalsController.js');
var eCommerceEngine=require('../../system/controllers/eCommerceEngine');
var storeItemController=eCommerceEngine.StoreItemController;
var goalMasterController=require('../../system/models/GoalMaster');
var hierarchyController=require('../../system/controllers/HierarchyEngine');

var organizationRoutes={
  'post /org':function(req,res){
    hierarchyController.OrganizationsController.createOrganization(req,res);
  },
  'post /org/:orgId':function(req,res){
    hierarchyController.OrganizationsController.updateOrganization(req,res);
  },
  'get /org/:orgId':function(req,res){
    hierarchyController.OrganizationsController.getOrganization(req,res);
  }
};

var goalMasterRoutes={
  'get /org/:orgId/goals':function(req,res){
    goalMasterController.getAllGoalMasters("","","transactions",function(err,goals){
      res.send(goals);
    });
  }
};

// End Points for Stores
var storeRoutes={
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
var storeItemRoutes={
    'get org/:orgId/storeitems/:storeItemId':function(req,res) {
      storeItemController.getStoreItem(req,res);
    },
    'get /org/:orgId/storeitems':function(req,res){
        storeItemController.getStoreItemsOfOrganization(req,res);
    },
    'post /org/:orgId/storeitems':function(req,res){
        storeItemController.createStoreItem(req,res);
    },
    'post /org/:orgId/storeitems/:storeItemId':function(req,res){
        storeItemController.updateStoreItem(req,res);
    },
    'del org/:orgId/storeitems/:storeItemId':function(req,res){
        storeItemController.deleteStoreItem(req,res);
    }
};

//End Points for Medals:
var medalRoutes={
    'get org/:orgId/medals':function(req,res) {
        medalController.getMedalsOfOrganization(req,res);
    },
    'get org/:orgId/medals/:medalId':function(req,res) {
        medalController.getMedal(req,res);
    },
    'post /org/:orgId/medals':function(req,res){
        medalController.createMedal(req,res);
    },
    'post /org/:orgId/medals/:medalId':function(req,res){
        medalController.updateMedal(req,res);
    }
};

//End Points For LeaderBoard:
var leaderboardRoutes={
    'get org/:orgId/leaderboard':function(req,res) {
        leaderboardController.getOrganizationLeaderboard(req,res);
    }
    // 'get org/:orgId/teams/:teamId/leaderboard':function(req,res) {
    //     leaderboardController.getleaderboardTeam(req,res);
    // },
};

var stuff=[leaderboardRoutes,goalMasterRoutes,medalRoutes,storeItemRoutes,storeRoutes,organizationRoutes];
module.exports={
  initialize:function(server){
    stuff.forEach(function(routesObj){
      for(var property in routesObj) {
        methods=property.split(" ");
        eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
      }
    });
    console.log("Organization Routes initialized");
  }
};