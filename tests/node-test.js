expect = require('expect.js');
Worker = require("tiny-worker");

function unset() {
  delete require.cache[require.resolve('../src/sha1.js')];
  delete require.cache[require.resolve('./test.js')];
  delete require.cache[require.resolve('./hmac-test.js')];
  sha1 = null;
  BUFFER = undefined;
  JS_SHA1_NO_WINDOW = undefined;
  JS_SHA1_NO_NODE_JS = undefined;
  JS_SHA1_NO_COMMON_JS = undefined;
  JS_SHA1_NO_ARRAY_BUFFER = undefined;
  JS_SHA1_NO_ARRAY_BUFFER_IS_VIEW = undefined;
  window = undefined;
}

function runCommonJsTest() {
  sha1 = require('../src/sha1.js');
  require('./test.js');
  require('./hmac-test.js');
  unset();
}

function runWindowTest() {
  window = global;
  require('../src/sha1.js');
  require('./test.js');
  require('./hmac-test.js');
  unset();
}

// Node.js env
BUFFER = true;
runCommonJsTest();

// Node.js env, no Buffer.from
JS_SHA1_NO_BUFFER_FROM = true
runCommonJsTest();

// Webpack browser env
JS_SHA1_NO_NODE_JS = true;
runCommonJsTest();

// browser env
JS_SHA1_NO_NODE_JS = true;
JS_SHA1_NO_COMMON_JS = true;
runWindowTest();

// browser env and no array buffer
JS_SHA1_NO_NODE_JS = true;
JS_SHA1_NO_COMMON_JS = true;
JS_SHA1_NO_ARRAY_BUFFER = true;
runWindowTest();

// browser env and no isView
JS_SHA1_NO_NODE_JS = true;
JS_SHA1_NO_COMMON_JS = true;
JS_SHA1_NO_ARRAY_BUFFER_IS_VIEW = true;
runWindowTest();

// browser AMD
JS_SHA1_NO_NODE_JS = true;
JS_SHA1_NO_COMMON_JS = true;
window = global;
define = function (func) {
  sha1 = func();
  require('./test.js');
  require('./hmac-test.js');
};
define.amd = true;

require('../src/sha1.js');
unset();

// webworker
WORKER = 'tests/worker.js';
SOURCE = 'src/sha1.js';

require('./worker-test.js');

delete require.cache[require.resolve('./worker-test.js')];

// cover webworker
JS_SHA1_NO_WINDOW = true;
JS_SHA1_NO_NODE_JS = true;
WORKER = './worker.js';
SOURCE = '../src/sha1.js';
window = global;
self = global;

Worker = function (file) {
  require(file);
  currentWorker = this;

  this.postMessage = function (data) {
    onmessage({data: data});
  };
}

postMessage = function (data) {
  currentWorker.onmessage({data: data});
}

importScripts = function () {};

sha1 = require('../src/sha1.js');
require('./worker-test.js');







// sha1 = require('../src/sha1.js');
// require('./test.js');

// delete require.cache[require.resolve('../src/sha1.js')];
// delete require.cache[require.resolve('./test.js')];
// delete require.cache[require.resolve('./hmac-test.js')];
// sha1 = null;

// // Webpack browser env
// JS_SHA1_NO_NODE_JS = true;
// window = global;
// sha1 = require('../src/sha1.js');
// require('./test.js');

// delete require.cache[require.resolve('../src/sha1.js')];
// delete require.cache[require.resolve('./test.js')];
// delete require.cache[require.resolve('./hmac-test.js')];
// sha1 = null;

// // browser env
// JS_SHA1_NO_NODE_JS = true;
// JS_SHA1_NO_COMMON_JS = true;
// window = global;
// require('../src/sha1.js');
// require('./test.js');

// delete require.cache[require.resolve('../src/sha1.js')];
// delete require.cache[require.resolve('./test.js')];
// delete require.cache[require.resolve('./hmac-test.js')];
// sha1 = null;

// // browser AMD
// JS_SHA1_NO_NODE_JS = true;
// JS_SHA1_NO_COMMON_JS = true;
// window = global;
// define = function (func) {
//   sha1 = func();
//   require('./test.js');
//   require('./hmac-test.js');
// };
// define.amd = true;

// require('../src/sha1.js');
