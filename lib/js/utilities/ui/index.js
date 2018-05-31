import _merge from 'lodash/merge';

import Scroll from 'react-scroll';

export function focusElement(selectorOrElement, options) {
  var el = typeof selectorOrElement === 'string' ? document.querySelector(selectorOrElement) : selectorOrElement;

  if (el) {
    if (el.tabIndex <= 0) {
      el.setAttribute('tabindex', '-1');
    }
    el.focus(options);
  }
}

export function setGlobalScroll() {
  window.Forms = window.Forms || {
    scroll: {
      duration: 500,
      delay: 0,
      smooth: true
    }
  };
}

// Allows smooth scrolling to be overridden by our E2E tests
export function getScrollOptions(additionalOptions) {
  var globals = window.Forms || {};
  var defaults = {
    duration: 500,
    delay: 0,
    smooth: true
  };
  return _merge({}, defaults, globals.scroll, additionalOptions);
}

export function scrollToFirstError() {
  var errorEl = document.querySelector('.usa-input-error, .input-error-date');
  if (errorEl) {
    // document.body.scrollTop doesn’t work with all browsers, so we’ll cover them all like so:
    var currentPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var position = errorEl.getBoundingClientRect().top + currentPosition;
    Scroll.animateScroll.scrollTo(position - 10, getScrollOptions());
    focusElement(errorEl);
  }
}