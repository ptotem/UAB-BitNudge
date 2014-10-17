var TagsModel=require('../models/Tags');

var tagsController={
  createTag:function(req,res){
    TagsModel.createTag(req.params.orgId,req.body,function(err){
      if(err) res.send(err);
      else res.send("success");
    });
  },
  getTagsOfTypeOfOrganization:function(req,res){
    TagsModel.getTagsOfTypeOfOrganization(req.params.orgId,req.params.tagName,"","","",function(err,tags){
      if(err) res.send(err);
      else res.send(tags);
    });
  },
  updateTag:function(req,res){
    TagsModel.updateTag(req.params.tagId,req.body,function(err){
      if(err) res.send(err);
      else res.send("success");
    });
  },
  deleteTag:function(req,res){
    TagsModel.deleteTag(req.params.tagId,function(err){
      if(err) res.send(err);
      else res.send("success");
    });
  }
};
module.exports=tagsController;
