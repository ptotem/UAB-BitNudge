var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');

var userSchema={username:String,password:String,role:String};
var User=mongoose.model('User',userSchema);

var Medals=mongoose.model('Medals',{name:String,points:String});
var Transactions=mongoose.model('Transactions',{type:String});
var Models=mongoose.model('Models',{name:String,val:String});

var Roles=mongoose.model('Roles',{name:String});
var Acl=mongoose.model('ACL',{collectionName:String,controlList:[{role:String,permission:[{r:String,w:String}]}]});
var Organizations=mongoose.model('Organizations',{name:String,teams:[String]});
var Teams=mongoose.model('Teams',{name:String,users:[String],subteams:[String]});

var team1=new Teams({name:"testTeam",users:["vikram@ptotem.com"]});
team1.save();

var role1=new Roles({name:"superAdmin"});
role1.save();
role1=new Roles({name:"admin"});
role1.save();
role1=new Roles({name:"worker"});
role1.save();

var acl1=new Acl({collectionName:"User",controlList:[{role:"superAdmin",permission:[{r:"y",w:'y'}]}]});
acl1.save();
acl1=new Acl({collectionName:"Medals",controlList:[{role:"superAdmin",permission:[{r:"y",w:'y'}]},{role:"admin",permission:[{r:'y',w:'y'}]}]});
acl1.save();
acl1=new Acl({collectionName:"Models",controlList:[{role:"superAdmin",permission:[{r:"y",w:'y'}]},{role:"admin",permission:[{r:'y',w:'y'}]}]});
acl1.save();
acl1=new Acl({collectionName:"Transactions",controlList:[{role:"superAdmin",permission:[{r:"y",w:'y'}]},{role:"admin",permission:[{r:'y',w:'y'}]},{role:"worker",permission:[{r:'y',w:'y'}]}]});
acl1.save();
acl1=new Acl({collectionName:"Organizations",controlList:[{role:"superAdmin",permission:[{r:"y",w:'y'}]}]});
acl1.save();
acl1=new Acl({collectionName:"Teams",controlList:[{role:"superAdmin",permission:[{r:"y",w:'y'}]}]});
acl1.save();

var user1=new User({username:"vikram@ptotem.com",password:"test",role:"superAdmin"});
user1.save();
var user2=new User({username:'user1@ptotem.com',password:'test',role:"admin"});
user2.save();
var user3=new User({username:'user2@ptotem.com',password:'test',role:"worker"});
user3.save();
var user4=new User({username:'user3@ptotem.com',password:'test',role:"worker"});
user4.save();

module.exports={
  User:User,Medals:Medals,Transactions:Transactions,Models:Models,Teams:Teams,Organizations:Organizations,Acl:Acl
};
