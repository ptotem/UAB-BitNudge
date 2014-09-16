var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var rankYearlySchema=new Schema({
    year:String,
    rank:Number,
    organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    createdAt:Date
});
var rankYear=mongoose.model('rankYear',rankYearlySchema);
module.exports=rankYear;
