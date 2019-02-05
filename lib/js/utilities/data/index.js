'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _cloneDeep = require('./cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _debounce = require('./debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _omit = require('./omit');

var _omit2 = _interopRequireDefault(_omit);

var _set = require('./set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Lodash replacements is a collection of functions designed to replace common lodash ones.
 * These function will more closely resemble lodash/fp functions in that they should be
 *   non-mutative and support the lodash/fp parameter order. They should _not_ support auto-
 *   currying for simplicity.
 */

exports.default = {
  clone: _clone2.default,
  cloneDeep: _cloneDeep2.default,
  debounce: _debounce2.default,
  get: _get2.default,
  omit: _omit2.default,
  set: _set2.default
};
//# sourceMappingURL=index.js.map