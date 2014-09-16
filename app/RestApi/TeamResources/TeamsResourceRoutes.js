
// End Points for User in Team Resources:

var teamModel=require('../../system/controllers/HierarchyEngine/HierarchyEngine.js');
var memberTeamsRoutes={
    'get org/:orgId/teams/:teamId/users':function(req,res) {
        teamModel.getTeamOrg(req,res,function(err,obj){
            console.log(err+obj);
        });
    },

    'post /org/:orgId /teams/:teamId/users':function(req,res){
        teamModel.addMembersToTeam(req,res);
    },
    'del org/:orgId/team/:teamId/users/userId':function(req,res){
        teamModel.deleteTeamFromOrg(req.params.teamId,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }
};

// End Points for Stores in team resources:

var storeModel=require('../../system/controllers/eCommerceEngine/StoreController.js');
var storesRoutes={
    'get org/:orgId/teams/:teamId/stores':function(req,res) {
        storeModel.getStoreTeam(req,res,function(err,obj){
            console.log(err+obj);
        });
    },

    'post /org/:orgId /teams/:teamId/stores':function(req,res){
        storeModel.addStoreInTeam(req,res);
    }
    // Delete Store From Teams:function Name : removeStoreFromTeam
};

// End Points For Rank in team resources:(not Completed)

 var rankModel=require('../../system/controllers/eCommerceEngine/StoreController.js');
var rankRoutes={
    'post /org/:orgId /teams/:teamId/ranks':function(req,res){
        storeModel.addrankToTeam(req,res);
    }
    // Delete Store From Teams:function Name : removeStoreFromTeam

};


//End Points For Level in team resources:
// var levelModel=require('../../system/controllers/eCommerceEngine/levelController.js');
// var levelModelRoutes={
//     'post /org/:orgId /teams/:teamId/levels':function(req,res){
//         storeModel.assignLevelToTeams(req,res);
//     }
// };

//End Points For Goals:
// var goalModel=require('../system/controllers/goalController.js');
// var goalModelRoutes={
//     'get org/:orgId/teams/:teamId/goals':function(req,res) {
//         storeModel.getGoalOfTeam(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     },
//
//     'post /org/:orgId /teams/:teamId/stores':function(req,res){
//         storeModel.assignGoalToTeam(req,res);
//     }
// };


//End Points for LeaderBoard:
// var leaderBoardModel=require('../system/controllers/PointsEngine/LeaderBoard.js');
// var leaderBoardModelRoutes={
//     'get org/:orgId/teams/:teamId/leaderBoard':function(req,res) {
//         leaderBoardModel.getLeaderBoardOfTeam(req,res,function(err,obj){
//             console.log(err+obj);
//         });
//     }
// };
module.exports=[/* leaderBoardModelRoutes */,memberTeamsRoutes,rankRoutes,storesRoutes/* ,levelModelRoutes *//* ,goalModelRoutes */];
