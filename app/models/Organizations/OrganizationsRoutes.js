var organizationModel=require('./Organizations.js');

var organizationRoutes={
    'get /organizations/:id':function(req,res){
        organizationModel.getOrganization(req.params.id,function(err,obj){
            console.log(err+obj);
        });
    },
    'post /organizations':function(req,res){
        organizationModel.createOrganization(req.query);
    },
    'del /organizations/:id':function(req,res){
        organizationModel.deleteOrganization(req.params.id,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    },
    'post /organizations/:id':function(req,res){
        organizationModel.updateOrgById(req.params.id,req.query,function(err,obj){
            if(err)
                res.send(err);
            else res.send(obj);
        });
    }

};