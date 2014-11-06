var UsersModel=require('../models/Users').Users;
var TeamsModel=require('../models/Teams');
var SocialFeedModel=require('../models/SocialFeed');
var NudgeMailbox=require('../models/NudgeMailbox');
var NudgeChat=require('../models/NudgeChat');
var NotificationCenterModel=require('../models/NotificationCenter');
var OrganizationalModel=require('../models/Organizations');
var UserPeriodPointsModel=require('../models/UserPeriodPoints');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
fs   = require('fs');

var UsersController={
    createUser:function(req,res){
        UsersModel.createUser(req.params.orgId,req.body,function(err,user){
            // SocialFeedModel.createSocialFeed(req.params.orgId,user._id,{},function(){});
            NudgeMailbox.createNudgeMailbox(req.params.orgId,user._id,{},function(){});
            NudgeChat.createNudgeChat(req.params.orgId,user._id,{},function(){});
            NotificationCenterModel.createNotificationCenter(req.params.orgId,user._id,{},function(){});
            UserPeriodPointsModel.createUserPeriodPoints(req.params.orgId,req.params._id,{},function(){});
            res.send(user);
        });
    },
    updateUser:function(req,res){
        UsersModel.updateUser(req.params.userId,req.body,function(err,obj){
            if(err) res.send("fail");
            else
                res.send("success");
        });
    },
    sendMailToUser:function(req,res){
          var transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                  user: "vandana.coc@gmail.com",
                  pass: "9234725176"
               }
           });
          var from=req.query.from;
          transporter.sendMail({
              from: from, // sender address
              to: req.query.to, // comma separated list of receivers
              subject: req.query.subject, // Subject line
              text: req.query.body // plaintext body
          }, function(error, response){
              if(error){
                  res.send("error");
              }else{
                  res.send("successfully send");
              }
          });
    },
    updateUserImage:function(req,res){
        fs.readFile(req.files.image.path, function (err, data) {
            var imageName = req.files.image.name+req.params.userId;
            if(!imageName){
                console.log("There was an error");
                res.end();

            } else {
//                var image=req.params.userId+"_img";
                var newPath = __dirname + "../uploads/" + imageName;
                var image_path={
                    image:newPath
                }
                fs.writeFile(newPath, data, function (err) {
                    UsersModel.updateUser(req.params.userId,image_path,function(err,obj){
                        if(err) res.send("fail");
                        else
                            res.send("success");
                    });

                });
            }
        });
    },
    getUserImage:function(req,res){
        UsersModel.getUser(req.params.userId,"image","","",function(err,obj){
            var image_path=obj.image;
            var img = fs.readFileSync(image_path);
            res.writeHead(200, {'Content-Type': 'image/jpg' });
            res.end(img, 'binary');
//        res.send(img);
        });
    },
    getUser:function(req,res){
        UsersModel.getUser(req.params.userId,"","",[{path:'teams',select:'name',model:'teams'},{path:'role',model:'roles',select:'name'},{path:'orgtags',model:'orgTags',select:'name'},{path:'reportsTo',model:"users",select:"name"}],function(err,obj){
            res.send(obj);
            // if(req.user._id==req.params.userId)
            //   res.send(obj);
            // else res.send(401,{status:{http:401,message:'Not Authorized'}});
        });
    },
    getUsersOfOrganization:function(req,res){
        UsersModel.getUsersOfOrganization(req.params.orgId,"","",[{path:'teams',select:'name',model:'teams'},{path:'role',model:'roles',select:'name'},{path:'orgtags',model:'orgTags',select:'name'},{path:'reportsTo',model:"users",select:"name"}],function(err,goals){
            res.send(goals);
        });
    },
    getTransactionHistoryOfUser:function(req,res){
        UsersModel.getTransactionHistoryOfUser(req.params.userId,function(err,objs){
            if(err) res.send(err);
            else res.send(objs);
        });
    },
    deleteUser:function(req,res){
        UsersModel.deleteUser(req.params.userId,function(err,obj){
            SocialFeedModel.deleteSocialFeed(req.params.userId);
            NudgeMailbox.deleteNudgeMailbox(req.params.userId);
            NudgeChat.deleteNudgeChat(req.params.userId);
            NotificationCenterModel.deleteNotificationCenter(req.params.userId);
            if(err){
                res.send("fail");
                return handleError(err);
            }
            else{
                res.send("success");
            }
        });
    },
    addUserToTeam:function(req,res){
        TeamsModel.addMembersToTeam(req.params.teamId,req.body.userId,function(err,obj){
            if(err){
                res.send("fail");
                return handleError(err);
            }
            else{
                res.send("success");
            }
        });
    }
};
module.exports=UsersController;
