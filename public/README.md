## The `public` Directory

####The `public` directory hosts the client-side angular app.

Every subdirectory is it's own related sets of models, services, directives, controllers, etc. and must include
a manifest-like file that will most likely have the same name as the subdirectory which creates an angular module
out of all the individual components. See the `examples` subdirectory.

The are two special subdirectories in this directory:

 1. `common`:
  * first-party assets used throughout the client side
 2. `vendor`:
  * third-party assets used throughout the client side

####Conventions

 * Models
  * Naming: `ExampleModel`
  * Construct: `angular.service`
 * Controllers
  * Naming: `ExampleController`
  * Construct: `angular.controller`
 * Services
  * Naming: `exampleService`
  * Construct: `angular.factory`
 * Directives
  * Naming: `exampleDirective`
  * Construct: `angular.directive`
 * Templates
  * Naming: `example.tmpl`
  * Accompanying styles are to be `<link>`ed in index.html so that they are bundled for production correctly (as
  opposed to placing the `<link>` in the `*.tmpl` template).