##Route Validation in BitNudge
Every route defined in BitNudge needs serverside validation. Currently, the idea is to build a validation package and include it, as none of the other restify validation packages are suited to our needs.

The work on the package is currently at node-url-validation on github.

###Architecture

So this is how validation can be implemented-
- Every route directory must have a ResourceDescription file. This file contains all the information required to validate each route of the resource.
- This file must present a function called authorizeAndValidate which takes the model and method as arguments, and runs the required validation.
- This file first runs the AuthorizationController and authorizes the request, and then runs validation on it through node-url-validation.
- This file is then called in the resource file, and the authorizeAndValidate function is included in the route chain.

###Functionality

The basic functionality that Route-Validation should do is-
- In POST requests, make sure that only valid fields are posted. Also, each field value must be valid. For example, we cant have clients sending Integer where ObjectId is expected.
- In all routes, if certain fields are required (in the url or otherwise), then make sure that they are given
- In GET requests, there should be a list of default fields given if the client doesnt specify what fields he needs.

####However, priority of this can be low. We need not even need to provide this module in version 1.
