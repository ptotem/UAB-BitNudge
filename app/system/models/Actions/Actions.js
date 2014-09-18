var ActionsCollection=require('./ActionsCollection.js');

var Action= {
    initialize: function (server) {
        console.log("Action initialized");
    },
    getActionDetail:function(client){
        ActionsCollection.find(({'_id' :client}),callback);
    }
}
module.exports=Action;