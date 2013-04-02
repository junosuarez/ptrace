var chai = require('chai')
chai.should()
var sinon = require('sinon')
chai.use(require('sinon-chai'))
var Q = require('q')

var ptrace = require('../index')

describe('ptrace', function () {
  it('invokes the function with args', function (done) {
    var fn = sinon.stub().returns(Q.resolve())
    var fn2 = ptrace('foo', fn)

    fn2('baz', 543).then(function () {
      fn.should.have.been.calledWithExactly('baz', 543)
    }).then(done, done)

  })

  it('invokes the function with no args', function (done) {
    var fn = sinon.stub().returns(Q.resolve())
    var fn2 = ptrace('foo', fn)

    fn2().then(function () {
      fn.should.have.been.called
    }).then(done, done)

  })

  it('should log resolved', function (done) {

    process.env.DEBUG = true

    var fn = function () { return Q.resolve() }
    ptrace.log = sinon.spy()
    var fn2 = ptrace('foo', fn)

    fn2().then(function () {
      ptrace.log.should.have.been.calledTwice
      ptrace.log.firstCall.args.should.match(/invoking/)
      ptrace.log.secondCall.args.should.match(/resolved/)
    }).then(done).done()

  })

  it('should log rejected', function (done) {

    process.env.DEBUG = true

    var fn = function () { return Q.reject() }
    ptrace.log = sinon.spy()

    var fn2 = ptrace('foo', fn)
    fn2().then(null, function () {
      ptrace.log.should.have.been.calledTwice
      ptrace.log.firstCall.args.should.match(/invoking/)
      ptrace.log.secondCall.args.should.match(/rejected/)
    }).then(done).done()

  })
})