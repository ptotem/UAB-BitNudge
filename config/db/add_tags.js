var fs=require('fs');
var TagsCollection=require('../../app/system/models/OrgTags/OrgTags.js');
var test=process.argv;
var mongoose=require('mongoose');
test.shift();
test.shift();
console.log(test);
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
          var hal=new TagsCollection(object);
          hal.save(function(err){if(err)console.log(err); else console.log("done");});
      });
  }
});
