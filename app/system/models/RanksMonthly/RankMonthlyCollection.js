var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var rankMonthlySchema=new Schema({
    month:String,
    rank:Number,
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var rankMonth=mongoose.model('rankMonth',rankMonthlySchema);
module.exports=rankMonth;
