
// End Points for User in Team Resources:

var teamModel=require('../../system/controllers/HierarchyEngine/HierarchyEngine.js');
var memberTeamsRoutes={
    'get org/:orgId/teams/:teamId/users':function(req,res) {
        teamModel.getTeamOrg(req,res),function(err,obj){
            console.log(err+obj);
        }
    },

    'post/org/:orgId /teams/:teamId/users':function(req,res){
        teamModel.addMembersToTeam(req,res);
    },
    'del org/:orgId/team/:teamId/users/userId':function(req,res){
        teamModel.deleteTeamFromOrg(req.params.teamId,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }
}

// End Points for Stores in team resources:

var storeModel=require('../../system/controllers/eCommerceEngine/StoreController.js');
var storesRoutes={
    'get org/:orgId/teams/:teamId/stores':function(req,res) {
        storeModel.getStoreTeam(req,res),function(err,obj){
            console.log(err+obj);
        }
    },

    'post/org/:orgId /teams/:teamId/stores':function(req,res){
        storeModel.addStoreInTeam(req,res);
    }
    // Delete Store From Teams:function Name : removeStoreFromTeam
}

// End Points For Rank in team resources:(not Completed)

 var rankModel=require('../../system/controllers/eCommerceEngine/StoreController.js');
var rankRoutes={
    'get org/:orgId/teams/:teamId/ranks':function(req,res) {
        storeModel.getStoreTeam(req,res),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /teams/:teamId/stores':function(req,res){
        storeModel.addStoreInTeam(req,res);
    }
    // Delete Store From Teams:function Name : removeStoreFromTeam

}


//End Points For Level in team resources:
