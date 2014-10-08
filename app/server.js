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
var restify = require('restify');
var jwt = require('jwt-simple');
//var authentication=require('../system/controllers/UserController.js')

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
// Zoho authentication Api call

server.get('/login', function (reqdata, resdata) {
//   if(authentication.IsAuthenticated(reqdata,resdata)==true)
//    {
//        resdata.send('user Authentication');
//
//    }
    var  user_email = reqdata.params.username;
    var user_password = reqdata.query.password;
    console.log(user_email);
    var username = { username: user_email };
    var secret = '123';
    var token = jwt.encode(username, secret);
// decode
    var decoded = jwt.decode(token, secret);
    var http = require('https');
//   var pathOfLogin='/apiauthtoken/nb/create?SCOPE=Zohopeople/peopleapi&EMAIL_ID=vikram@ptotem.com&PASSWORD=viksdegod';
    var pathOfLogin='/apiauthtoken/nb/create?SCOPE=Zohopeople/peopleapi&EMAIL_ID='+user_email+'&PASSWORD='+user_password;
    console.log(pathOfLogin);
    var data = '';
    var options = {
        hostname: 'accounts.zoho.com',
        method: "POST",
        path:pathOfLogin,
        headers: {
            Accept:"application/json"
        }
    };
    var request = http.request(options, function(res) {
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function(chunk) {
//         resdata.send(token);
            resdata.send(data);
        });
    });

    request.end();
    request.on('error', function(e) {
        console.error(e);
    });

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



// var UserModel=require('./system/models/Users').Users;
// server.use(sessions({
//   cookieName:"session",
//   secret:'ungessableString',
//   duration:24*60*60*1000
// }));
// server.use(passport.initialize());
// server.use(passport.session());
//   passport.use(new LocalStrategy(
//     function(username, password, done) {
//       console.log('trying to authenticate.');
//       console.log(username+" "+password);
//       UserModel.getUserByAuthentication(username,password,function(err, user) {
//         if (err) { return done(err); }
//           if (!user) {
//             return done(null, false, { message: 'Incorrect username or password.' });
//           }
//         return done(null, user);
//       });
//     }
//   ));
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });
//
// passport.deserializeUser(function(id, done) {
//   UserModel.getUser(id,"","","",function(err,user){
//     done(err, user);
//   });
// });
// server.post('/login',passport.authenticate('local'), function(req,res){
//   res.send({_id:req.user._id,orgId:req.user.orgId});
// });


//testing ranks

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
var routes=require('./api/RestApi.js');
routes.initialize(server);

//init routes
//var routes=require('./RestApi/RestApi.js');
//routes.initialize(server);


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
