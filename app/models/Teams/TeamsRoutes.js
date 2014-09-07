var teamModel=require('./Teams.js');

var teamRoutes={
    'get /teams/:id':function(req,res){
        teamModel.getTeam(req.params.id,function(err,obj){
            console.log(err+obj);
        });
    },
    'post /teams':function(req,res){
        teamModel.createTeam(req.query);
    },
    'del /teams/:id':function(req,res){
        teamModel.deleteTeam(req.params.id,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    },
    'post /teams/:id':function(req,res){
        teamModel.updateTeamById(req.params.id,req.query,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    },
    'get /teams/:id':function(req,res){
        teamModel.getTeamLeader(req.params.id,function(err,obj){
            console.log(err+obj);
        });
    }

};