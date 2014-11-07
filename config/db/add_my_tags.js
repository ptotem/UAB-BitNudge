var fs=require('fs');
var TagsModel=require('../../app/system/models/Tags');
var OrgCollection = require('../../app/system/models/Organizations/OrganizationsCollection.js');
var test=process.argv;
var mongoose=require('mongoose');
var readline=require('readline');

//test.shift();
//test.shift();

var orgName;
if(!test[2]){
  console.log("Please enter the json file as a command line argument");
  process.exit();
}
if(!test[3]){
  var rl=readline.createInterface({input:process.stdin,output:process.stdout});
  rl.question("Please enter the organizationName",function(name){
    try{
      orgName=name;
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
    orgName=test[3];
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
  fs.readFile(test[2], {encoding:"UTF-8"},function (err, data) {
    if (err) throw err;
    var objects=JSON.parse(data);
    OrgCollection.findOne({"name": orgName}, function(err, collection){
      if (objects instanceof Array) {
        objects.forEach(function (object) {
          TagsModel.createTag(collection._id,object,function(err,result){
            console.log("done writing to database- ");
            console.log(result);
          });
        });
      }
    });
  });
}
