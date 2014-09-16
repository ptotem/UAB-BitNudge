var TransactionMasterCollection=require('./TransactionMasterCollection.js');

var TransactionMaster={
  createTransactionMaster:function(organizationId,data){
    data.orgId=organizationId;
    data.createdAt=new Date();
    var l=new TransactionMasterCollection(data);
    l.save();
    return true;
  },
  getTransactionMaster:function(id,fields,options,populationData,callback){
    TransactionMasterCollection.findOne({_id:id},fields,options,callback);
  },
  getPoints:function(id,params,callback){
    TransactionMasterCollection.findOne({_id:id},function(err,obj){
      if(err) return callback(err,0);
      //change the 10 to the evaluated based on params;
      // else return callback(err,10);
      else {
        var ans=TransactionMaster.evaluatePointsFunction(obj.format,obj.pointsFn);
        return callback(null,ans);
      }
    });
  },
  evaluatePointsFunction:function(format,points){
    return 10;
  }
  // getAllTransactionMastersOfOrganization:function(orgId,callback){
  //   TransactionMasterCollection.find({_id:id},callback);
  // }
};
