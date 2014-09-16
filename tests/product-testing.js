// require('../app/server.js');
var chai=require("chai");
var should=chai.should();
var mongoose=require('mongoose');
var OrganizationsModel=require("../app/system/models/Organizations");
var ProductModel=require('../app/system/models/Products');
mongoose.connect('mongodb://localhost/uabTest');
describe("test product",function(){
  describe("static tests",function(){
    it("should create product",function(done){
      ProductModel.createProduct({_id:"product1",name:"Product1",type:"loan", organizationId: "org1"});
      done();
    });

    it("should get product details",function(done){
      ProductModel.getProductDetail("product1", "name"); 
      done();
    });

    it("should get product schema",function(done){
      ProductModel.getProductSchema("product1"); 
      done();
    });

    it("should get product",function(done){
      ProductModel.getProduct("product1");
      done();
    });

    it("should get product by orgId",function(done){
      ProductModel.getProductByOrgId("org1"); 
      done();
    });

    it("should update product",function(done){
      ProductModel.updateProduct("product1", "name", "ProductUpdate"); 
      done();
    });

    it("should delete product",function(done){
      ProductModel.deleteProduct("product1"); 
      done();
    });

  });
});
