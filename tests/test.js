assert('sha1 1', 'da39a3ee5e6b4b0d3255bfef95601890afd80709', sha1(''));
assert('sha1 2', '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12', sha1('The quick brown fox jumps over the lazy dog'));
assert('sha1 3', '408d94384216f890ff7a0c3528e8bed1e0b01621', sha1('The quick brown fox jumps over the lazy dog.'));
assert('sha1 4', '7be2d2d20c106eee0836c9bc2b939890a78e8fb3', sha1('中文'));
assert('sha1 5', '9e4e5d978deced901d621475b03f1ded19e945bf', sha1('aécio'));
