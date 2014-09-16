var OrganizationResources=require('./OrganizationResources');
var TeamResources=require('./TeamResources');
var UserResources=require('./UserResources');
var RestApi={
  initialize:function(server){
    OrganizationResources.initialize(server);
    // TeamResources.initialize(server);
    // UserResources.initialize(server);
    //
    // UserResources.forEach(function(routesObj){
    //   for(var property in routesObj)
    //   {
    //       methods=property.split(" ");
    //       eval("server."+methods[0]+"('"+methods[1]+"',"+routesObj[property]+');');
    //   }
    //     console.log("User Routes initialized");
    // });
  }
};
module.exports=RestApi;
