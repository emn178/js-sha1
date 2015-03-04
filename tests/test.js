(function(sha1) {
  describe('ascii', function() {
    describe('less than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha1('')).to.be('da39a3ee5e6b4b0d3255bfef95601890afd80709');
        expect(sha1('The quick brown fox jumps over the lazy dog')).to.be('2fd4e1c67a2d28fced849ee1bb76e7391b93eb12');
        expect(sha1('The quick brown fox jumps over the lazy dog.')).to.be('408d94384216f890ff7a0c3528e8bed1e0b01621');
      });
    });

    describe('more than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha1('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('8690faab7755408a03875895176fac318f14a699');
      });
    });
  });

  describe('UTF8', function() {
    describe('less than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha1('中文')).to.be('7be2d2d20c106eee0836c9bc2b939890a78e8fb3');
        expect(sha1('aécio')).to.be('9e4e5d978deced901d621475b03f1ded19e945bf');
        expect(sha1('𠜎')).to.be('4667688a63420661469c8dbc0f871770349bab08');
      });
    });

    describe('more than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha1('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('ad8aae581c915fe01c4964a5e8b322cae74ee5c5');
        expect(sha1('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('3a15ad3ce9efdd4bf982eaaaecdeda36a887a3f9');
      });
    });
  });

  describe('special length', function() {
    it('should be successful', function() {
      expect(sha1('0123456780123456780123456780123456780123456780123456780')).to.be('4cdeae78e8b7285aef73e0a15eec7d5b30f3f3e3');
      expect(sha1('01234567801234567801234567801234567801234567801234567801')).to.be('e657e6bb6b5d0c2bf7e929451c14a5302589a60b');
      expect(sha1('0123456780123456780123456780123456780123456780123456780123456780')).to.be('e7ad97591c1a99d54d80751d341899769884c75a');
      expect(sha1('01234567801234567801234567801234567801234567801234567801234567801234567')).to.be('55a13698cdc010c0d16dab2f7dc10f43a713f12f');
      expect(sha1('012345678012345678012345678012345678012345678012345678012345678012345678')).to.be('006575418c27b0158e55a6d261c46f86b33a496a');
    });
  });

  describe('Array', function() {
    describe('Array', function() {
      it('should be successful', function() {
        expect(sha1([])).to.be('da39a3ee5e6b4b0d3255bfef95601890afd80709');
        expect(sha1([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])).to.be('2fd4e1c67a2d28fced849ee1bb76e7391b93eb12');
        expect(sha1([48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55])).to.be('55a13698cdc010c0d16dab2f7dc10f43a713f12f');
      });
    });

    describe('Uint8Array', function() {
      it('should be successful', function() {
        expect(sha1(new Uint8Array([]))).to.be('da39a3ee5e6b4b0d3255bfef95601890afd80709');
      });
    });

    describe('ArrayBuffer', function() {
      it('should be successful', function() {
        expect(sha1(new ArrayBuffer(0))).to.be('da39a3ee5e6b4b0d3255bfef95601890afd80709');
        expect(sha1(new ArrayBuffer(1))).to.be('5ba93c9db0cff93f52b521d7420e43f6eda2784f');
      });
    });
  });
})(sha1);
