import _uniqueId from 'lodash/uniqueId';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';

/**
 * A component for the continue button to navigate through panels of questions.
 *
 * Required props
 * `onButtonClick`: function that changes the path to the next panel or submit.
 * `buttonText`: String. Stores the value for the button text.
 * `buttonClass`: String. Stores the value for the button class(es).
 * `beforeText`: String. Stores the value for the icon that will appear before the button text.
 * `afterText`: String. Stores the value for the icon that will appear after the button text.
 */

var ProgressButton = function (_React$Component) {
  _inherits(ProgressButton, _React$Component);

  function ProgressButton() {
    _classCallCheck(this, ProgressButton);

    return _possibleConstructorReturn(this, (ProgressButton.__proto__ || Object.getPrototypeOf(ProgressButton)).apply(this, arguments));
  }

  _createClass(ProgressButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.id = _uniqueId();
    }
  }, {
    key: 'render',
    value: function render() {
      var beforeText = this.props.beforeText ? React.createElement(
        'span',
        { className: 'button-icon' },
        this.props.beforeText,
        ' '
      ) : '';
      var afterText = this.props.afterText ? React.createElement(
        'span',
        { className: 'button-icon' },
        ' ',
        this.props.afterText
      ) : '';

      return React.createElement(
        'button',
        {
          type: this.props.submitButton ? 'submit' : 'button',
          disabled: this.props.disabled,
          className: this.props.buttonClass + ' ' + (this.props.disabled ? 'usa-button-disabled' : null),
          id: this.id + '-continueButton',
          onClick: this.props.onButtonClick },
        beforeText,
        this.props.buttonText,
        afterText
      );
    }
  }]);

  return ProgressButton;
}(React.Component);

ProgressButton.propTypes = {
  onButtonClick: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  beforeText: PropTypes.string,
  afterText: PropTypes.string,
  disabled: PropTypes.bool,
  submitButton: PropTypes.bool
};

export default ProgressButton;