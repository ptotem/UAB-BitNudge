var restify = require('restify');
var server = module.exports = restify.createServer({
    name : 'BitNudge' ,
    version : '0.0.1-dev'
});
var mongoose=require('mongoose');
var passport=require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy=require('passport-http-bearer').Strategy;
var jwt = require('jwt-simple');
var secret="ungessableSecret";
var UserModel=require('./system/models/Users').Users;
var TransactionMasterCollection=require('./system/models/TransactionMaster/TransactionMasterCollection.js');
var EventsController=require('./system/controllers/EventsController.js');
var bunyan = require('bunyan');

mongoose.connect('mongodb://localhost/uabTest'); //localdb
//mongoose.connect('mongodb://localhost/uabTest-SysConfig'); //serverdb - chrumble.com:3019 - db
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
// server.use(restify.jsonp());

//implementing logging
// server.use(restify.requestLogger({
//     properties: {
//         foo: 'bar'
//     },
//     serializers:bunyan.stdSerializers
// }));
// server.on('after', restify.auditLogger({
//     log: bunyan.createLogger({
//         name: 'auditLogger',
//         stream: process.stdout
//     })
// }));

server.use(restify.throttle({
    burst : 100 ,
    rate : 50 ,
    ip : true ,
    overrides : {

    }
}));
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(passport.initialize());
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('trying to authenticate.');
        console.log(username+" "+password);
        UserModel.getUserByAuthentication(username,password,"","",{path:'roles',model:'roles',select:'name'},function(err, user) {
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

server.post('/login/bitnudge',passport.authenticate('local',{session:false}), function(req,res){
    if(req.user){
        UserModel.getUser(req.user._id,"lastLogin","",[{path:"roles",select:"name"}],function(err1,obj1){
            if(obj1.lastLogin>moment().subtract(1,'day').valueOf()){
                //hardcoding the system activity for performance.
                //Id Hard Coding removed, now Hard coding is based on name
                TransactionMasterCollection.findOne({name : "Log In"},function(err,obj){
                    EventsController.triggerSystemActivity(obj1.orgId,req.user._id,obj._id,function(){});
                });
            }
            UserModel.setLastLogin(req.user._id,new Date(),function(err,obj){
                var ele={userId:req.user._id,expires:moment().add(1,'day').valueOf()};
                res.send({token:jwt.encode(ele,secret),expires:ele.expires,user:req.user});
            });
        });
    }
});


//starting the server. - on chrumble.com:3019
server.listen(3004, function () {
    console.log('%s listening at %s', server.name, server.url);
});
var moment=require('moment');

server.get('/',function(req,res){
    res.send(404,"Please go to /public");
});
server.get(/\/public\/?.*/,restify.serveStatic({
    directory:'./app/web_pages',
    default:'index.html'
}));


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
// For being awesomesauce. Uncomment while in production or deployment.
// setInterval(function(){
//   OrganizationsModel.getAllOrganizations("","","",function(err,objs){
//     objs.forEach(function(org){
//       RanksController.calculateRankOfPeriod(org._id,"month",new Date(),function(err){
//         RanksController.calculateRankOfPeriod(org._id,"quarter",new Date(),function(err1){
//           RanksController.calculateRankOfPeriod(org._id,"year",new Date(),function(){});
//         });
//       });
//     });
//   });
// },10*60*1000);

// init routes
var routes=require('./api');
routes.initialize(server);
