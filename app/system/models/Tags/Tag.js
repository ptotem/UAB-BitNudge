var TagsCollection=require('./TagsCollection.js');
var Tag= {
    createTag:function(organizationId,data){
        data.organizationId=organizationId;
        data.createdAt=new Date();
        var l=new TagsCollection(data);
        l.save();
        return true;
    },
    getTag:function(id,fields,options,populationData,callback){
        TagsCollection.findOne({_id:id},fields,options).populate(populationData).exec(callback);
    },
    getTagsOfType:function(type,fields,options,populationData,callback){
      TagsCollection.find({type:type},fields,options).populate(populationData).exec(callback);
    }
};
module.exports=Tag;
