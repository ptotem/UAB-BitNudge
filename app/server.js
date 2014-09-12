var restify = require('restify');
var server = module.exports = restify.createServer({
    name : 'BitNudge' ,
    version : '0.0.1-dev'
});
var escape=require('escape-html');
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/uabTest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  
  console.log("db working");
});
// db.close();

// Middlewares
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser({ mapParams : false }));
server.use(restify.urlEncodedBodyParser());
server.use(restify.bodyParser({ mapParams : false }));
server.use(restify.throttle({
    burst : 100 ,
    rate : 50 ,
    ip : true ,
    overrides : {

    }
}));
server.listen(3004, function () {
    console.log('%s listening at %s', server.name, server.url);
});

//loading models
// var Organization=require('./System/models/Organizations');
// Organization.initialize(server);
// var teams=require('./System/models/Teams');
// teams.initialize(server);
var RankController=require('./system/controllers/PointsEngine/RankController.js');
setTimeout(function(){
  console.log(new Date().getTime());
  RankController.calculateRankOfMonth("",new Date());
  console.log(new Date().getTime());
},5000);

//server.on('connection', function (stream) {
//    console.log('someone connected!');
//});
