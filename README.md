# ptrace
easily trace execution order of your promise-based program

## example

    function getUser(userId) {
      return minq.from('users').byId(userId).expect().one()
    }

    // pass a label, a promise-returning function, and arguments:
    ptrace('getUser', getUser, 23).then(function (user) {
      // do stuff
    })

Console output:

    1 invoking getUser ( 23 )
    1 resolved {id: 23, name: 'jden' }

## api

using [jsig notation](https://github.com/jden/jsig)

### `ptrace(stepName: String, fn: () => Promise, ...args: Value) => Promise`
trace invocations of a promise-returning function,
logging messages on invocation and resolution/rejection

### `ptrace.log`

Logging function to use. Defaults to console.log. If you'd like, override with your own logging function of signature `(str: String) => void`

### `ptrace.debug`

Boolean, defaults to false. If false, logging will only occur if `process.env.DEBUG` is truthy. Override this flag to a truthy value to force logging.

## installation

    $ npm install ptrace

## running the tests

From package root:
  
    $ npm install
    $ npm test

## contributors

jden <jason@denizac.org>

## license

MIT. (c) 2013 jden <jason@denizac.org>. See LICENSE.md