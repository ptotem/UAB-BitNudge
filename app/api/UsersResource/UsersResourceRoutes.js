var leaderboardController=require('../../system/controllers/LeaderboardController.js');
var transactionController=require('../../system/controllers/TransactionsController.js');
var storeItemController=require('../../system/controllers/eCommerceEngine').StoreItemController;
var medalController=require('../../system/controllers/MedalsController.js');
var goalController=require('../../system/controllers/GoalsController.js');
var socialEngine=require('../../system/controllers/SocialEngine');
var userController=require('../../system/controllers/UsersController.js');
var AuthorizationController=require('../../system/controllers/AuthorizationController.js');
var UsersDescription=require('./UsersResourceDescription.js');
var passport=require('passport');

var http = require('http'),
    util = require('util'),
    formidable = require('formidable'),
    server;
var TEST_TMP="/home/vandana/Images"
formidable = require('formidable'),
    util = require('util')
fs   = require('fs')
//    qt   = require('quickthumb');


var userRoutes={
  // 'get /org/:orgId/users/:userId':[function(req,res,next){AuthorizationController.isAuthorized('Users','read',req,res,next);},function(req,res){
  //   userController.getUser(req,res);
  // }],


    'post /org/:orgId/users/:userId/upload':[function(req,res,next){AuthorizationController.isAuthorized('Users','update',req,res,next);},function(req,res){
             fs.readFile(req.files.image.path, function (err, data) {
            var imageName = req.files.image.name
//             console.log(imageName)
            /// If there's an error
            if(!imageName){
                console.log("There was an error")
//                res.redirect("/");
                res.end();

            } else {
                var newPath = __dirname + "/uploads/" + imageName;
                var image_path={
                    images:newPath
                }
                fs.writeFile(newPath, data, function (err) {
//                    res.send(newPath);
                    userController.updateUser(req.params.userId,image_path);
                });
            }
        });

//        fs.writeFile('/images', req.files, function (err) {
//            if (err) throw err;
//            console.log('It\'s saved!');
//        });
//        fs.readFile('/images', function (err, data) {
//            if (err) throw err;
//            console.log(data);
//        });
//        var filename = "./uploadimage.html";
//        function start (resp) {
////            resp.writeHead(200, {"Content-Type":"text/html"});
//            fs.readFile(req.file, "utf8", function (err, data) {
//                if (err) throw err;
//                console.log(data)
//                resp.write(data);
//                resp.end();
//            });
//        }

//        var path=fs.readFile;
//        console.log(path)
//        form
//            .on('field', function(field, value) {
////                console.log('hiii')
//                console.log(field, value);
//                fields.push([field, value]);
//            })
//            .on('file', function(field, file) {
//                console.log(field, file);
//                files.push([field, file]);
//            })
//            .on('end', function() {
//                console.log('-> upload done');
//                res.writeHead(200, {'content-type': 'text/plain'});
//                res.write('received fields:\n\n '+util.inspect(fields));
//                res.write('\n\n');
//                res.end('received files:\n\n '+util.inspect(files));
//            });
//        form.parse(req);
////        app.use(qt.static(__dirname + '/'));
////            console.log('hii')
//            var form = new formidable.IncomingForm();
////        console.log(form);
//            form.parse(req, function(err, fields, files) {
//                res.writeHead(200, {'content-type': 'text/plain'});
//                console.log(fields);
//                console.log(files);
//                res.write('received upload:\n\n');
//                res.end(util.inspect({fields: fields, files: files}));
//            });
//
//            form.on('end', function(fields, files) {
//                /* Temporary location of our uploaded file */
//                var temp_path = this.openedFiles[0].path;
//                console.log(temp_path)
//                /* The file name of the uploaded file */
//                var file_name = this.openedFiles[0].name;
//                /* Location where we want to copy the uploaded file */
//                var new_location = 'uploads/';
//
//                fs.copy(temp_path, new_location + file_name, function(err) {
//                    if (err) {
//                        console.error(err);
//                    } else {
//                        console.log("success!")
//                    }
//                });
//            });
//
//
    }],
    'get /org/:orgId/users/:userId/user_image':[function(req,res,next){UsersDescription.authorizeAndValidate('Users','read',req,res,next);},function(req,res){
        userController.getUser(req,res);
         var image_path=req.images;
        var img = fs.readFileSync(image_path);
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');

    }],


    'get /org/:orgId/users/:userId':[function(req,res,next){UsersDescription.authorizeAndValidate('Users','read',req,res,next);},function(req,res){

        userController.getUser(req,res);
    }],
  'get /org/:orgId/users/:userId':[function(req,res,next){UsersDescription.authorizeAndValidate('Users','read',req,res,next);},function(req,res){
    userController.getUser(req,res);
  }],
  'get /org/:orgId/users':[function(req,res,next){AuthorizationController.isAuthorized('Users','listOrg',req,res,next);},function(req,res){
    userController.getUsersOfOrganization(req,res);
  }],
  'post /org/:orgId/users':[function(req,res,next){AuthorizationController.isAuthorized('Users','create',req,res,next);},function(req,res){
      userController.createUser(req,res);

  }],
  'post /org/:orgId/users/:userId':[function(req,res,next){AuthorizationController.isAuthorized('Users','update',req,res,next);},function(req,res){
    userController.updateUser(req,res);
  }],
  'post /org/:orgId/teams/:teamId/members':[function(req,res,next){AuthorizationController.isAuthorized('Users','assign',req,res,next);},function(req,res){
    userController.addUserToTeam(req,res);
  }]
};

