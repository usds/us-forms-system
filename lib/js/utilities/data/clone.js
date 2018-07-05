'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = clone;
/**
 * Returns a shallow clone of an object.
 *
 * @param {Object} object
 * @return {Object}
 */
function clone(object) {
  /* eslint-disable no-prototype-builtins */
  switch (typeof object === 'undefined' ? 'undefined' : _typeof(object)) {
    case 'object':
      if (Array.isArray(object)) {
        return object.slice();
      } else if (Set.prototype.isPrototypeOf(object)) {
        return new Set(object);
      } else if (Map.prototype.isPrototypeOf(object)) {
        return new Map(object);
      }
      // Probably just ye olde object
      return Object.assign({}, object);
    default:
      throw new Error('Unknown type in clone: ' + (typeof object === 'undefined' ? 'undefined' : _typeof(object)));
  }
  /* eslint-enable no-prototype-builtins */
}
//# sourceMappingURL=clone.js.map