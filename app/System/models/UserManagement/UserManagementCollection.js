var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
  name:String,
  address:String,
  organizationId:Schema.Types.ObjectId,
  roles:[Schema.Types.ObjectId],
  email:String,
  passwordSalt:String,
  passwordHash:String,
  cash:Number,
  points:[Number],
  medals:[Schema.Types.ObjectId],
  items:[Schema.Types.ObjectId]
  // historicalPoints:Number
});
var User=mongoose.model('user',userSchema);
module.exports=User;
