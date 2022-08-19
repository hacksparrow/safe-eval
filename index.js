var vm = require('vm')

var unSafe = ['global', 'exec', 'require'];

module.exports = function safeEval (code, context, opts) {
  var isUnsafe = unSafe.some(value => code.includes(value));
  if (isUnsafe) return throw new Error('Error: unsafe code!');
  
  var sandbox = {}
  var resultKey = 'SAFE_EVAL_' + Math.floor(Math.random() * 1000000)
  sandbox[resultKey] = {}
  var clearContext = `
    (function() {
      Function = undefined;
      const keys = Object.getOwnPropertyNames(this).concat(['constructor']);
      keys.forEach((key) => {
        const item = this[key];
        if (!item || typeof item.constructor !== 'function') return;
        this[key].constructor = undefined;
      });
    })();
  `
  code = clearContext + resultKey + '=' + code
  if (context) {
    Object.keys(context).forEach(function (key) {
      sandbox[key] = context[key]
    })
  }
  vm.runInNewContext(code, sandbox, opts)
  return sandbox[resultKey]
}
