var mongoose=require('mongoose');
var Schema=mongoose.Schema;
// var SALT_WORK_FACTOR=10;
var userSchema=new Schema({
  name:String,
  address:String,
  orgId:{type:Schema.Types.ObjectId,rel:'organizations'},

  roles:[{type:Schema.Types.ObjectId,rel:'roles'}],
  email:String,
  password:String,
    images:String,
  role:{type:Schema.Types.ObjectId,rel:'roles'},
  email:String,
  password:String,  

  // passwordSalt:String,
  // passwordHash:String,
  medals:[{type:Schema.Types.ObjectId,rel:'medals'}],
  items:[{time:Date,item:{type:Schema.Types.ObjectId,rel:'storeItems'}}],
  points:[{
    pointsEarned:Number,
    date:Date,
    type:String,
    from:Schema.Types.ObjectId
  }],
  teams:[{type:Schema.Types.ObjectId,rel:'teams'}],
  level:Number,
  profileCompleteness:Number,
  designation:String,
  totalPoints:Number,
  totalCash:Number,
  transactions:[{
    transactionMaster:{type:Schema.Types.ObjectId,rel:'transactionMasters'},
    date:Date,

    target:Number,
    approved:Boolean,
    tags:[{type:Schema.Types.ObjectId,ref:'tags'}]
  }],
  goals:[{
    goalMaster:{type:Schema.Types.ObjectId,ref:'goalMasters'},
    tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    startDate:Date,
    endDate:Date,
    points:Number,
    completed:Boolean,
    transactionsDone:Number,
    totalTransactions:Number,
    createdAt:Date,
    percentage:Number,
    transactions:[{
      transactionMaster:{type:Schema.Types.ObjectId,ref:'transactionMasters'},
      target:Number,
      currentValue:Number,
      done:Boolean
    }],

    // target:Number,
    approved:Boolean,
    keyParamValue:Number,
    tags:[{tag:{type:Schema.Types.ObjectId,ref:'tags'},value:Number}]
  }],
  goals:[{
    goalMaster:{type:Schema.Types.ObjectId,ref:'goalMasters'},
    // tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
    criteria:String,
    startDate:Date,
    endDate:Date,
    // points:Number,
    completed:Boolean,
    // transactionsDone:Number,
    // totalTransactions:Number,
    createdAt:Date,
    percentage:Number,
    subgoals:[{
      subgoal:{type:Schema.Types.ObjectId,rel:'subgoals'},
      done:Boolean
    }],
    action:{
      // transactionMaster:{type:Schema.Types.ObjectId,ref:'transactionMasters'},
      target:Number,
      currentValue:Number
      // done:Boolean
    }
  }],
  followers:[{type:Schema.Types.ObjectId,rel:'users'}],
  followerCount:Number,
  createdAt:Date,
  // rank:Number,
  quote:String,
  lastLogin:Date,
      //this stuff is for testing shit.
  reportsTo:{type:Schema.Types.ObjectId,ref:'users'},
  orgtags:[{type:Schema.Types.ObjectId,ref:'orgTags'}]
});
var User=mongoose.model('users',userSchema);
module.exports=User;
