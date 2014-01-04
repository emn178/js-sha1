# js-sha1
This is a simple SHA1 hash function for JavaScript supports UTF-8 encoding.

## Install
For node.js, you can use this command to install:

    npm install js-sha1

## Usage
If you use node.js, you should require the module first:

    var sha1 = require('js-sha1');

And you could use like this:

    sha1('Message to hash');

## Example
Code

    sha1('');
    sha1('The quick brown fox jumps over the lazy dog');
    sha1('The quick brown fox jumps over the lazy dog.');
Output

    da39a3ee5e6b4b0d3255bfef95601890afd80709
    2fd4e1c67a2d28fced849ee1bb76e7391b93eb12
    408d94384216f890ff7a0c3528e8bed1e0b01621

It also support UTF-8 encoding:

Code

    sha1('中文');
Output

    7be2d2d20c106eee0836c9bc2b939890a78e8fb3

## Tests
You can open `tests/index.html` in browser or use node.js to run `node tests/node-test.js` for test.

You also could use `npm test` instance of `node tests/node-test.js`.

## Extensions
### jQuery
If you prefer jQuery style, you can add following code to add a jQuery extension.

Code

    jQuery.sha1 = sha1
And then you could use like this:

    $.sha1('message');
### Prototype
If you prefer prototype style, you can add following code to add a prototype extension.

Code

    String.prototype.sha1 = function() {
      return sha1(this);
    };
And then you could use like this:

    'message'.sha1();

## Contact
The project's website is located at https://github.com/emn178/js-sha1  
Author: emn178@gmail.com
