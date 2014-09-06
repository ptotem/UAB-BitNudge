var model=require('./Levels.js');
var routes={
  'post /levels/:orgId':function(req,res){
    model.createLevel(req.params.orgId,req.query.rangeMax,req.query.rangeMin);
  },
  'get /levels/:orgId':function(req,res){
    model.getLevelsOfOrganization(req.params.orgId,function(err,obj){
      if(err) res.send(err);
      else res.send(obj);
    });
  }
}
module.exports=routes;
