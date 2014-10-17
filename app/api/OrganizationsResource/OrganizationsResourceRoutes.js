var leaderboardController=require('../../system/controllers/LeaderboardController.js');
var medalController=require('../../system/controllers/MedalsController.js');
var eCommerceEngine=require('../../system/controllers/eCommerceEngine');
var storeItemController=eCommerceEngine.StoreItemController;
var goalMasterController=require('../../system/controllers/GoalMasterController.js');
var hierarchyController=require('../../system/controllers/HierarchyEngine');
var socialEngine=require('../../system/controllers/SocialEngine');
var tagController=require('../../system/controllers/TagsController.js');
var AuthorizationController=require('../../system/controllers/AuthorizationController.js');
var levelsController=require('../../system/controllers/LevelsController.js');
var rolesController=require('../../system/controllers/RolesController.js');
var transactionController=require('../../system/controllers/TransactionsController.js');
var passport=require('passport');

var organizationRoutes={
  'post /org':[function(req,res,next){AuthorizationController.isAuthorized('Organizations','create',req,res,next);},function(req,res){
    hierarchyController.OrganizationsController.createOrganization(req,res);
  }],
  'post /org/:orgId':[function(req,res,next){AuthorizationController.isAuthorized('Organizations','update',req,res,next);},function(req,res){
    hierarchyController.OrganizationsController.updateOrganization(req,res);
  }],
  'get /org/:orgId':[function(req,res,next){AuthorizationController.isAuthorized('Organizations','read',req,res,next);},function(req,res){
    hierarchyController.OrganizationsController.getOrganization(req,res);
  }]
};

var goalMasterRoutes={
  'get /org/:orgId/goals':[function(req,res,next){AuthorizationController.isAuthorized('GoalMasters','list',req,res,next);},function(req,res){
    goalMasterController.getAllGoalMasters(req,res);
  }]
};
var transactionMasterRoutes={
  'get /org/:orgId/transactions':[function(req,res,next){AuthorizationController.isAuthorized('TransactionMasters','list',req,res,next);},function(req,res){
    transactionController.getAllTransactionMasters(req,res);
  }]
};

// End Points for Stores
var storeRoutes={
  'get org/:orgId/stores/:storeId':[function(req,res,next){AuthorizationController.isAuthorized('Stores','read',req,res,next);},function(req,res) {
    eCommerceEngine.StoreController.getStore(req,res);
  }],
  'get org/:orgId/stores':[function(req,res,next){AuthorizationController.isAuthorized('Stores','listOrg',req,res,next);},function(req,res) {
    eCommerceEngine.StoreController.getStoresOfOrganization(req,res);
  }],
  'post /org/:orgId/stores':[function(req,res,next){AuthorizationController.isAuthorized('Stores','create',req,res,next);},function(req,res){
    eCommerceEngine.StoreController.createStore(req,res);
  }],
  'post /org/:orgId/stores/:storeId':[function(req,res,next){AuthorizationController.isAuthorized('Stores','update',req,res,next);},function(req,res){
    eCommerceEngine.StoreController.updateStore(req,res);
  }],
  'del org/:orgId/stores/:storeId':[function(req,res,next){AuthorizationController.isAuthorized('Stores','delete',req,res,next);},function(req,res){
    eCommerceEngine.StoreController.deleteStore(req,res);
  }]
};

//End Points for StoreItems
var storeItemRoutes={
  'get org/:orgId/storeitems/:storeItemId':[function(req,res,next){AuthorizationController.isAuthorized('StoreItems','read',req,res,next);},function(req,res) {
    storeItemController.getStoreItem(req,res);
  }],
  'get /org/:orgId/storeitems':[function(req,res,next){AuthorizationController.isAuthorized('StoreItems','listOrg',req,res,next);},function(req,res){
    storeItemController.getStoreItemsOfOrganization(req,res);
  }],
  'post /org/:orgId/storeitems':[function(req,res,next){AuthorizationController.isAuthorized('StoreItems','create',req,res,next);},function(req,res){
    storeItemController.createStoreItem(req,res);
  }],
  //getStoreItemsOfStore
  'post /org/:orgId/storeitems/:storeItemId':[function(req,res,next){AuthorizationController.isAuthorized('StoreItems','update',req,res,next);},function(req,res){
    storeItemController.updateStoreItem(req,res);
  }],
  'post /org/:orgId/stores/:storeId/items':[function(req,res,next){AuthorizationController.isAuthorized('StoreItems','assign',req,res,next);},function(req,res){
    eCommerceEngine.StoreController.assignStoreItemToStore(req,res);
  }],
  'del org/:orgId/storeitems/:storeItemId':[function(req,res,next){AuthorizationController.isAuthorized('StoreItems','delete',req,res,next);},function(req,res){
    storeItemController.deleteStoreItem(req,res);
  }]
};

