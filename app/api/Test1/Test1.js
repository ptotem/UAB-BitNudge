var UserModel=require('../../system/models/Users').Users;
var UserCollection=require('../../system/models/Users/UsersCollection.js');

var userTags={
    'get /org/:orgId/users/:userId/actions':function(req,res){
        UserCollection
            .findOne({_id: req.params.userId })
            .populate('transactions') .exec(function (err, actions) {
                if (err) return handleError(err);
                console.log( actions.transactions.name);
                // prints "The creator is Aaron"
            })
    },

    'get /org/:orgId/users/:userId/downlineactions':function(req,res){
        UserCollection.findOne({reportsTo: req.params.userId }) .populate('reportsTo') .exec(function (err, downlineactions) {
                if (err) return handleError(err);
                var actions=downlineactions.reportsTo;
                console.log(actions.name);
                res.send(actions.name);
            })
    },
    'get /org/:orgId/users/:userId/downLinepoints':function(req,res){
        UserCollection.findOne({reportsTo: req.params.userId }) .populate('reportsTo') .exec(function (err, downlinepoints) {
            if (err) return handleError(err);
            var actions=downlinepoints.reportsTo;
            console.log(actions.totalPoints);
            res.send(actions.totalPoints);
        })
    },
    'get /org/:orgId/transactions/:transactionId/users':function(req,res){
        UserCollection.findOne({roles: req.params.transactionId }) .populate('transactions') .exec(function (err, users) {
            if (err) return handleError(err);
            var actions=users.transactions;
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