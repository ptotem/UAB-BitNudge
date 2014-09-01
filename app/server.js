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
require('./routes.js');
