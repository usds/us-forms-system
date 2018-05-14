var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';

var LoadingIndicator = function (_React$Component) {
  _inherits(LoadingIndicator, _React$Component);

  function LoadingIndicator() {
    _classCallCheck(this, LoadingIndicator);

    return _possibleConstructorReturn(this, (LoadingIndicator.__proto__ || Object.getPrototypeOf(LoadingIndicator)).apply(this, arguments));
  }

  _createClass(LoadingIndicator, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.setFocus) {
        this.spinnerDiv.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var message = this.props.message;

      return React.createElement(
        'div',
        { className: 'loading-indicator-container' },
        React.createElement('div', {
          ref: function ref(div) {
            _this2.spinnerDiv = div;
          },
          className: 'loading-indicator',
          role: 'progressbar',
          'aria-valuetext': message,
          tabIndex: '0' }),
        message
      );
    }
  }]);

  return LoadingIndicator;
}(React.Component);

export default LoadingIndicator;


LoadingIndicator.propTypes = {
  message: PropTypes.string.isRequired,
  setFocus: PropTypes.bool
};

LoadingIndicator.defaultProps = {
  setFocus: false
};