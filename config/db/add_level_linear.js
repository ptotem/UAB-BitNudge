var fs=require('fs');
var LevelsModel=require('../../app/system/models/Levels');
var test=process.argv;
var mongoose=require('mongoose');
var readline=require('readline');
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
      var currentMax=0;
      var limits=objects;
      var currLimits=JSON.stringify(objects);
      currLimits=currLimits.replace(/\"([a-z0-9]+)\"/g,"$1");
      var calculationFn="function(points){var limits="+currLimits+";limits.forEach(function(limit){if(points<limit.max){return limit.level;}});return 0;}";
      LevelsModel.createLevel(orgObjId,{calculationFn:calculationFn},function(err,object){
        console.log("done writing to database");
        console.log(object);
      });
    }
  });
}
