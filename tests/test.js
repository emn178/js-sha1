(function (sha1) {
  Array.prototype.toHexString = ArrayBuffer.prototype.toHexString = function () {
    var array = new Uint8Array(this);
    var hex = '';
    for (var i = 0; i < array.length; ++i) {
      var c = array[i].toString('16');
      hex += c.length == 1 ? '0' + c : c;
    }
    return hex;
  };

  var testCases = {
    'ascii': {
      'da39a3ee5e6b4b0d3255bfef95601890afd80709': '',
      '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12': 'The quick brown fox jumps over the lazy dog',
      '408d94384216f890ff7a0c3528e8bed1e0b01621': 'The quick brown fox jumps over the lazy dog.'
    },
    'ascii more than 64 bytes': {
      '8690faab7755408a03875895176fac318f14a699': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
    },
    'UTF8': {
      '7be2d2d20c106eee0836c9bc2b939890a78e8fb3': '中文',
      '9e4e5d978deced901d621475b03f1ded19e945bf': 'aécio',
      '4667688a63420661469c8dbc0f871770349bab08': '𠜎'
    },
    'UTF8 more than 64 bytes': {
      'ad8aae581c915fe01c4964a5e8b322cae74ee5c5': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
      '3a15ad3ce9efdd4bf982eaaaecdeda36a887a3f9': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
    },
    'special length': {
      '4cdeae78e8b7285aef73e0a15eec7d5b30f3f3e3': '0123456780123456780123456780123456780123456780123456780',
      'e657e6bb6b5d0c2bf7e929451c14a5302589a60b': '01234567801234567801234567801234567801234567801234567801',
      'e7ad97591c1a99d54d80751d341899769884c75a': '0123456780123456780123456780123456780123456780123456780123456780',
      '55a13698cdc010c0d16dab2f7dc10f43a713f12f': '01234567801234567801234567801234567801234567801234567801234567801234567',
      '006575418c27b0158e55a6d261c46f86b33a496a': '012345678012345678012345678012345678012345678012345678012345678012345678'
    },
    'Array': {
      'da39a3ee5e6b4b0d3255bfef95601890afd80709': [],
      '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103],
      '55a13698cdc010c0d16dab2f7dc10f43a713f12f': [48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55]
    },
    'Uint8Array': {
      '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    },
    'Int8Array': {
      '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    },
    'ArrayBuffer': {
      '5ba93c9db0cff93f52b521d7420e43f6eda2784f': new ArrayBuffer(1)
    },
    'Object': {
      'da39a3ee5e6b4b0d3255bfef95601890afd80709': {what: 'ever'}
    }
  };

  if (typeof process == 'object') {
    testCases['Buffer'] = {
      'da39a3ee5e6b4b0d3255bfef95601890afd80709': new Buffer(0),
      '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12': new Buffer(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
  }

  var methods = [
    {
      name: 'sha1',
      call: sha1,
    },
    {
      name: 'sha1.hex',
      call: sha1.hex
    },
    {
      name: 'sha1.array',
      call: function (message) {
        return sha1.array(message).toHexString();
      }
    },
    {
      name: 'sha1.digest',
      call: function (message) {
        return sha1.digest(message).toHexString();
      }
    },
    {
      name: 'sha1.arrayBuffer',
      call: function (message) {
        return sha1.arrayBuffer(message).toHexString();
      }
    }
  ];

  var classMethods = [
    {
      name: 'create',
      call: function (message) {
        return sha1.create().update(message).toString();
      }
    },
    {
      name: 'update',
      call: function (message) {
        return sha1.update(message).toString();
      }
    },
    {
      name: 'hex',
      call: function (message) {
        return sha1.update(message).hex();
      }
    },
    {
      name: 'array',
      call: function (message) {
        return sha1.update(message).array().toHexString();
      }
    },
    {
      name: 'digest',
      call: function (message) {
        return sha1.update(message).digest().toHexString();
      }
    },
    {
      name: 'arrayBuffer',
      call: function (message) {
        return sha1.update(message).arrayBuffer().toHexString();
      }
    },
    {
      name: 'finalize',
      call: function (message) {
        var hash = sha1.update(message);
        hash.hex();
        hash.update(message);
        return hash.hex();
      }
    }
  ];

  methods.forEach(function (method) {
    describe('#' + method.name, function () {
      for (var testCaseName in testCases) {
        (function (testCaseName) {
          var testCase = testCases[testCaseName];
          context('when ' + testCaseName, function () {
            for (var hash in testCase) {
              (function (message, hash) {
                it('should be equal', function () {
                  expect(method.call(message)).to.be(hash);
                });
              })(testCase[hash], hash);
            }
          });
        })(testCaseName);
      }
    });
  });

  describe('Sha1', function () {
    classMethods.forEach(function (method) {
      describe('#' + method.name, function () {
        for (var testCaseName in testCases) {
          (function (testCaseName) {
            var testCase = testCases[testCaseName];
            context('when ' + testCaseName, function () {
              for (var hash in testCase) {
                (function (message, hash) {
                  it('should be equal', function () {
                    expect(method.call(message)).to.be(hash);
                  });
                })(testCase[hash], hash);
              }
            });
          })(testCaseName);
        }
      });
    });

    context('when large size', function () {
      var hash = sha1.create();
      hash.bytes = 4294967295;
      hash.update('any');
      expect(hash.hBytes).to.be(1);
    });
  });
})(sha1);
