var vm = require('vm')
var sandbox = {
  result: null
}

module.exports = function safeEval (code) {
  code = 'result = ' + code
  vm.runInNewContext(code, sandbox)
  return sandbox.result
}
