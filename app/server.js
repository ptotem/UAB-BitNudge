var restify = require('restify');
var server = module.exports = restify.createServer({
    name : 'BitNudge' ,
    version : '0.0.1-dev'
});
var escape=require('escape-html');
var mongoose=require('mongoose');
var passport=require('passport');
// var sessions=require('client-sessions');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy=require('passport-http-bearer').Strategy;
var restify = require('restify');
var jwt = require('jwt-simple');
var secret="ungessableSecret";
var UserModel=require('./system/models/Users').Users;


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
  console.log("db working");
});

// Middlewares
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser({ mapParams : false }));
server.use(restify.bodyParser({ mapParams : false }));
server.use(restify.jsonp());
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
// ZOHO Authentication:

server.get('/login/zoho', function (reqdata, resdata) {
    var  user_email = reqdata.query.username;
    var user_password = reqdata.query.password;
     var http = require('https');
     //   var pathOfLogin='/apiauthtoken/nb/create?SCOPE=Zohopeople/peopleapi&EMAIL_ID=vikram@ptotem.com&PASSWORD=viksdegod';
     var pathOfLogin='/apiauthtoken/nb/create?SCOPE=Zohopeople/peopleapi&EMAIL_ID='+user_email+'&PASSWORD='+user_password;
     var data = '';
     var options = {
       hostname: 'accounts.zoho.com',
       method: "POST",
       path:pathOfLogin,
       headers: {
         Accept:"application/json"
       }
     };
     var request = http.request(options, function(res,err) {
       res.on('data', function(chunk) {
           data += chunk;
       });
       res.on('end', function(chunk) {
         var d=data;
         var n = d.search("TRUE");
         if(n>0)
         {
           var username = { username: user_email };
           var token = jwt.encode(username, secret);
           resdata.send(token);
         }
         else
         {
           resdata.send(data);
         }
       });
     });
     request.end();
     request.on('error', function(e) {
     console.error(e);
     });

});



// var UserModel=require('./system/models/Users').Users;
// server.use(sessions({
//   cookieName:"session",
//   secret:'ungessableString',
//   duration:24*60*60*1000
// }));
server.use(passport.initialize());
// server.use(passport.session());
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
passport.use(new BearerStrategy(
  function(token, done) {
    var decoded=jwt.decode(token,secret);
    if(decoded.expires<new Date().getTime())
      return done(null,false,{message:"Expired Token."});
    UserModel.getUser(decoded.userId , "","","",function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });
//
// passport.deserializeUser(function(id, done) {
//   UserModel.getUser(id,"","","",function(err,user){
//     done(err, user);
//   });
// });
server.post('/login/bitnudge',passport.authenticate('local',{session:false}), function(req,res){
  var ele={userId:req.user._id,expires:moment().add(1,'day').valueOf()};
  res.send({token:jwt.encode(ele,secret),expires:ele.expires,user:req.user});
});
var moment=require('moment');
server.get('/login/test',function(req,res){
  var tes=jwt.decode(req.query.token,secret);
  res.send(tes.userId);
});
server.get('/org/',function(req,res,next){
  if(!req.query.token)
    res.send(401,{status:"You must enter a valid Auth Token. Obtain one after signing in."});
  return next(false);
});
server.get('/test/files',function(req,res,next){
  res.send('k');
  console.log(req.files);
  return next();
});

var restifyValidator = require('restify-validator2');
server.use(restifyValidator.validatorPlugin);



var RanksController=require('./system/controllers/PointsEngine').RankController;
server.get('/org/:orgId/calc/month',function(req,res){
  RanksController.calculateRankOfPeriod(req.params.orgId,"month",new Date(),function(err){
    if(err) res.send(err);
    res.send("done");
  });
});
server.get('/org/:orgId/calc/quarter',function(req,res){
  RanksController.calculateRankOfPeriod(req.params.orgId,"quarter",new Date(),function(){
    res.send("done");
  });
});
server.get('/org/:orgId/calc/year',function(req,res){
  RanksController.calculateRankOfPeriod(req.params.orgId,"year",new Date(),function(){
    res.send("done");
  });
});

// init routes
var routes=require('./api');
routes.initialize(server);
