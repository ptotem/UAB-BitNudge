var fs=require('fs');
var TagsModel=require('../../app/system/models/OrgTags/OrgTags.js');
var test=process.argv;
var appConfig=require("../server_config.js");
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
        objects.forEach(function(object){
            console.log(object);
            TagsModel.createOrgTag(orgObjId,object,function(err,obj){
              console.log("done writing to database- ");
              console.log(obj);
            });
        });
    }
  });
}
