'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;

var _deconstructPath = require('./deconstructPath');

var _deconstructPath2 = _interopRequireDefault(_deconstructPath);

var _checkValidPath = require('./checkValidPath');

var _checkValidPath2 = _interopRequireDefault(_checkValidPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets a the value at the end of the path.
 *
 * Note: This function does not return a clone of this value, so if the return
 *  result of this function is an object, modifying it will also change the original
 *  object it was grabbed from.
 *
 * @param {Object} object
 * @param {Array|string} path
 * @param {*} [defaultValue]
 * @return {*}
 */
function get(path, object, defaultValue) {
  var arrayPath = Array.isArray(path) ? path : (0, _deconstructPath2.default)(path);
  (0, _checkValidPath2.default)(arrayPath);
  var currentValue = arrayPath.reduce(function (current, next) {
    return typeof current === 'undefined' ? current : current[next];
  }, object);

  // Should this clone? the current value? It might use a different ref--not sure.
  return typeof currentValue !== 'undefined' ? currentValue : defaultValue;
}
//# sourceMappingURL=get.js.map