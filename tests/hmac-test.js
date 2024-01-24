(function (sha1) {
  Array.prototype.toHexString = ArrayBuffer.prototype.toHexString = function () {
    var array = new Uint8Array(this);
    var hex = '';
    for (var i = 0; i < array.length; ++i) {
      var c = array[i].toString('16');
      hex += c.length === 1 ? '0' + c : c;
    }
    return hex;
  };

  var testCases = {
    sha1_hmac: {
      'Test Vectors': {
        'b617318655057264e28bc0b6fb378c8ef146be00': [
          [0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b],
          'Hi There'
        ],
        'effcdf6ae5eb2fa2d27416d5f184df9c259a7c79': [
          'Jefe',
          'what do ya want for nothing?'
        ],
        '125d7342b9ac11cd91a39af48aa17b4f63f175d3': [
          [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa],
          [0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd, 0xdd]
        ],
        '4c9007f4026250c6bc8414f9bf50c86c2d7235da': [
          [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19],
          [0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd, 0xcd]
        ],
        '4c1a03424b55e07fe7f27be1d58bb9324a9a5a04': [
          [0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c],
          'Test With Truncation'
        ],
        'aa4ae5e15272d00e95705637ce8a3b55ed402112': [
          [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa],
          'Test Using Larger Than Block-Size Key - Hash Key First'
        ],
        'e8e99d0f45237d786d6bbaa7965c7808bbff1a91': [
          [0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa],
          'Test Using Larger Than Block-Size Key and Larger Than One Block-Size Data'
        ]
      },
      'UTF8': {
        'f495de6d0f1b5681070a024bbaed5b5f42847306': ['中文', '中文'],
        '58891d68487ffebddba5925abedec77a5a578db2': ['aécio', 'aécio'],
        'a1816bff2dae324c283aeab564d5edb5170fbada': ['𠜎', '𠜎']
      }
    }
  };

  if (!(typeof JS_SHA1_NO_ARRAY_BUFFER === 'boolean' && JS_SHA1_NO_ARRAY_BUFFER)) {
    testCases.sha1_hmac.Uint8Array = {
      '69536cc84eee5fe51c5b051aff8485f5c9ef0b58': [
        new Uint8Array(0),
        'Hi There'
      ]
    };
    testCases.sha1_hmac.ArrayBuffer = {
      '69536cc84eee5fe51c5b051aff8485f5c9ef0b58': [
        new ArrayBuffer(0),
        'Hi There'
      ]
    };
  }

  var errorTestCases = [null, undefined, { length: 0 }, 0, 1, false, true, NaN, Infinity, function () {}];

  function runTestCases(name, algorithm) {
    var methods = [
      {
        name: name,
        call: algorithm,
      },
      {
        name: name + '.hex',
        call: algorithm.hex
      },
      {
        name: name + '.array',
        call: function (key, message) {
          return algorithm.array(key, message).toHexString();
        }
      },
      {
        name: name + '.digest',
        call: function (key, message) {
          return algorithm.digest(key, message).toHexString();
        }
      },
      {
        name: name + '.arrayBuffer',
        call: function (key, message) {
          return algorithm.arrayBuffer(key, message).toHexString();
        }
      }
    ];

    var classMethods = [
      {
        name: 'create',
        call: function (key, message) {
          return algorithm.create(key).update(message).toString();
        }
      },
      {
        name: 'update',
        call: function (key, message) {
          return algorithm.update(key, message).toString();
        }
      },
      {
        name: 'hex',
        call: function (key, message) {
          return algorithm.update(key, message).hex();
        }
      },
      {
        name: 'array',
        call: function (key, message) {
          return algorithm.update(key, message).array().toHexString();
        }
      },
      {
        name: 'digest',
        call: function (key, message) {
          return algorithm.update(key, message).digest().toHexString();
        }
      },
      {
        name: 'arrayBuffer',
        call: function (key, message) {
          return algorithm.update(key, message).arrayBuffer().toHexString();
        }
      },
      {
        name: 'finalize',
        call: function (key, message) {
          var hash = algorithm.update(key, message);
          hash.hex();
          return hash.hex();
        }
      }
    ];

    var subTestCases = testCases[name];

    describe(name, function () {
      methods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message[0], message[1])).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      classMethods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message[0], message[1])).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      describe('#' + name, function () {
        errorTestCases.forEach(function (testCase) {
          context('when ' + testCase, function () {
            it('should throw error', function () {
              expect(function () {
                algorithm(testCase, '');
              }).to.throwError(/input is invalid type/);
            });
          });
        });
      });
    });
  }

  runTestCases('sha1_hmac', sha1.hmac);
})(sha1);
