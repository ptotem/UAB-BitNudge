var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user'},
     points: {
            month:String,
            transaction_id:{type:Schema.Types.ObjectId,ref:'organization'},
            points:String
            },
    createdAt:Date

});
var actionSchemas=mongoose.model('action',userPointsSchema);
module.exports=actionSchemas;
