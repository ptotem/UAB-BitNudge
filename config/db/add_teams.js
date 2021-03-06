var fs=require('fs');
var TeamsModel=require('../../app/system/models/Teams');
var TeamsCollection=require('../../app/system/models/Teams/TeamsCollection.js');
var UsersCollection=require('../../app/system/models/Users/UsersCollection.js');
var UsersModel=require('../../app/system/models/Users').Users;
var TeamPeriodPointsModel = require('../../app/system/models/TeamPeriodPoints');
var test=process.argv;
var appConfig=require("../server_config.js");
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
  mongoose.connect(appConfig.db_path);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log("db working");
  });
  fs.readFile(test[0], {encoding:"UTF-8"},function (err, data) {
    if (err) throw err;
    var objects=JSON.parse(data);
    if(objects instanceof Array){
      async.eachSeries(objects,function(object,eachCallback){
        object.membersTemp=[];
        console.log(object.members);
        async.each(object.members,
          function(member,callback){
            UsersCollection.findOne({email:member,orgId:orgObjId},function(err,user){
              if(user)
                object.membersTemp.push(user._id);
              callback();
            });
          },
          function(err){
            if(err) console.log(err);
            object.members=object.membersTemp;
            delete object.membersTemp;
            if(object.teams){
              object.teamsTemp=[];
              async.each(object.teams,function(teamName,callback){
                TeamsCollection.findOne({name:teamName,orgId:orgObjId},function(err,teamObj){
                  console.log("team");
                  console.log(teamObj);
                  if(teamObj&&teamObj._id)
                    object.teamsTemp.push(teamObj._id);
                  callback();
                });
              },
              function(err,results){
                console.log("heeeeere");
                if(err) console.log(err);
                object.teams=object.teamsTemp;
                delete object.teamsTemp;
                TeamsModel.createTeam(orgObjId,object,function(err,team){
                  if(err) console.log(err);
                  TeamPeriodPointsModel.createTeamPeriodPoints(orgObjId,team._id,{},function(err){
                    if(err) console.log("encountered error with team period points");
                    else console.log("made team period points");
                    if(team.members){
                      async.each(team.members,function(memberId,eachCallback){
                        UsersModel.addTeam(memberId,team._id,eachCallback);
                      },
                      function(err,results){
                        if(err) console.log(err);
                        console.log("done writing to database");
                        console.log(team);
                        eachCallback();
                      });
                    }
                    else 
                      eachCallback();
                  });
                });
              });
            }
            else{
              TeamsModel.createTeam(orgObjId,object,function(err,team){
                TeamPeriodPointsModel.createTeamPeriodPoints(orgObjId,team._id,{},function(err){
                  if(err) console.log("encountered error with team period points");
                  else console.log("made team period points");
                  if(team.members){
                    async.each(team.members,function(memberId,eachCallback){
                      UsersModel.addTeam(memberId,team._id,eachCallback);
                    },
                    function(err,results){
                      if(err) console.log(err);
                      console.log("done writing to database");
                      console.log(team);
                      eachCallback();
                    });
                  }
                  else 
                    eachCallback();
                });
              });
            }
        });
      },function(err,results){
        console.log("done.");
      });
    }
  });
}