//End Points for Medals:
var medalRoutes={
  'get org/:orgId/medals':[function(req,res,next){AuthorizationController.isAuthorized('Medals','listOrg',req,res,next);},function(req,res) {
    medalController.getMedalsOfOrganization(req,res);
  }],
  'get org/:orgId/medals/:medalId':[function(req,res,next){AuthorizationController.isAuthorized('Medals','read',req,res,next);},function(req,res) {
    medalController.getMedal(req,res);
  }],
  'post /org/:orgId/medals':[function(req,res,next){AuthorizationController.isAuthorized('Medals','create',req,res,next);},function(req,res){
    medalController.createMedal(req,res);
  }],
  'post /org/:orgId/medals/:medalId':[function(req,res,next){AuthorizationController.isAuthorized('Medals','update',req,res,next);},function(req,res){
    medalController.updateMedal(req,res);
  }]
};

var socialFeedRoutes={
  'get /org/:orgId/socialfeed':[function(req,res,next){AuthorizationController.isAuthorized('Organizations','read',req,res,next);},function(req,res){
    socialEngine.SocialFeedController.getSocialFeedOfOrganization(req,res);
  }]
};

//End Points For LeaderBoard:
var leaderboardRoutes={
  'get org/:orgId/leaderboard':[function(req,res,next){AuthorizationController.isAuthorized('Organizations','read',req,res,next);},function(req,res) {
    leaderboardController.getOrganizationLeaderboard(req,res);
  }]
    // 'get org/:orgId/teams/:teamId/leaderboard':function(req,res) {
    //     leaderboardController.getleaderboardTeam(req,res);
    // },
};

var tagRoutes={
  'post org/:orgId/tags':[function(req,res,next){AuthorizationController.isAuthorized('Tags','create',req,res,next);},function(req,res){
    tagsController.createTag(req,res);
  }],
  'get org/:orgId/tags/:tagName':[function(req,res,next){AuthorizationController.isAuthorized('Tags','list',req,res,next);},function(req,res){
    tagsController.getTagsOfTypeOfOrganization(req,res);
  }],
  'post org/:orgId/tags/:tagId':[function(req,res,next){AuthorizationController.isAuthorized('Tags','update',req,res,next);},function(req,res){
    tagsController.updateTag(req,res);
  }],
  'del org/:orgId/tags/:tagId':[function(req,res,next){AuthorizationController.isAuthorized('Tags','delete',req,res,next);},function(req,res){
    tagsController.deleteTag(req,res);
  }],
};

var levelRoutes={
  'post org/:orgId/level':[function(req,res,next){AuthorizationController.isAuthorized('Organizations','update',req,res,next);},function(req,res){
    levelsController.createLevelForOrganization(req,res);
  }],
  'get org/:orgId/level':[function(req,res,next){AuthorizationController.isAuthorized('Organizations','update',req,res,next);},function(req,res){
    levelsController.getLevelOfOrganization(req,res);
  }]
};

var roleRoutes={
  'get org/:orgId/roles':[function(req,res,next){AuthorizationController.isAuthorized('Roles','list',req,res,next);},function(req,res){
    rolesController.getRolesOfOrganization(req,res);
  }]
};

var stuff=[leaderboardRoutes,goalMasterRoutes,medalRoutes,storeItemRoutes,storeRoutes,organizationRoutes,socialFeedRoutes,tagRoutes,levelRoutes,roleRoutes,transactionMasterRoutes];
module.exports={
  initialize:function(server,handlers){
    stuff.forEach(function(routesObj){
      for(var property in routesObj) {
        methods=property.split(" ");
        if(handlers)
          eval("server."+methods[0]+"('"+methods[1]+"',"+handlers+","+routesObj[property]+');');
        else
          eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
      }
    });
    console.log("Organization Routes initialized");
  }
};
