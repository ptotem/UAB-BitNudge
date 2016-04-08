##Authorization in BitNudge

Authorization in BitNudge is completely based on routes and the person calling the route. Since the api is RESTful, this is all the validation we'll ever need, unless we move away from the RESTful design.

###Architecture

The Authorization module is based on the role of the user. Each role has a specific set of capabilities. Which basically means that each role has a specific set of routes it is allowed to call. All this data is stored in the Roles Collection in the database itself.

The Architecture of the Authorization module is as follows-

- Model- Each resource in the system is represented as a model. This can be Users,Teams,Organization etc. Basically, anything that has a route.
- Method- Each of these resources can be called by the method which is basically the functionality the route does. Sometimes there can be different methods for different scopes. For example, listAll, listTeam etc. Other examples of these methods are-
  - get
  - list
  - create
  - update
  - delete
  - assign
  - accept
  - listAll
- Scope-
