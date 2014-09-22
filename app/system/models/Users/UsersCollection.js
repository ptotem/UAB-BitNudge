var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
  // _id:String,
  name:String,
  address:String,
    // orgId:String,
  orgId:{type:Schema.Types.ObjectId,rel:'organizations'},
  roles:[{type:Schema.Types.ObjectId,rel:'roles'}],
  email:String,
  passwordSalt:String,
  passwordHash:String,
  medals:[{type:Schema.Types.ObjectId,rel:'medals'}],
  items:[{type:Schema.Types.ObjectId,rel:'storeItems'}],
  level:Number,
  profileCompleteness:Number,
  designation:String,
  totalPoints:Number,
  totalCash:Number,
  // goals:[{type:Schema.Types.ObjectId,rel:'goals'}],
  // clients:[{type:Schema.Types.ObjectId,rel:'clients'}],
  // revenue:Number,
  followers:[{type:Schema.Types.ObjectId,rel:'users'}],
  createdAt:Date,
    rank:Number
});
var User=mongoose.model('users',userSchema);
module.exports=User;
