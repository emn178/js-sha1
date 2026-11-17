import { createRequire } from 'module';
import expect from 'expect.js';
import * as esm from '../build/sha1.mjs';
import * as esmMin from '../build/sha1.min.mjs';
import * as esmNode from '../build/sha1.node.mjs';
import * as pkg from 'js-sha1';

const require = createRequire(import.meta.url);

globalThis.expect = expect;

[['build/sha1.mjs', esm], ['build/sha1.min.mjs', esmMin], ['build/sha1.node.mjs', esmNode], ['js-sha1', pkg]].forEach(([name, mod]) => {
  describe('ESM ' + name, () => {
    it('should export the named member matching the default export', () => {
      expect(mod.sha1).to.be(mod.default);
      expect(mod.default.hmac).to.be.a('function');
    });
  });

  globalThis.sha1 = mod.default;
  delete require.cache[require.resolve('./test.js')];
  delete require.cache[require.resolve('./hmac-test.js')];
  require('./test.js');
  require('./hmac-test.js');
});
