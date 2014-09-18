var RevenueModel=require('../models/Products');
var AuthorizationController=('./AuthorizationController.js');
var RevenueController={
    revenueEntry:function(req,res){
        if(AuthorizationController.IsAuthorized(req.userId,Revenue,write)) {
            RevenueModel.createRevenue(req.data);
        }
    }
};
module.exports=RevenueController;