// End Points for Transactions in UserResourcesRoutes:
var transactionRoutes={
  'get org/:orgId/users/:userId/transactions':[function(req,res,next){AuthorizationController.isAuthorized('Transactions','list',req,res,next);},function(req,res) {
    transactionController.getTransactionsOfUser(req,res);
  }],
  'get org/:orgId/users/:userId/transactions/:transactionId/approve':[function(req,res,next){AuthorizationController.isAuthorized('Transactions','approve',req,res,next);},function(req,res){
    transactionController.approveTransaction(req,res);
  }],
  'post /org/:orgId/users/:userId/transactions/':[function(req,res,next){AuthorizationController.isAuthorized('Transactions','create',req,res,next);},function(req,res){
    transactionController.createTransaction(req,res);
  }],
  'del org/:orgId/users/:userId/transaction/:transactionId':[function(req,res,next){AuthorizationController.isAuthorized('Transactions','delete',req,res,next);},function(req,res){
    transactionController.deleteTransactionOfUser(req,res);
  }]
};

//End Points for StoreItems in UserResourcesRoutes:
var storeItemRoutes={
  'get org/:orgId/users/:userId/items':[function(req,res,next){AuthorizationController.isAuthorized('StoreItems','list',req,res,next);},function(req,res) {
    storeItemController.getStoreItemsOfUser(req,res);
  }],
  'post /org/:orgId/users/:userId/items/':[function(req,res,next){AuthorizationController.isAuthorized('StoreItems','assign',req,res,next);},function(req,res){
    storeItemController.buyItemForUser(req,res);
  }]
};
var transactionHistoryRoutes={
  'get /org/:orgId/users/:userId/transactionHistory':[function(req,res,next){AuthorizationController.isAuthorized('BuyHistory','read',req,res,next);},function(req,res){
    userController.getTransactionHistoryOfUser(req,res);
  }]
};



var medalRoutes={
  'get org/:orgId/users/:userId/medals':[function(req,res,next){AuthorizationController.isAuthorized('Medals','list',req,res,next);},function(req,res) {
    medalController.getMedalsOfUser(req,res);
  }],
  'post /org/:orgId/users/:userId/medals':[function(req,res,next){AuthorizationController.isAuthorized('Medals','assign',req,res,next);},function(req,res){
    medalController.assignMedalToUser(req,res);
  }]
};

//End Points For Goals:
var goalRoutes={
  'get org/:orgId/users/:userId/goals':[function(req,res,next){AuthorizationController.isAuthorized('Goals','list',req,res,next);},function(req,res){
    goalController.getLiveUserGoals(req,res);
  }],
  'post /org/:orgId/users/:userId/goals':[function(req,res,next){AuthorizationController.isAuthorized('Goals','create',req,res,next);},function(req,res){
    goalController.createGoal(req,res);
  }]
};

var leaderboardRoutes={
  'get /org/:orgId/leaderboard/users':[function(req,res,next){AuthorizationController.isAuthorized('Organizations','read',req,res,next);},function(req,res){
    leaderboardController.getUserLeaderboard(req,res);
  }]
};

//End Points for Rank:
var rankRoutes={
  'get /org/:orgId/users/:userId/rank':[function(req,res,next){AuthorizationController.isAuthorized('Users','read',req,res,next);},function(req,res) {
    leaderboardController.getUserRankOfPeriod(req,res);
  }],
  'get /org/:orgId/teams/:teamId/users/:userId/rank':[function(req,res,next){AuthorizationController.isAuthorized('Teams','read',req,res,next);},function(req,res){
    leaderboardController.getUserRankOfTeamOfPeriod(req,res);
  }]
};


