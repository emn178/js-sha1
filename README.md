# js-sha1
[![CI](https://github.com/emn178/js-sha1/actions/workflows/ci.yml/badge.svg)](https://github.com/emn178/js-sha1/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/emn178/js-sha1/badge.svg?branch=master)](https://coveralls.io/r/emn178/js-sha1?branch=master)
[![NPM](https://img.shields.io/npm/v/js-sha1)](https://www.npmjs.com/package/js-sha1)
[![CDNJS](https://img.shields.io/jsdelivr/npm/hm/js-sha1)](https://www.jsdelivr.com/package/npm/js-sha1)

A simple SHA1 hash function for JavaScript supports UTF-8 encoding.

## Demo
[SHA1 Online](https://emn178.github.io/online-tools/sha1.html)  
[SHA1 File Checksum Online](https://emn178.github.io/online-tools/sha1_checksum.html)

## Download
[Compress](https://raw.github.com/emn178/js-sha1/master/build/sha1.min.js)  
[Uncompress](https://raw.github.com/emn178/js-sha1/master/src/sha1.js)

## Installation
You can also install js-sha1 by using Bower.

    bower install js-sha1

For node.js, you can use this command to install:

    npm install js-sha1

## Notice
NIST formally deprecated use of SHA-1 in 2011 and disallowed its use for digital signatures in 2013, and declared that it should be phased out by 2030. However, SHA-1 is still secure for HMAC. [wiki](https://en.wikipedia.org/wiki/SHA-1)

## Usage
You could use like this:
```JavaScript
sha1('Message to hash');
var hash = sha1.create();
hash.update('Message to hash');
hash.hex();

// HMAC
sha1.hmac('key', 'Message to hash');

var hash = sha1.hmac.create('key');
hash.update('Message to hash');
hash.hex();
```

### Node.js
If you use node.js, you should require the module first:
```JavaScript
var sha1 = require('js-sha1');
```

### ESM
If you use node.js ESM or a bundler, you can import like this:
```JavaScript
import { sha1 } from 'js-sha1';
// or
import sha1 from 'js-sha1';
```

In browsers, you can import the ESM build directly:
```HTML
<script type="module">
  import { sha1 } from 'https://cdn.jsdelivr.net/npm/js-sha1/build/sha1.min.mjs';
</script>
```

### TypeScript
If you use TypeScript, you can import like this:
```TypeScript
import { sha1 } from 'js-sha1';
```

## RequireJS
It supports AMD:
```JavaScript
require(['your/path/sha1.js'], function(sha1) {
// ...
});
```

## Example
```JavaScript
sha1(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
sha1('The quick brown fox jumps over the lazy dog'); // 2fd4e1c67a2d28fced849ee1bb76e7391b93eb12
sha1('The quick brown fox jumps over the lazy dog.'); // 408d94384216f890ff7a0c3528e8bed1e0b01621

// It also supports UTF-8 encoding
sha1('中文'); // 7be2d2d20c106eee0836c9bc2b939890a78e8fb3

// Unpaired surrogates are encoded as U+FFFD, the same as TextEncoder
sha1('\ud800'); // 9bdb77276c1852e1fb067820472812fcf6084024

// It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
sha1([]); // da39a3ee5e6b4b0d3255bfef95601890afd80709
sha1(new Uint8Array([])); // da39a3ee5e6b4b0d3255bfef95601890afd80709

// Different output
sha1(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
sha1.hex(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
sha1.array(''); // [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]
sha1.digest(''); // [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]
sha1.arrayBuffer(''); // ArrayBuffer

// HMAC
sha1.hmac.hex('key', 'Message to hash');
sha1.hmac.array('key', 'Message to hash');
// ...
```

## Benchmark
- [Benchmark (measurethat.net) - Short String](https://measurethat.net/Benchmarks/Show/36035/0/sha1-performance-comparison---short-string)
- [Benchmark (measurethat.net) - Long String](https://measurethat.net/Benchmarks/Show/36036/0/sha1-performance-comparison---long-string)
- [Benchmark (measurethat.net) - Very Long String](https://measurethat.net/Benchmarks/Show/36037/0/sha1-performance-comparison---very-long-string)
- [Async Benchmark (measurethat.net) - Short String](https://measurethat.net/Benchmarks/Show/36039/0/sha1-performance-comparison---async-short-string)
- [Async Benchmark (measurethat.net) - Very Long String](https://measurethat.net/Benchmarks/Show/36038/0/sha1-performance-comparison---async-very-long-string)

js-sha1 is a small, synchronous, pure JavaScript implementation with correct UTF-8 handling. For large data, WebAssembly-based libraries (e.g. Hash-WASM) or the asynchronous Web Crypto API are faster.

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/js-sha1  
Author: Chen, Yi-Cyuan (emn178@gmail.com)
