var RankMonthlyCollection=require('./RanksYearlyCollection.js');

var rankYearly= {
    createRankYearly:function(data){
        var rank=new RankMonthlyCollection(data);
        rank.createdAt=new Date();
        rank.save();
        return true;
    }

}
module.exports=rankYearly;
