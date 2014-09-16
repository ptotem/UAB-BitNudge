var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    quarter:Date,
    totalPoints:Number,
    orgId:Schema.Types.ObjectId,
    createdAt:Date
});
var actionSchemas=mongoose.model('userQuarterPoints',userPointsSchema);
module.exports=actionSchemas;
