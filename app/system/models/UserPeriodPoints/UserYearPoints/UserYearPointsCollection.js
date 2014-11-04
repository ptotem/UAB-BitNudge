var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    year:Date,
    totalPoints:Number,
    orgId:Schema.Types.ObjectId,
    createdAt:Date
});
var actionSchemas=mongoose.model('userYearPoints',userPointsSchema);
module.exports=actionSchemas;
