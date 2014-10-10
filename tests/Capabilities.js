//model Users
db.capabilities.insert({name:"currentUserOnly",isAuthorized:"function(user,params,callback){ if(!params.userId&&!params.orgId) return callback(false); if(user.orgId==params.orgId&&user._id==params.userId) return callback(true); else return callback(false); }"});
db.roles.insert({name:"test",capabilities:[{model:"Users",capabilities:[{method:"get",capability:ObjectId("5437abe8f392420615a1f349")}]}]})
