
var restify = require('restify')
var server = module.exports = restify.createServer({
    name : 'BitNudge'
    , version : '0.0.1-dev'
});
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
server.listen(3004, function () {
    console.log('%s listening at %s', server.name, server.url)
});

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