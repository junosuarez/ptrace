var dir = require('util').inspect
// ptrace(stepName: String, fn: () => Promise) => () => Promise
// trace invocations of a promise-returning function,
// logging messages on invocation and resolution/rejection
module.exports = function ptrace (stepName, fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    log(inc(stepName) + ' invoking ' + stepName + ' (' + args.join(',') + ')')
    var promise = fn.apply(this, args)

    return !(process.env.DEBUG || module.exports.debug) ? promise :
      promise.then(function (res) {
        log(counter[stepName] + ' resolved ' + (res ? dir(res) : ''))
        return res
      }, function (err) {
        log(counter[stepName] + ' rejected ' + err)
        throw err
      })
  }
}

var counter = {}
function inc(stepName) {
  if (!counter[stepName]) {
    counter[stepName] = 0
  }

  return ++counter[stepName]
}

function log(str) {
  if (!(process.env.DEBUG || module.exports.debug)) { return }
  module.exports.log(str)
}

module.exports.log = console.log.bind(console)
module.exports.debug