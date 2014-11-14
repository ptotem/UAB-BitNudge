Bitnudge follows a RESTful API Design. Links that can help understand this are- http://www.restapitutorial.com/
Also, the Google Plus Api can be used as a reference on how to implement the RESTful design in a real world application.

All the routes can be found in the app/api/ folder. Each collection is further organized into its own folder. In addition to this, there are 2 folders- Test1 and Test, which contain routes required just for testing the system and for test pages to work. The routes that we will keep in the final version, can be moved into its specified folder, after prior discussion.

In Bitnudge, there are basically 3 collections. Organizations, Teams and Users. Every resource exists within these collections. In fact, Users and Teams themselves exist only within the Organizations collection. This logical structuring of the routes is required for the authorization module to work, as well as to enforce good RESTful design. 

Thus, every resource that exists within a collection, must include the collection in the URL.
For example, for getting a user, since users exist within an organization, the route must be- /org/:orgId/users/:userId instead of /users/:userId
