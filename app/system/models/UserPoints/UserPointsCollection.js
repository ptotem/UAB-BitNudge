var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user'},
     points: {
            month:String,
            transaction_id:{type:Schema.Types.ObjectId,ref:'transaction'},
            points:String
            },
    createdAt:Date

});
var userPoint=mongoose.model('action',userPointsSchema);
module.exports=userPoint;
