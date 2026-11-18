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

// browser with a process polyfill (e.g. BrowserFS)
window = global;
runCommonJsTest();

// Electron renderer
process.type = 'renderer';
sha1 = require('../src/sha1.js');
delete process.type;
require('./test.js');
require('./hmac-test.js');
unset();

// environment detection in isolated contexts (no Node.js globals)
describe('environment detection', function () {
  var vm = require('vm');
  var fs = require('fs');
  var path = require('path');
  var source = fs.readFileSync(path.join(__dirname, '../src/sha1.js'), 'utf8');

  function run(sandbox, script) {
    var context = vm.createContext(sandbox);
    if (script) {
      vm.runInContext(script, context);
    }
    vm.runInContext(source, context);
    return sandbox.sha1;
  }

  function check(sha1) {
    expect(sha1('abc')).to.be('a9993e364706816aba3e25717850c26c9cd0d89d');
    expect(sha1('中文')).to.be('7be2d2d20c106eee0836c9bc2b939890a78e8fb3');
    expect(sha1.hmac('key', 'abc')).to.be('4fd0b215276ef12f2b3e4c8ecac2811498b656fc');
  }

  it('should not treat a browser with a process polyfill as Node.js', function () {
    var sandbox = { process: { versions: { node: '18.0.0' }, env: {} } };
    sandbox.window = sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should not treat an Electron renderer as Node.js', function () {
    var sandbox = { process: { type: 'renderer', versions: { node: '20.0.0' } } };
    sandbox.window = sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should expose to the global scope in a web worker', function () {
    var sandbox = {};
    sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should load in a browser without ArrayBuffer', function () {
    var sandbox = {};
    sandbox.window = sandbox;
    check(run(sandbox, 'delete ArrayBuffer; delete Uint8Array; delete DataView;'));
  });
});

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
