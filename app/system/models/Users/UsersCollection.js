var mongoose=require('mongoose');
var Schema=mongoose.Schema;
// var SALT_WORK_FACTOR=10;
var userSchema=new Schema({
    name:String,
    address:String,
    image:String,
    orgId:{type:Schema.Types.ObjectId,rel:'organizations'},
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
        // target:Number,
        approved:Boolean,
        keyParamValue:Number,
        tags:[{tag:{type:Schema.Types.ObjectId,ref:'tags'},tagName:String}]
    }],
    goals:[{
        // goalMaster:{type:Schema.Types.ObjectId,ref:'goalMasters'},
        // tags:[{type:Schema.Types.ObjectId,ref:'tags'}],
        criteria:String,
        startDate:Date,
        endDate:Date,
        completed:Boolean,
        createdAt:Date,
        percentage:Number,
        pointsFn:String,
        subgoals:[{
            subgoal:{type:Schema.Types.ObjectId,rel:'goalMasters'},
            allowedTransactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
            currentValue:Number,
            targetValue:Number,
            done:Boolean
        }],
        action:{
            allowedTransactions:[{type:Schema.Types.ObjectId,ref:'transactionMasters'}],
            targetValue:Number,
            currentValue:Number,
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
