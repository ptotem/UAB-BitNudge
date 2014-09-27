var restify = require('restify');
var server = module.exports = restify.createServer({
    name : 'BitNudge' ,
    version : '0.0.1-dev'
});
var escape=require('escape-html');
var mongoose=require('mongoose');
var passport=require('passport');
var sessions=require('client-sessions');
var LocalStrategy = require('passport-local').Strategy;
// var cors=require('cors');
// var corsMiddleware = require('restify-cors-middleware');
//
// var cors = corsMiddleware({
//   origins: ['http://192.168.2.23'],//http://web.myapp.com'],
//   // allowHeaders: ['API-Token'],
//   // exposeHeaders: ['API-Token-Expiry']
// });
//
// server.pre(cors.preflight);
// server.use(cors.actual);

mongoose.connect('mongodb://localhost/uabTest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  
  console.log("db working");
});
// db.close();
//




// Middlewares
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser({ mapParams : false }));
// server.use(restify.urlEncodedBodyParser());
server.use(restify.bodyParser({ mapParams : false }));
// server.use(restify.jsonp());
server.use(restify.throttle({
    burst : 100 ,
    rate : 50 ,
    ip : true ,
    overrides : {

    }
}));
// restify.CORS.ALLOW_HEADERS.push('accept');
// restify.CORS.ALLOW_HEADERS.push('sid');
// restify.CORS.ALLOW_HEADERS.push('lang');
// restify.CORS.ALLOW_HEADERS.push('origin');
// restify.CORS.ALLOW_HEADERS.push('withcredentials');
// restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());
server.use(restify.fullResponse());
// server.use(
//   function crossOrigin(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     return next();
//   }
// );
server.listen(3004, function () {
    console.log('%s listening at %s', server.name, server.url);
});



var UserModel=require('./system/models/Users');
server.use(sessions({
  cookieName:"session",
  secret:'ungessableString',
  duration:24*60*60*1000
}));
server.use(passport.initialize());
server.use(passport.session());
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('trying to authenticate.');
      console.log(username+" "+password);
      UserModel.getUserByAuthentication(username,password,function(err, user) {
        if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
          }
        return done(null, user);
      });
    }
  ));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  UserModel.getUser(id,"","","",function(err,user){
    done(err, user);
  });
});
server.post('/login',passport.authenticate('local'), function(req,res){
  res.send({_id:req.user._id,orgId:req.user.orgId});
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

var leader=require('./system/controllers/PointsEngine');
// console.log(new Date().getTime());
// leader.calculateRankOfMonth("5417f10a195e61022fff91ee",new Date(),function(err){console.log(new Date().getTime());});

//testing ranks

server.get('/org/:orgId/calc',function(req,res){
});



//init routes
var routes=require('./RestApi/RestApi.js');
routes.initialize(server);

// var test=restify.createJsonClient({url:'http://localhost:3004'});
// test.post('/login',{test:"try"},function(err,req,res,obj){
//   console.log(obj);
// });
//loading models

//var Organization=require('./system/models/Organizations');
//Organization.createOrganization({name:"Amit"});
//Organization.initialize(server);
//var teams=require('./system/models/Teams');
//teams.initialize(server);

//server.on('connection', function (stream) {
//    console.log('someone connected!');
//});
