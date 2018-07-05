"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omit;
/**
 * Returns a deep clone of the provided object without the specified fields.
 *
 * @param {Array} fields
 * @param {Object} object
 */
function omit(fields, object) {
  return Object.keys(object).reduce(function (newObj, k) {
    if (!fields.includes(k)) {
      newObj[k] = object[k]; // eslint-disable-line
    }

    return newObj;
  }, {});
}
//# sourceMappingURL=omit.js.map