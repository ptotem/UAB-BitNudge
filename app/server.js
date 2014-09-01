var restify = require('restify')
var Collections= require('../collections/collections.js');
var server = module.exports = restify.createServer({
    name : 'test-api'
    , version : '0.0.1-dev'
});
var sessions=require('client-sessions');
var passport = require('passport') , LocalStrategy = require('passport-local').Strategy;
var escape=require('escape-html');

// Middlewares
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser({ mapParams : false }));
server.use(restify.urlEncodedBodyParser());
server.use(restify.bodyParser({ mapParams : false }));
server.use(restify.throttle({
    burst : 100
    , rate : 50
    , ip : true
    , overrides : {

    }
}));
server.use(sessions({
  cookieName:"session",
  secret:'ungessableString',
  duration:24*60*60*1000
}));
server.use(passport.initialize());
server.use(passport.session());
server.listen(3004, function () {
    console.log('%s listening at %s', server.name, server.url)
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    Collections.User.findOne({ username: escape(username),password:escape(password)  }, function(err, user) {
      if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(name, done) {
  Collections.User.findOne({username:name}, function(err, user) {
    done(err, user);
  });
});

server.get('/',function(req,res){
  console.log(req.query.teams.split(','));
  if(req.isAuthenticated())
    res.send('hahaha');
  else 
    res.send('please login first.');
});
server.post('/',function(req,res){
  console.log(req.query);
});
server.post('/organizations',function(req,res){
  if(!req.isAuthenticated()){
    res.send("you need to authenticate yoself!");
  }
  else{
    if(req.query.name&&req.query.teams)
      Collections.Acl.findOne({collectionName:"Organizations","controlList.role":req.user.role},function(err,obj){
        // if(obj.
        if(err)
          res.send("You cant add Organizations.");
        var test=new Collections.Organizations({name:req.query.name,teams:req.query.teams.split(',')});
        test.save();
        res.send("Org added.");
      });
  }
});
server.post('/teams',function(req,res){
  if(!req.isAuthenticated()){
    res.send("you need to authenticate yoself!");
  }
  else{
    if(req.query.name&&req.query.users)
      Collections.Acl.findOne({collectionName:"Teams","controlList.role":req.user.role},function(err,obj){
        // if(obj.
        if(err)
          res.send("You cant add TEams.");
        else{
          var test=new Collections.Teams({name:req.query.name,users:req.query.users.split(',')});
          test.save();
          res.send("Team added.");
        }
      });
  }
});
server.get('/teams/:teamName',function(req,res){
  if(!req.isAuthenticated()){
    res.send("you need to authenticate yoself!");
  }
  else{
    Collections.Acl.findOne({collectionName:"Teams","controlList.role":req.user.role},function(err,obj){
      if(err)
        res.send("you cant see this team");
      else
        Collections.Teams.findOne({name:req.params.teamName},function(err,teamobj){
          res.send(teamobj);
        });
    });
  }
});
server.get('/organizations/:orgName',function(req,res){
  if(!req.isAuthenticated()){
    res.send("you need to authenticate yoself!");
  }
  else{
    Collections.Acl.findOne({collectionName:"Organizations","controlList.role":req.user.role},function(err,obj){
      if(err)
        res.send("you cant see this org");
      else
        Collections.Organizations.findOne({name:req.params.orgName},function(err,teamobj){
          res.send(teamobj);
        });
    });
  }
});
server.get('/login',passport.authenticate('local'),function(req,res){
  res.send(req.user);
});
