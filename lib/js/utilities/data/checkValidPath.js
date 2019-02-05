'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkValidPath;
/**
 * If the path contains invalid segments, throws an error.
 */
function checkValidPath(arrayPath) {
  if (arrayPath.some(function (e) {
    return e === undefined && e === null;
  })) {
    throw new Error('Path is invalid; please make sure it doesn\'t contain undefined or null segments');
  }
}
//# sourceMappingURL=checkValidPath.js.map