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

//var rank = require("./system/models/Leaderboards");
//rank.MonthLeaderboard.createLeaderboard("5412d2990eeb4a320ca12d9e", {});

// var orgModel = require("./system/models/Organizations");
// orgModel.createOrganization({name: "org1"});


/* var userModel = require("./system/models/Users/UsersCollection.js");
 var points=require("./system/models/UserPoints");
userModel.find({},function(err,objs){
	objs.forEach(function(obj){
		points.UserMonthPoints.createUserMonthPoints("5412d2990eeb4a320ca12d9e", {userId: obj._id, month: new Date(), totalPoints: Math.floor((Math.random()*9001)+1000)});
	});
});

*/

//loading models

var OrganizationResources=require('./app/RestApi/OrganizationResources');
var TeamResources=require('./app/RestApi/TeamResources');
var UserResources=require('./api/RestApi/UserResources');
OrganizationResources.initilize(server);
//var Organization=require('./system/models/Organizations');
//Organization.createOrganization({name:"Amit"});
//Organization.initialize(server);
//var teams=require('./system/models/Teams');
//teams.initialize(server);

//server.on('connection', function (stream) {
//    console.log('someone connected!');
//});
