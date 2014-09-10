var authenticationRoutes=require('./AuthenticationRoutes.js');
var UserManagement=require('../../models/UserManagement');
var sessions=require('client-sessions');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Authentication={
  initialize:function(server){
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
        UserManagement.getUserByAuthentication(username,password,function(err, user) {
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
      UserManagement.getUser(id,function(done){
        done(err, user);
      });
    });
    
    //initializing routes.
    for(property in authenticationRoutes)
    {
      methods=property.split(" ");
      eval("server."+methods[0]+"('"+methods[1]+"',"+authenticationRoutes[property]+');');
    }
  },
  isAuthenticated:function(req){
    return req.isAuthenticated();
  },
  getUserDetail:function(req,detailField){
    if(Authentication.isAuthenticated(req))
      return req.user[detailField];
    else return null;
  },
  getUser:function(req){
    if(Authentication.isAuthenticated(req))
      return req.user;
    else return null;
  },
  getCurrentUser:function(req){
    if(Authentication.isUserAuthenticated())
      return req.user;
  }


//    unauthorizedUser :function(req){
//        if(Authentication.isUserAuthenticated()){
//            return req.user;
//            if(req.authorization){
//
//            }
//        }
//    }
}
module.exports=Authentication;

