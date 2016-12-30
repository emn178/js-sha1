// Node.js env
expect = require('expect.js');
sha1 = require('../src/sha1.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha1.js')];
delete require.cache[require.resolve('./test.js')];
sha1 = null;

// Webpack browser env
JS_SHA1_NO_NODE_JS = true;
window = global;
sha1 = require('../src/sha1.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha1.js')];
delete require.cache[require.resolve('./test.js')];
sha1 = null;

// browser env
JS_SHA1_NO_NODE_JS = true;
JS_SHA1_NO_COMMON_JS = true;
window = global;
require('../src/sha1.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha1.js')];
delete require.cache[require.resolve('./test.js')];
sha1 = null;

// browser AMD
JS_SHA1_NO_NODE_JS = true;
JS_SHA1_NO_COMMON_JS = true;
window = global;
define = function (func) {
  sha1 = func();
  require('./test.js');
};
define.amd = true;

require('../src/sha1.js');
