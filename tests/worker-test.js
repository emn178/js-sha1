(function (Worker, WORKER, SOURCE) {
  var cases = {
    'da39a3ee5e6b4b0d3255bfef95601890afd80709': '',
    '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12': 'The quick brown fox jumps over the lazy dog',
    '408d94384216f890ff7a0c3528e8bed1e0b01621': 'The quick brown fox jumps over the lazy dog.'
  };

  describe('#sha1', function () {
    Object.keys(cases).forEach(function (hash) {
      it('should be equal', function (done) {
        var worker = new Worker(WORKER);
        worker.onmessage = function(event) {
          expect(event.data).to.be(hash);
          if (worker.terminate) {
            worker.terminate();
          }
          done();
        };
        worker.postMessage(SOURCE);
        worker.postMessage(cases[hash]);
      });
    });
  });
})(Worker, WORKER, SOURCE);
