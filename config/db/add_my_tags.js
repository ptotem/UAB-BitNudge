var fs=require('fs');
var TagsCollection=require('../../app/system/models/Tags/TagsCollection.js');
var OrgCollection = require('../../app/system/models/Organizations/OrganizationsCollection.js');
var test=process.argv;
var mongoose=require('mongoose');

//test.shift();
//test.shift();

mongoose.connect('mongodb://localhost/uabTest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("db working");
});

fs.readFile(test[2], {encoding:"UTF-8"},function (err, data) {
  if (err) throw err;
  var objects=JSON.parse(data);

  OrgCollection.findOne({"name": test[3]}, function(err, collection){
      if (objects instanceof Array) {
        objects.forEach(function (object) {
            object.orgId = collection._id;
            var hal=new TagsCollection(object);
            hal.save(function(err){if(err)console.log(err); else console.log("done");});
        });
      }
  });


});
