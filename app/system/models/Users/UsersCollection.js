var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
  name:String,
  address:String,
  orgId:{type:Schema.Types.ObjectId,rel:'organizations'},
  roles:[{type:Schema.Types.ObjectId,rel:'roles'}],
  email:String,
  passwordSalt:String,
  passwordHash:String,
  medals:[{type:Schema.Types.ObjectId,rel:'medals'}],
  items:[{time:Date,item:{type:Schema.Types.ObjectId,rel:'storeItems'}}],
  level:Number,
  profileCompleteness:Number,
  designation:String,
  totalPoints:Number,
  totalCash:Number,
  goals:[{
    goalMaster:{type:Schema.Types.ObjectId,ref:'goalMasters'},
    tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    startDate:Date,
    endDate:Date,
    points:Number,
    completed:Boolean,
    transactionsDone:Number,
    totalTransactions:Number,
    percentage:Number,
    transactions:[{
      transactionMaster:{type:Schema.Types.ObjectId,ref:'transactionMasters'},
      target:Number,
      currentValue:Number,
      done:Boolean
    }]
  }],
  followers:[{type:Schema.Types.ObjectId,rel:'users'}],
  createdAt:Date,
    rank:Number
});
var User=mongoose.model('users',userSchema);
module.exports=User;
