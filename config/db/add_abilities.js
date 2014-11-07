var fs=require('fs');
var AbilitiesCollection=require('../../app/system/models/Abilities/Abilities.js');
var test=process.argv;
var mongoose=require('mongoose');
var readline=require('readline');
test.shift();
test.shift();
if(!test[0]){
  console.log("Please enter the json file as a command line argument");
  process.exit();
}
if(!test[1]){
  var rl=readline.createInterface({input:process.stdin,output:process.stdout});
  rl.question("Please enter the organizationId",function(orgId){
    try{
      var orgObjId=mongoose.Types.ObjectId(orgId);
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
    var orgObjId=mongoose.Types.ObjectId(test[1]);
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
            console.log(object);
            var hal=new AbilitiesCollection(object);
            hal.save(function(err){if(err)console.log(err); else console.log("done");});
        });
    }
  });
}
