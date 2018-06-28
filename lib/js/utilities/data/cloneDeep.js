'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = cloneDeep;

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Deeply clones an object. It's probably not super performant on deeply nested objects, but
 *  it gets the job done for now.
 *
 * Functions retain the same reference, but their `this` context changes like we'd expect.
 *
 * @param {Array|Object} object
 * @return {Object}
 */
function cloneDeep(object) {
  var newObj = (0, _clone2.default)(object);

  var cloneArrayElement = function cloneArrayElement(e) {
    // Deep clones arrays and objects
    if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e !== null) {
      return cloneDeep(e);
    }

    return e;
  };

  Object.keys(newObj).forEach(function (key) {
    if (Array.isArray(newObj[key])) {
      newObj[key] = newObj[key].slice().map(cloneArrayElement);
    } else if (_typeof(newObj[key]) === 'object') {
      newObj[key] = cloneDeep(newObj[key]);
    }
  });

  return newObj;
}
//# sourceMappingURL=cloneDeep.js.map