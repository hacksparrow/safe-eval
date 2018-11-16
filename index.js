var vm = require('vm')

function clearContext () {
  // eslint-disable-next-line no-global-assign
  Function = undefined
  const keys = Object.getOwnPropertyNames(this).concat(['constructor'])
  keys.forEach((key) => {
    const item = this[key]
    if (!item) return
    if (typeof Object.getPrototypeOf(item).constructor === 'function') {
      Object.getPrototypeOf(item).constructor = undefined
    }
    if (typeof item.constructor === 'function') {
      this[key].constructor = undefined
    }
  })
}

module.exports = function safeEval (code, context, opts) {
  var sandbox = {}
  var resultKey = 'SAFE_EVAL_' + Math.floor(Math.random() * 1000000)
  sandbox[resultKey] = {}
  var clearContextCall = `(${clearContext.toString()})();`
  code = `${clearContextCall}${resultKey}=${code}`
  if (context) {
    Object.keys(context).forEach(function (key) {
      if (context[key] === Function) return
      sandbox[key] = context[key]
    })
  }
  vm.runInNewContext(code, sandbox, opts)
  return sandbox[resultKey]
}
