var ActionsCollection=require('./ActionsCollection.js');

var Action= {
    getActionDetail:function(client){
        ActionsCollection.find(({'_id' :client}),callback);
    }
}
module.exports=Action;