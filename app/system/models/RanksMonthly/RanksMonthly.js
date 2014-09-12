var RankMonthlyCollection=require('./RanksMonthlyCollection.js');

var rankMonthly= {
    createRankMonthly:function(data){
        var rank=new RankMonthlyCollection(data);
        rank.createdAt=new Date();
        rank.save();
        return true;
    }

}
module.exports=rankMonthly;
