// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var UserModel=require('../app/system/models/Users');
mongoose.connect('mongodb://localhost/uabTest');
describe("test users",function(){
    describe("static tests",function(){
        it("should get user",function(done){
            UserModel.getUser("54181599d465d283167f8dcc","","","",function(err,obj){console.log(obj);done();});
        });

    });
});
