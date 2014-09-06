var model=require('./Store.js');
var routes={
  'post /stores/:orgId':function(req,res){
    //do some validation. Make sure only good fields are passed.
    model.createStore(req.query);
  },
  'post /stores/:teamId':function(req,res){
    //do some validation. Make sure only good fields are passed.
    model.createStore(req.query);
  },
  'get /stores/:orgId':function(req,res){
    model.getStoresOfOrganization(req.params.orgId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  'get /stores/:teamId':function(req,res){
    model.getStoresOfTeam(req.params.teamId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  },
  'post /stores/:storeId':function(req,res){
    model.addItemToStore(req.params.storeId,req.query,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  }
}
module.exports=routes;
