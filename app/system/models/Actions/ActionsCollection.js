var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var actionSchema=new Schema({
    capabilities:[{model:String,permission:{
        read:String,
        write:String,
        update:String,
        delete:String,
        assign:String,
        approve:String
    }}],
    createdAt:Date

});
var actionSchemas=mongoose.model('action',actionSchema);
module.exports=actionSchemas;
