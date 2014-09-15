var RevenueModel=require('../../models/Products');
var AuthorizationController=('../../controllers/AuthorizationController.js');
var RevenueController={

    revenueEntry:function(req,res,callback){
        if(AuthorizationController.IsAuthorized(req.userId,Revenue,write,callback)) {
            RevenueModel.createRevenue(req.data, callback);
        }
    }
};
module.exports=RevenueController;