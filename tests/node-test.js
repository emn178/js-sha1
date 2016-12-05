sha1 = require('../src/sha1.js');
expect = require('expect.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha1.js')]
delete require.cache[require.resolve('./test.js')]
sha1 = null;

JS_SHA1_TEST = true;
require('../src/sha1.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha1.js')];
delete require.cache[require.resolve('./test.js')];
sha1 = null;

define = function (func) {
  sha1 = func();
  require('./test.js');
};
define.amd = true;

require('../src/sha1.js');
