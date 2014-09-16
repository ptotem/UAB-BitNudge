var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
  name:String,
  address:String,
  orgId:Schema.Types.ObjectId,
  roles:[{type:Schema.Types.ObjectId,rel:'roles'}],
  email:String,
  passwordSalt:String,
  passwordHash:String,
  medals:[{type:Schema.Types.ObjectId,rel:'medals'}],
  items:[{type:Schema.Types.ObjectId,rel:'storeItems'}],
  level:Number,
  totalPoints:Number,
  totalCash:Number,
  goals:[{type:Schema.Types.ObjectId,rel:'goals'}],
  clients:[{type:Schema.Types.ObjectId,rel:'clients'}],
  followers:[{type:Schema.Types.ObjectId,rel:'users'}],
  createdAt:Date
});
var User=mongoose.model('user',userSchema);
module.exports=User;
