# Change Log

## v0.8.0 / 2026-11-17
### Added
- ESM builds and package `exports`.

### Fixed
- Incorrect hash for strings with unpaired UTF-16 surrogates; they are now encoded as U+FFFD, the same as `TextEncoder`.
- Detect browsers with a `process` polyfill (e.g. BrowserFS) and Electron renderers as non-Node.js environments.

### Changed
- Replace Travis CI with GitHub Actions.
- Update dev dependencies and fix security issues.

## v0.7.0 / 2024-01-24
### Added
- TypeScript interfaces. #6, #9
- HMAC feature.
- support for web worker. #14

### Fixed
- deprecated `new Buffer`, replace with `Buffer.from`. #10
- dependencies and security issues.
- refactor: simplify formatMessage internal logic.
- Generates incorrect hash in some cases.

### Changed
- remove `eval` and use `require` directly. #8
- throw error by Error oject.
- throw error if update after finalize
- use unsigned right shift.

## v0.6.0 / 2017-12-21
### Fixed
- incorrect result when first bit is 1 of bytes.

### Changed
- prevent webpack to require dependencies.

## v0.5.0 / 2017-10-31
### Fixed
- incorrect result when file size >= 512M.

## v0.4.1 / 2016-12-30
### Fixed
- ArrayBuffer dosen't work in Webpack.

## v0.4.0 / 2016-12-05
### Added
- update method.
- support Array output.
- support ArrayBuffer output.
- support AMD.

## v0.3.0 / 2015-03-04
### Added
- support ArrayBuffer input.
### Changed
- improve performance.

## v0.2.0 / 2015-02-16
### Added
- support byte array input.
- test cases.
### Removed
- ascii parameter.
### Changed
- improve performance.

## v0.1.3 / 2015-01-07
### Added
- bower package.
- travis.
- coveralls.
### Fixed
- JSHint warnings.

## v0.1.2 / 2014-07-27
### Fixed
- accents bug.

## v0.1.1 / 2014-01-05
### Changed
- update license.

## v0.1.0 / 2014-01-04
### Added
- initial release.
