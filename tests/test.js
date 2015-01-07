describe('ascii', function() {
  describe('less than 64 bytes', function() {
    it('should be successful', function() {
      expect(sha1('')).to.be('da39a3ee5e6b4b0d3255bfef95601890afd80709');
      expect(sha1('The quick brown fox jumps over the lazy dog')).to.be('2fd4e1c67a2d28fced849ee1bb76e7391b93eb12');
      expect(sha1('The quick brown fox jumps over the lazy dog.', true)).to.be('408d94384216f890ff7a0c3528e8bed1e0b01621');
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
    });
  });

  describe('more than 64 bytes', function() {
    it('should be successful', function() {
      expect(sha1('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('3a15ad3ce9efdd4bf982eaaaecdeda36a887a3f9');
    });
  });
});
