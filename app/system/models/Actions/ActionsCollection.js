var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/uab');
var Schema=mongoose.Schema;
var actionSchema=new Schema({
    capabilities:[{model:String,permission:{
        read:Boolean,
        write:Boolean,
        update:Boolean,
        delete:Boolean,
        assign:Boolean,
        approve:Boolean
    }}],
    createdAt:Date

});



var actionSchemas=mongoose.model('action',actionSchema);
module.exports=actionSchemas;

