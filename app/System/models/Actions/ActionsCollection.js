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
    created_at:Date

});
var actionSchemas=mongoose.model('action',actionSchema);
module.exports=actionSchemas;
