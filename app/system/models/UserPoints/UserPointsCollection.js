var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userPointsSchema=new Schema({
    user_id:{type:Schema.Types.ObjectId,ref:'user'},
     points: {
            month:String,
            transaction_id:{type:Schema.Types.ObjectId,ref:'organization'},
            points:String
            },
    created_at:Date

});
var actionSchemas=mongoose.model('action',userPointsSchema);
module.exports=actionSchemas;
