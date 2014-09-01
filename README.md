Temporary repository for the UAB project. This file serves as temporary documentation for now.

The role and capability model works as follows-
Each collection has a corresponding document in the ACL collection which describes which roles have the ability to do certain operations on them. 
Currently, they are in the form of read write permissions, so a typical document looks like this-

{collectionName:"User",controlList:[{role:"superAdmin",permission:[{r:"y",w:'y'}]}]};

Each user has an array of roles that he has. Currently, during development, these roles are stored as strings, but they should be changed into ObjectID references.

--Things that can be done.
-Post /organizations and give name and teams as query params, where name and teams(comma separating teams) are strings. Currently only one team can be added until a better way is found to pass multiple arguments in rest. Currently only superAdmin can make teams. Login as vikram@ptotem.com password- test.
-Post /teams and give name and users as query params, where name and user are strings. User is the username. Same issue as above. Also, currently only superAdmin can make teams
-Get /teams/:teamName where teamName is string. If you can read, then the object is given to you.
-Get organizations/:orgName

--TODOs
-Change the structure of ACLs from giving the permissions in a subfield, to creating a field for each operation. Example- CreateControlList,ReadControl list and other CRUD operations.
-Change from using strings to reference other documents and convert them into their ObjectIDs.
-Move the logic in the get functions to a controller file.s
