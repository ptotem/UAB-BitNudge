var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var levelsSchema=new Schema({
  name:String,
  organizationId:{type:Schema.Types.ObjectId,ref:'organization'},
    calculationFn:String,
    createdAt :Date
});
var levels=mongoose.model('levels',levelsSchema);
module.exports=levels;
