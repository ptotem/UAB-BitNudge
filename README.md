Temporary repository for the UAB project. This file serves as temporary documentation for now.

##Documentation
Detailed Documentation about the backend can be found in the docs folder.

##Installing
1. git clone this repository. After this, some data needs to be inputted in the database. These are-
Roles
Capabilities
System Activities(must include the logging in system activity with the same system activity)

2. Run seed files of an organization. the format is, you run- node config/db/add\_<seed file name> config/db/json_files/<seed file json>.json
They must be run in this order-
    1. organization
    2. users(must have atleast one user, and should include an admin)
    3. teams
    4. jobroles
    5. org_tags
    6. actionschemas
    7. my_tags
    8. level
    9. abilities
    10. badges

3. Run the app as- node app/server.js

4. Access the webpages at- localhost:3004/public/

##Dev TODOs
1. Once the system is stable, make sure all the packages we're using are included in package.json as dependencies or devDependencies(currently no devDependencies)
2. Make a seed file for roles, capabilities and system activities so that it is easy when deploying or setting the project up in someone's development machine.
