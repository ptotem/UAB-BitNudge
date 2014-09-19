var restify = require('restify');
var server = module.exports = restify.createServer({
    name : 'BitNudge' ,
    version : '0.0.1-dev'
});
var escape=require('escape-html');
var mongoose=require('mongoose');
var sessions=require('client-sessions');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//mongoose init.
mongoose.connect('mongodb://localhost/uabTest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("db working");
});

// Middlewares
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser({ mapParams : false }));
server.use(restify.urlEncodedBodyParser());
server.use(restify.bodyParser({ mapParams : false }));
server.use(restify.jsonp());
server.use(restify.throttle({
    burst : 100 ,
    rate : 50 ,
    ip : true ,
    overrides : {

    }
}));

//passport init.
server.use(passport.initialize());
// server.use(passport.session());
// server.use(sessions({
//     cookieName:"session",
//     secret:'ungessableString',
//     duration:24*60*60*1000
// }));
var UsersModel=require('./system/models/Users');
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('trying to authenticate.');
    UsersModel.getUserByAuthentication(username,password,function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      console.log(user);
      return done(null, user);
    });
  }
));
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });
// passport.deserializeUser(function(id, done) {
//   UsersModel.getUser(id,function(done){
//     done(err, user);
//   });
// });

// restify.CORS.ALLOW_HEADERS.push('accept');
// restify.CORS.ALLOW_HEADERS.push('sid');
// restify.CORS.ALLOW_HEADERS.push('lang');
// restify.CORS.ALLOW_HEADERS.push('origin');
// restify.CORS.ALLOW_HEADERS.push('withcredentials');
// restify.CORS.ALLOW_HEADERS.push('x-requested-with');
// server.use(restify.CORS());
// server.use(restify.fullResponse());
// server.use(
//   function crossOrigin(req,res,next){
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     // res.header("Access-Control-Allow-Methods", "POST");
//     return next();
//   }
// );
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
//init routes
var routes=require('./RestApi/RestApi.js');
routes.initialize(server);

//loading models

//var Organization=require('./system/models/Organizations');
//Organization.createOrganization({name:"Amit"});
//Organization.initialize(server);
//var teams=require('./system/models/Teams');
//teams.initialize(server);

//server.on('connection', function (stream) {
//    console.log('someone connected!');
//});
