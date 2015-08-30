# safe-eval

## What is this?

`safe-eval` lets you execute JavaScript code without having to use the much discouraged and feared upon `eval()`. `safe-eval` has access to all the standard JavaScript objects of the underlying engine. It is implemented using [node's vm module](https://nodejs.org/api/vm.html).

Currently, it works only with Node.js, and the JavaScript code must be an expression (something which evaluates to a value).

## Installation

```sh
npm install safe-eval --save
```

## Usage

```js
var safeEval = require('safe-eval')

// string concatenation
var code = '"app" + "le"'
var evaluated = safeEval(code) // "apple"

// math
var code = 'Math.floor(22/7)'
var evaluated = safeEval(code) // 3.142857142857143

// JSON
var code = '{name: "Borat", hobbies: ["disco dance", "sunbathing"]}'
var evaluated = safeEval(code) // {name: "Borat", hobbies: ["disco dance", "sunbathing"]}

// function expression
var code = '(function square(b) { return b * b; })(5)'
var evaluated = safeEval(code) // 25

// no access to Node.js objects
var code = 'process'
safeEval(code) // THROWS!

```
