'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

exports.focusElement = focusElement;
exports.setGlobalScroll = setGlobalScroll;
exports.getScrollOptions = getScrollOptions;
exports.scrollToFirstError = scrollToFirstError;

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function focusElement(selectorOrElement, options) {
  var el = typeof selectorOrElement === 'string' ? document.querySelector(selectorOrElement) : selectorOrElement;

  if (el) {
    if (el.tabIndex <= 0) {
      el.setAttribute('tabindex', '-1');
    }
    el.focus(options);
  }
}

function setGlobalScroll() {
  window.Forms = window.Forms || {
    scroll: {
      duration: 500,
      delay: 0,
      smooth: true
    }
  };
}

// Allows smooth scrolling to be overridden by our E2E tests
function getScrollOptions(additionalOptions) {
  var globals = window.Forms || {};
  var defaults = {
    duration: 500,
    delay: 0,
    smooth: true
  };
  return (0, _merge3.default)({}, defaults, globals.scroll, additionalOptions);
}

function scrollToFirstError() {
  var errorEl = document.querySelector('.usa-input-error, .input-error-date');
  if (errorEl) {
    // document.body.scrollTop doesn’t work with all browsers, so we’ll cover them all like so:
    var currentPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var position = errorEl.getBoundingClientRect().top + currentPosition;
    _reactScroll2.default.animateScroll.scrollTo(position - 10, getScrollOptions());
    focusElement(errorEl);
  }
}
//# sourceMappingURL=index.js.map