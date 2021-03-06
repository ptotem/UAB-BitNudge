var leaderboardController=require('../../system/controllers/LeaderboardController.js');
var eCommerceEngine=require('../../system/controllers/eCommerceEngine');
var hierarchyController=require('../../system/controllers/HierarchyEngine');
var AuthorizationController=require('../../system/controllers/AuthorizationController.js');
var passport=require('passport');

// End Points for User in Team Resources:
var memberTeamsRoutes={
  'get org/:orgId/teams/:teamId/members':[function(req,res,next){AuthorizationController.isAuthorized('TeamMembers','list',req,res,next);},function(req,res) {
    hierarchyController.TeamsController.getMembersOfTeam(req,res);
  }],
  'post /org/:orgId/teams/:teamId/members':[function(req,res,next){AuthorizationController.isAuthorized('Users','assign',req,res,next);},function(req,res){
    hierarchyController.TeamsController.addMembersToTeam(req,res);
  }],
  'del /org/:orgId/teams/:teamId/members/:userId':[function(req,res,next){AuthorizationController.isAuthorized('TeamMembers','delete',req,res,next);},function(req,res){
    hierarchyController.TeamsController.removeMemberFromTeam(req,res);
  }]
};

var subteamRoutes={
  'post /org/:orgId/teams/:teamId/subteams':[function(req,res,next){AuthorizationController.isAuthorized('Teams','assign',req,res,next);},function(req,res){
    hierarchyController.TeamsController.addSubteam(req,res);
  }],
  'get /org/:orgId/teams/:teamId/subteams':[function(req,res,next){AuthorizationController.isAuthorized('SubTeams','list',req,res,next);},function(req,res){
    hierarchyController.TeamsController.getSubteams(req,res);
  }],
  'del /org/:orgId/teams/:teamId/subteams/:subteamId':[function(req,res,next){AuthorizationController.isAuthorized('SubTeams','delete',req,res,next);},function(req,res){
    hierarchyController.TeamsController.removeSubteam(req,res);
  }]
};

//End Points for Teams:
var teamRoutes={
  'get /org/:orgId/teams/:teamId':[function(req,res,next){AuthorizationController.isAuthorized('Teams','read',req,res,next);},function(req,res){
    hierarchyController.TeamsController.getTeam(req,res);
  }],
  'get /org/:orgId/teams':[function(req,res,next){AuthorizationController.isAuthorized('Teams','listOrg',req,res,next);},function(req,res){
    hierarchyController.TeamsController.getTeamsOfOrganization(req,res);
  }],
  'post /org/:orgId/teams':[function(req,res,next){AuthorizationController.isAuthorized('Teams','create',req,res,next);},function(req,res){
    hierarchyController.TeamsController.createTeam(req,res);
  }],
  'post /org/:orgId/teams/:teamId':[function(req,res,next){AuthorizationController.isAuthorized('Teams','update',req,res,next);},function(req,res){
    hierarchyController.TeamsController.updateTeam(req,res);
  }],
  'del org/:orgId/teams/:teamId':[function(req,res,next){AuthorizationController.isAuthorized('Teams','delete',req,res,next);},function(req,res){
    hierarchyController.TeamsController.deleteTeam(req,res);
  }]
};

// End Points for Stores in team resources:
var storesRoutes={
  'get org/:orgId/teams/:teamId/stores':[function(req,res,next){AuthorizationController.isAuthorized('Stores','list',req,res,next);},function(req,res) {
    hierarchyController.TeamsController.getStoresOfTeam(req,res);
  }],
  'post /org/:orgId/teams/:teamId/stores':[function(req,res,next){AuthorizationController.isAuthorized('Stores','assign',req,res,next);},function(req,res){
    eCommerceEngine.StoreController.addStoreInTeam(req,res);
  }],

  'del /org/:orgId/teams/:teamId/stores/:storeId':[function(req,res,next){AuthorizationController.isAuthorized('Teams','update',req,res,next);},function(req,res){
    eCommerceEngine.StoreController.removeStoresFromTeam(req,res);
  }]
};

//End Points for LeaderBoard:
var leaderboardRoutes={
  'get org/:orgId/teams/:teamId/leaderboard':[function(req,res,next){AuthorizationController.isAuthorized('Users','read',req,res,next);},function(req,res) {
    leaderboardController.getTeamLeaderboard(req,res);
  }]
};
var rankRoutes={
  'get /org/:orgId/teams/:teamId/rank':[function(req,res,next){AuthorizationController.isAuthorized('Teams','read',req,res,next);},function(req,res){
    leaderboardController.getTeamRankOfPeriod(req,res);
  }]
};


var stuff=[leaderboardRoutes,storesRoutes,memberTeamsRoutes,subteamRoutes,teamRoutes,rankRoutes];
module.exports={
  initialize:function(server,handlers){
    stuff.forEach(function(routesObj){
      for(var property in routesObj)
      {
        methods=property.split(" ");
        if(handlers)
          eval("server."+methods[0]+"('"+methods[1]+"',"+handlers+","+routesObj[property][1]+');');
        else
          eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property][1]+');');
      }
    });
    console.log("Team Routes initialized");
  }
};
