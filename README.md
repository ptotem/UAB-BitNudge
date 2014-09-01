Temporary repository for the UAB project. This file serves as temporary documentation for now.

The role and capability model works as follows-
Each collection has a corresponding document in the ACL collection which describes which roles have the ability to do certain operations on them. 
Currently, they are in the form of read write permissions, so a typical document looks like this-

{collectionName:"User",controlList:[{role:"superAdmin",permission:[{r:"y",w:'y'}]}]}

Each user has an array of roles that he has. Currently, during development, these roles are stored as strings, but they should be changed into ObjectID references.