var statusMessagesRoutes={
  'post /org/:orgId/users/:userId/statuses/:statusId':[function(req,res,next){AuthorizationController.isAuthorized('StatusMessages','update',req,res,next);},function(req,res){
    socialEngine.StatusMessagesController.updateStatusMessage(req,res);
  }],
  'post /org/:orgId/users/:userId/statuses':[function(req,res,next){AuthorizationController.isAuthorized('StatusMessages','create',req,res,next);},function(req,res){
    socialEngine.StatusMessagesController.createStatusMessage(req,res);
  }],
  'get /org/:orgId/users/:userId/statuses':[function(req,res,next){AuthorizationController.isAuthorized('StatusMessages','list',req,res,next);},function(req,res){
    socialEngine.StatusMessagesController.getStatusMessagesOfUser(req,res);
  }],
  'get /org/:orgId/users/:userId/statuses/:statusId':[function(req,res,next){AuthorizationController.isAuthorized('StatusMessages','read',req,res,next);},function(req,res){
    socialEngine.StatusMessagesController.getStatusMessage(req,res);
  }],
  'get /org/:orgId/users/:userId/statuses/:statusId/comments':[function(req,res,next){AuthorizationController.isAuthorized('StatusComments','list',req,res,next);},function(req,res){
    socialEngine.StatusMessagesController.getCommentsOfStatus(req,res);
  }],
  'post /org/:orgId/users/:userId/statuses/:statusId/comments':[function(req,res,next){AuthorizationController.isAuthorized('StatusComments','create',req,res,next);},function(req,res){
    socialEngine.StatusMessagesController.commentOnStatusMessage(req,res);
  }],
  'post /org/:orgId/users/:userId/statuses/:statusId/like':[function(req,res,next){AuthorizationController.isAuthorized('StatusLikes','create',req,res,next);},function(req,res){
    socialEngine.StatusMessagesController.likeStatusMessage(req,res);
  }],
  'del /org/:orgId/users/:userId/statuses/:statusId':[function(req,res,next){AuthorizationController.isAuthorized('StatusMessages','delete',req,res,next);},function(req,res){
    socialEngine.StatusMessagesController.deleteStatusMessage(req,res);
  }]
};


//End Points For NudgeChat:
var nudgeChatRoutes={
  'get org/:orgId/users/:userId/chat':[function(req,res,next){AuthorizationController.isAuthorized('NudgeChat','read',req,res,next);},function(req,res){
    socialEngine.NudgeChatController.getNudgeChatOfUser(req,res);
  }],
  'post /org/:orgId/users/:userId/chat/':[function(req,res,next){AuthorizationController.isAuthorized('NudgeChat','send',req,res,next);},function(req,res){
    socialEngine.NudgeChatController.sendNudgeMessage(req,res);
  }]
};

//End Points For NudgeMailbox:
var nudgeMailBoxRoutes={
  'get org/:orgId/users/:userId/mails':[function(req,res,next){AuthorizationController.isAuthorized('NudgeMailbox','read',req,res,next);},function(req,res){
    socialEngine.NudgeMailboxController.getNudgeMailboxOfUser(req,res);
  }]
};

//End Points For NudgeMails
var nudgeMailRoutes={
  'get org/:orgId/users/:userId/mails/:mailId':[function(req,res,next){AuthorizationController.isAuthorized('NudgeMails','read',req,res,next);},function(req,res){
    socialEngine.NudgeMailsController.getMail(req,res);
  }],
  'post /org/:orgId/users/:userId/mails/:mailId':[function(req,res,next){AuthorizationController.isAuthorized('NudgeMails','update',req,res,next);},function(req,res) {
    socialEngine.NudgeMailsController.updateMail(req,res);
  }],
  'post /org/:orgId/users/:userId/mails':[function(req,res,next){AuthorizationController.isAuthorized('NudgeMails','create',req,res,next);},function(req,res) {
    socialEngine.NudgeMailsController.sendMail(req,res);
  }]
  // 'del org/:orgId/users/:userId/mails/:mailId':[function(req,res,next){AuthorizationController.isAuthorized('Users','delete',req,res,next);},function(req,res){
  //   socialEngine.NudgeMailsController.deleteMail(req,res);
  // }]
};
var stuff=[storeItemRoutes,leaderboardRoutes,userRoutes,transactionRoutes,transactionHistoryRoutes,goalRoutes,nudgeChatRoutes,nudgeMailBoxRoutes,nudgeMailRoutes,statusMessagesRoutes,medalRoutes,rankRoutes];
module.exports={
  initialize:function(server,handlers){
    stuff.forEach(function(routesObj){
    for(var property in routesObj) {
      methods=property.split(" ");
      if(handlers)
        eval("server."+methods[0]+"('"+methods[1]+"',"+handlers+","+routesObj[property][1]+');');
      else
        eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property][1]+');');
    }
    });
    console.log("User Routes initialized");
  }
};
