'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = set;

var _deconstructPath = require('./deconstructPath');

var _deconstructPath2 = _interopRequireDefault(_deconstructPath);

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _checkValidPath = require('./checkValidPath');

var _checkValidPath2 = _interopRequireDefault(_checkValidPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Same as `set`, but uses the level param to determine when to clone and give a more helpful error message.
 *
 * Note: Sub-objects in the path will not be `===` to objects in the same path in the existing data, but all
 *  other objects will be. By not cloning the data outside the path, we allow components (and Redux's connect
 *  HoC) to quickly tell which parts of the root object have changed, by doing a `===` comparison.
 *
 * TODO: Link to some documentation which will be a better explanation than the above
 *
 * @param {Array|string} path
 * @param {*} value
 * @param {Array|Object} object
 * @param {Number} level  How many times we've recursed
 * @return {Object} A new object with the appropriate value set
 */
function baseSet(arrayPath, value, object) {
  var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (level >= arrayPath.length) {
    // We're at the end of our path; time to assign
    return value;
  }

  var newObj = (0, _clone2.default)(object);

  var pathSegment = arrayPath[level];
  var nextPathSegment = arrayPath[level + 1];

  // Handle a path that doesn't exist
  if (typeof newObj[pathSegment] === 'undefined') {
    // The type of this element depends on the next path chunk
    switch (typeof nextPathSegment === 'undefined' ? 'undefined' : _typeof(nextPathSegment)) {
      case 'string':
        newObj[pathSegment] = {};
        break;
      case 'number':
        // The array should be big enough to get whatever index we're looking for
        newObj[pathSegment] = new Array(nextPathSegment + 1);
        break;
      case 'undefined':
        // Do nothing; this will be assigned on the next iteration
        break;
      default:
        throw new Error('Unrecognized path element type: ' + (typeof nextPathSegment === 'undefined' ? 'undefined' : _typeof(nextPathSegment)) + '. Expected string or number. arrayPath[' + (level + 1) + '] contains ' + nextPathSegment + '.');
    }
  }

  newObj[pathSegment] = baseSet(arrayPath, value, newObj[pathSegment], level + 1);

  return newObj;
}

/**
 * Sets the value at the end of the path, creating the appropriate objects along the way if needed.
 * Separate from `baseSet` to not expose the level param.
 *
 * @param {Array|string} path
 * @param {*} value
 * @param {Object} object
 * @return {Object} A new object with the appropriate value set
 */
function set(path, value, object) {
  var arrayPath = Array.isArray(path) ? path : (0, _deconstructPath2.default)(path);
  (0, _checkValidPath2.default)(arrayPath);
  return baseSet(arrayPath, value, object, 0);
}
//# sourceMappingURL=set.js.map