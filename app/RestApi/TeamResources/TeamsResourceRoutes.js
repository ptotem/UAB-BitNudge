// End Points for User in Team Resources:
var hierarchyModel=require('../../system/controllers/HierarchyEngine');
var memberTeamsRoutes={
    'get org/:orgId/teams/:teamId/members':function(req,res) {
      hierarchyModel.TeamsController.getMembersOfTeam(req,res);
    },
    'post /org/:orgId/teams/:teamId/members':function(req,res){
      hierarchyModel.TeamsController.addMembersToTeam(req,res);
    },
    'del /org/:orgId/teams/:teamId/members/:userId':function(req,res){
      hierarchyModel.TeamsController.removeMemberFromTeam(req,res);
    }
};
var subteamRoutes={
    'post /org/:orgId/teams/:teamId/subteams':function(req,res){
      hierarchyModel.TeamsController.addSubteam(req,res);
    },
    'get /org/:orgId/teams/:teamId/subteams':function(req,res){
      hierarchyModel.TeamsController.getSubteams(req,res);
    },
    'del /org/:orgId/teams/:teamId/subteams/:subteamId':function(req,res){
      hierarchyModel.TeamsController.removeSubteam(req,res);
    }
};

//End Points for Teams:

var teamModelRoutes={
    'get /org/:orgId/teams/:teamId':function(req,res){
      hierarchyModel.TeamsController.getTeam(req,res);
    },
    'get /org/:orgId/teams':function(req,res){
      hierarchyModel.TeamsController.getTeamsOfOrganization(req,res);
    },
    'post /org/:orgId/teams':function(req,res){
      hierarchyModel.TeamsController.createTeam(req,res);
    },
    'post /org/:orgId/teams/:teamId':function(req,res){
      hierarchyModel.TeamsController.updateTeam(req,res);
    },
    'del org/:orgId/team/:teamId':function(req,res){
      hierarchyModel.TeamsController.deleteTeam(req,res);
    }
};

// End Points for Stores in team resources:
var eCommerceEngine=require('../../system/controllers/eCommerceEngine');
var storesRoutes={
    'get org/:orgId/teams/:teamId/stores':function(req,res) {
      eCommerceEngine.StoreController.getStoresOfTeam(req,res);
    },
    'post /org/:orgId/teams/:teamId/stores':function(req,res){
      eCommerceEngine.StoreController.addStoreInTeam(req,res);
    },
    'del /org/:orgId/teams/:teamId/stores/:storeId':function(req,res){
      eCommerceEngine.StoreController.removeStoresFromTeam(req,res);
    }
};

// End Points For Rank in team resources:(not Completed)

// var pointsEngine=require('../../system/controllers/PointsEngine');
// var rankRoutes={
//     'post /org/:orgId/teams/:teamId/rank':function(req,res){
//         pointsEngine.RankController.getTeamRank(req,res);
//     }
// };


//End Points For Goals:
// var goalModel=require('../../system/controllers/GoalsController.js');
// var goalModelRoutes={
//     'post /org/:orgId/teams/:teamId/goals':function(req,res){
//         storeModel.assignGoalToTeam(req,res);
//     }
// };


//End Points for LeaderBoard:
var leaderboardModel=require('../../system/controllers/LeaderboardController.js');
var leaderboardModelRoutes={
    'get org/:orgId/teams/:teamId/leaderboard':function(req,res) {
        leaderboardModel.getTeamLeaderboard(req,res);
    }
};


var stuff=[/* leaderboardModelRoutes */,memberTeamsRoutes,subteamRoutes,teamModelRoutes/*,rankRoutes,storesRoutes/* ,levelModelRoutes *//* ,goalModelRoutes */];
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
