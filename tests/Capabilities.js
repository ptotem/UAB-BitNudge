//model Users
db.capabilities.insert({name:"currentUserOnly",isAuthorized:"function(user,params,callback){ if(!params.userId&&!params.orgId) return callback(false); if(user.orgId==params.orgId&&user._id==params.userId) return callback(true); else return callback(false); }"});
db.capabilities.insert({name:"currentUserOrganization",isAuthorized:"function(user,params,callback){ if(user.orgId==params.orgId) return callback(true); else return callback(false);}"});
db.capabilities.insert({name:"currentUserTeams",isAuthorized:"function(user,params,callback){ if(!params.orgId&&!params.teamId) callback(false); if(params.orgId==user.orgId&&user.teams.indexOf(params.teamId)>=0) callback(true); else callback(false);}"});
}
db.roles.insert({name:"test",capabilities:[{model:"Users",capabilities:[{method:"get",capability:ObjectId("5437abe8f392420615a1f349")}]}]})
