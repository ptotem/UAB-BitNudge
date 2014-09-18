// End Points for User in Team Resources:
var hierarchyModel=require('../../system/controllers/HierarchyEngine');
var memberTeamsRoutes={
    'get org/:orgId/teams/:teamId/users':function(req,res) {
        hierarchyModel.TeamsController.getTeamOrg(req,res,function(err,obj){
            console.log(err+obj);
        });
    },
    'post /org/:orgId/teams/:teamId/members':function(req,res){
        hierarchyModel.TeamsController.addMembersToTeam(req,res);
    },
    'get /org/:orgId/teams/:teamId':function(req,res){
      hierarchyModel.TeamsController.getTeam(req,res);
    },
    'del /org/:orgId/teams/:teamId/members/:userId':function(req,res){
        hierarchyModel.TeamsController.removeSubteam(req,res);
    },
    'post /org/:orgId/teams/:teamId/subteams':function(req,res){
        hierarchyModel.TeamsController.addSubteam(req,res);
    },
    'get /org/:orgId/teams/:teamId/subteams':function(req,res){
        hierarchyModel.TeamsController.getSubteams(req,res);
    },
    'del /org/:orgId/teams/:teamId/subteams/:subteamId':function(req,res){
        hierarchyModel.TeamsController.removeSubteam(req,res);
    },
    // 'del org/:orgId/team/:teamId/users/userId':function(req,res){
    //     hierarchyModel.TeamsController.deleteTeamFromOrg(req.params.teamId,function(err,obj){
    //         if(err){
    //           res.send(err);
    //           return handleError(err);
    //         }
    //         else res.send(obj);
    //     });
    // }
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

var pointsEngine=require('../../system/controllers/PointsEngine');
var rankRoutes={
    'post /org/:orgId/teams/:teamId/rank':function(req,res){
        pointsEngine.RankController.getTeamRank(req,res);
    }
};


//End Points For Level in team resources:
// var levelModel=require('../../system/controllers/eCommerceEngine/levelController.js');
// var levelModelRoutes={
//     'post /org/:orgId /teams/:teamId/levels':function(req,res){
//         storeModel.assignLevelToTeams(req,res);
//     }
// };

//End Points For Goals:
var goalModel=require('../../system/controllers/GoalsController.js');
var goalModelRoutes={
    'post /org/:orgId/teams/:teamId/goals':function(req,res){
        storeModel.assignGoalToTeam(req,res);
    }
};


//End Points for LeaderBoard:
var leaderboardModel=require('../system/controllers/PointsEngine/LeaderBoard.js');
var leaderboardModelRoutes={
    'get org/:orgId/teams/:teamId/leaderboard':function(req,res) {
        leaderboardModel.getTeamLeaderboard(req,res);
    }
};


var stuff=[/* leaderboardModelRoutes */,memberTeamsRoutes,rankRoutes,storesRoutes/* ,levelModelRoutes *//* ,goalModelRoutes */];
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
