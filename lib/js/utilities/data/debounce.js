"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
/**
 * @param {number}
 * @param {function}
 */
function debounce(wait, func) {
  var timeoutId = void 0;

  var debouncedFunc = function debouncedFunction() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      return func.apply(context, args);
    }, wait);
  };

  debouncedFunc.cancel = function cancel() {
    clearTimeout(timeoutId);
  };

  return debouncedFunc;
}
//# sourceMappingURL=debounce.js.map