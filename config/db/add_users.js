var fs=require('fs');
var UsersModel=require('../../app/system/models/Users').Users;
var test=process.argv;
var mongoose=require('mongoose');
var readline=require('readline');
var NudgeMailbox=require('../../app/system/models/NudgeMailbox');
var NudgeChat=require('../../app/system/models/NudgeChat');
var NotificationCenterModel=require('../../app/system/models/NotificationCenter');
var OrganizationalModel=require('../../app/system/models/Organizations');
var UserPeriodPointsModel=require('../../app/system/models/UserPeriodPoints');
var async=require('async');
test.shift();
test.shift();
var orgObjId;
if(!test[0]){
  console.log("Please enter the json file as a command line argument");
  process.exit();
}
if(!test[1]){
  var rl=readline.createInterface({input:process.stdin,output:process.stdout});
  rl.question("Please enter the organizationId",function(orgId){
    try{
      orgObjId=mongoose.Types.ObjectId(orgId);
    }
    catch(e){
      console.log("Not a valid ObjectId");
      process.exit();
    }
    later();
  });
}
else{
  try{
    orgObjId=mongoose.Types.ObjectId(test[1]);
  }
  catch(e){
    console.log("Not a valid ObjectId");
    process.exit();
  }
  later();
}
function later(){
  mongoose.connect('mongodb://localhost/uabTest');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log("db working");
  });
  fs.readFile(test[0], {encoding:"UTF-8"},function (err, data) {
    if (err) throw err;
    var objects=JSON.parse(data);
    if(objects instanceof Array){
      objects.forEach(function(object){
        UsersModel.createUser(orgObjId,object,function(err,user){
          if(user){
            async.parallel([
              function(callback){
                NudgeMailbox.createNudgeMailbox(orgObjId,user._id,{},callback);
              },
              function(callback){
                NudgeChat.createNudgeChat(orgObjId,user._id,{},callback);
              },
              function(callback){
                NotificationCenterModel.createNotificationCenter(orgObjId,user._id,{},callback);
              },
              function(callback){
                UserPeriodPointsModel.createUserPeriodPoints(orgObjId,user._id,{},callback);
              }],
              function(err,results){
                if(err) console.log(err);
                console.log("done writing to database");
                console.log(user);
              }
              );
          }
          else console.log(err);
        });
      });
    }
  });
}
