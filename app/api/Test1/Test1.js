var UserModel=require('../../system/models/Users').Users;
var UserCollection=require('../../system/models/Users/UsersCollection.js');

var userTags={
//    'get /orgtags':function(req,res){
//        OrgTagsCollection.find({},function(err,tags){
//            if(err) res.send(err);
//            else res.send(tags);
//        });
//    },
//    'post /org/:orgId/users/:userId/orgtags':function(req,res){
//        var orgtags=req.body.orgtags;
//        if(!orgtags||!orgtags instanceof Array)
//            res.send("please set the orgtags field of body as the id of the manager. It must be an array");
//        else UserCollection.update({_id:req.params.userId},{$set:{orgtags:orgtags}},function(err,obj){
//            if(err) res.send(err);
//            else res.send("success");
//        });
//    },
    'get /org/:orgId/users/:userId/actions':function(req,res){
        UserCollection
            .findOne({_id: req.params.userId })
            .populate('transactionMaster') .exec(function (err, story) {
                if (err) return handleError(err);
                console.log( story.transactionMaster.name);
                // prints "The creator is Aaron"
            })
    },

    'get /org/:orgId/users/:userId/actions_downLine':function(req,res){
        UserCollection.findOne({reportsTo: req.params.userId }) .populate('reportsTo') .exec(function (err, story) {
                if (err) return handleError(err);
                var actions=story.reportsTo;
                console.log(actions.name);
                res.send(actions.name);
            })
    },
    'get /org/:orgId/users/:userId/actions_downLine_points':function(req,res){
        UserCollection.findOne({reportsTo: req.params.userId }) .populate('reportsTo') .exec(function (err, story) {
            if (err) return handleError(err);
            var actions=story.reportsTo;
            console.log(actions.totalPoints);
            res.send(actions.totalPoints);
        })
    },
    'get /org/:orgId/transactions/:transactionId/users':function(req,res){
        UserCollection.findOne({roles: req.params.transactionId }) .populate('roles') .exec(function (err, story) {
            if (err) return handleError(err);
            var actions=story.roles;
            console.log(actions.name);
            res.send(actions.name);
        })
    },
    'get /org/:orgId/users/:userId/uplinkuser':function(req,res){
        var users=[];
        var recur=function(userId){
            UserModel.getUser(userId,"","","",function(err,user){
                if(err) res.send(err);
                users.push(user);
                if(user&&user.reportsTo){
                    recur(user.reportsTo);
                }
                else res.send(users);
            });
        };
        recur(req.params.userId);
    },
    'get /org/:orgId/users/:userId/downlinkuser':function(req,res){
        var users=[];
        UserModel.getUser(req.params.userId,"","","",function(err,user1){
            users.push(user1);
        });
        var recur=function(userId){
            UserCollection.findOne({reportsTo:userId},function(err,user){
                if(err) res.send(err);
                if(!user) res.send(users);
                users.push(user);
                if(user&&user.reportsTo){
                    recur(user._id);
                }
                else res.send(users);
            });
        };
        recur(req.params.userId);
    }

};
var routes_data=[userTags];
module.exports={
    initialize:function(server,handlers){
        routes_data.forEach(function(routesObj){
            for(var property in routesObj) {
                methods=property.split(" ");
                if(handlers)
                    eval("server."+methods[0]+"('"+methods[1]+"',"+handlers+","+routesObj[property]+');');
                else
                    eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
            }
        });
        console.log("Test1 Routes initialized");
    }
};