var fs=require('fs');
var OrganiztionsModel=require('../../app/system/models/Organizations');
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
later();
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
    if(objects instanceof Object){
      OrganiztionsModel.createOrganization(objects,function(err,obj){
        console.log("done writing to database");
        console.log(obj);
        process.exit();
      });
    }
  });
}
