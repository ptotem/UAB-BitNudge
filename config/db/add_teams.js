var fs=require('fs');
var TeamsModel=require('../../app/system/models/Teams');
var UsersCollection=require('../../app/system/models/Users/UsersCollection.js');
var test=process.argv;
var mongoose=require('mongoose');
var readline=require('readline');
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
        object.membersTemp=[];
        console.log(object.members);
        async.each(object.members,
          function(member,callback){
            UsersCollection.findOne({email:member,orgId:orgObjId},function(err,user){
              object.membersTemp.push(user._id);
              callback();
            });
          },
          function(err){
            if(err) console.log(err);
            object.members=object.membersTemp;
            delete object.membersTemp;
            TeamsModel.createTeam(orgObjId,object,function(err,team){
                if(err) console.log(err);
                console.log("done writing to database");
                console.log(team);
            });
        });
      });
    }
  });
}
