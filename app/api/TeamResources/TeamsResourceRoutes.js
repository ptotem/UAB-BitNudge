var leaderboardController=require('../../system/controllers/LeaderboardController.js');
var eCommerceEngine=require('../../system/controllers/eCommerceEngine');
var hierarchyController=require('../../system/controllers/HierarchyEngine');


// End Points for User in Team Resources:
var memberTeamsRoutes={
    'get org/:orgId/teams/:teamId/members':function(req,res) {
        hierarchyController.TeamsController.getMembersOfTeam(req,res);
    },
    'post /org/:orgId/teams/:teamId/members':function(req,res){
      hierarchyController.TeamsController.addMembersToTeam(req,res);
    },
    'del /org/:orgId/teams/:teamId/members/:userId':function(req,res){
      hierarchyController.TeamsController.removeMemberFromTeam(req,res);
    }
};

var subteamRoutes={
    'post /org/:orgId/teams/:teamId/subteams':function(req,res){
      hierarchyController.TeamsController.addSubteam(req,res);
    },
    'get /org/:orgId/teams/:teamId/subteams':function(req,res){
      hierarchyController.TeamsController.getSubteams(req,res);
    },
    'del /org/:orgId/teams/:teamId/subteams/:subteamId':function(req,res){
      hierarchyController.TeamsController.removeSubteam(req,res);
    }
};

//End Points for Teams:
var teamRoutes={
    'get /org/:orgId/teams/:teamId':function(req,res){
      hierarchyController.TeamsController.getTeam(req,res);
    },
    'get /org/:orgId/teams':function(req,res){
        hierarchyController.TeamsController.getTeamsOfOrganization(req,res);
    },
    'post /org/:orgId/teams':function(req,res){
      hierarchyController.TeamsController.createTeam(req,res);
    },
    'post /org/:orgId/teams/:teamId':function(req,res){
      hierarchyController.TeamsController.updateTeam(req,res);
    },
    'del org/:orgId/teams/:teamId':function(req,res){
      hierarchyController.TeamsController.deleteTeam(req,res);
    }
};

// End Points for Stores in team resources:
var storesRoutes={
    'get org/:orgId/teams/:teamId/stores':function(req,res) {
      hierarchyController.TeamsController.getStoresOfTeam(req,res);
    },
    'post /org/:orgId/teams/:teamId/stores':function(req,res){
      eCommerceEngine.StoreController.addStoreInTeam(req,res);
    },

    'del /org/:orgId/teams/:teamId/stores/:storeId':function(req,res){
      eCommerceEngine.StoreController.removeStoresFromTeam(req,res);
    }
};

//End Points for LeaderBoard:
var leaderboardRoutes={
    'get org/:orgId/teams/:teamId/leaderboard':function(req,res) {
        leaderboardController.getTeamLeaderboard(req,res);
    }
};
var rankRoutes={
    'get /org/:orgId/teams/:teamId/rank':function(req,res){
        leaderboardController.getTeamRankOfPeriod(req,res);
    }
};


var stuff=[leaderboardRoutes,storesRoutes,memberTeamsRoutes,subteamRoutes,teamRoutes,rankRoutes];
module.exports={
  initialize:function(server){
    stuff.forEach(function(routesObj){
      for(var property in routesObj)
      {
        methods=property.split(" ");
        eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
      }
    });
    console.log("Team Routes initialized");
  }
};
