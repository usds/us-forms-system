/**
 * @param {number}
 * @param {function}
 */
export default function debounce(wait, func) {
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