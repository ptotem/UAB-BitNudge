
// End Points For Users:

var userModel=require('../../system/controllers/AuthorizationController.js');
var userModelRoutes={
    'get org/:orgId/users/:id':function(req,res) {
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
    'del org/:orgId/users/:id':function(req,res){
        userModel.deleteUser(req.params.id,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    },
    'post /org/:orgId/users/:id':function(req,res){
        userModel.updateUserById(req.params.id,req.query,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }
}

 // End Points for Roles:

var roleModelRoutes={
    'get org/:orgId/roles/:id':function(req,res) {
        userModel.getuser(req.id),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /roles':function(req,res){
        userModel.createUser(req.query);
    },
    'post/org/:orgId /roles/:Id':function(req,res){
        userModel.createUser(req.query);
    },
    'del org/:orgId/users/:id':function(req,res){
        userModel.deleteUser(req.params.id,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }
}

// End Points for Stores

var storeModelRoutes={
    'get org/:orgId/stores/:id':function(req,res) {
        userModel.getuser(req.id),function(err,obj){
            console.log(err+obj);
        }
    },
    'get org/:orgId/teams/:teamId/stores/:id':function(req,res) {
        userModel.getuser(req.id),function(err,obj){
            console.log(err+obj);
        }
    },
    'post/org/:orgId /stores':function(req,res){
        userModel.createUser(req.query);
    },
    'post/org/:orgId/teams/:teamId/stores':function(req,res){
        userModel.createUser(req.query);
    },
    'post/org/:orgId /stores/:id':function(req,res){
        userModel.createUser(req.query);
    },
    'del org/:orgId/stores/:id':function(req,res){
        userModel.deleteUser(req.params.id,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    },
    'post /org/:orgId/stores/:id':function(req,res){
        userModel.updateUserById(req.params.id,req.query,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }

}

