'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component for the continue button to navigate through panels of questions.
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
      this.id = (0, _uniqueId3.default)();
    }
  }, {
    key: 'render',
    value: function render() {
      var beforeText = this.props.beforeText ? _react2.default.createElement(
        'span',
        { className: 'button-icon' },
        this.props.beforeText,
        ' '
      ) : '';
      var afterText = this.props.afterText ? _react2.default.createElement(
        'span',
        { className: 'button-icon' },
        ' ',
        this.props.afterText
      ) : '';

      return _react2.default.createElement(
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
}(_react2.default.Component);

ProgressButton.propTypes = {

  // function that changes the path to the next panel or submit.
  onButtonClick: _propTypes2.default.func,

  // what is the button's label
  buttonText: _propTypes2.default.string.isRequired,

  // what CSS class(es) does the button have
  buttonClass: _propTypes2.default.string.isRequired,

  // Stores the value for the icon that will appear before the button text.
  beforeText: _propTypes2.default.string,

  // Stores the value for the icon that will appear after the button text.
  afterText: _propTypes2.default.string,

  // is the button disabled or not
  disabled: _propTypes2.default.bool,

  // is this a submit button or not
  submitButton: _propTypes2.default.bool
};

exports.default = ProgressButton;
//# sourceMappingURL=ProgressButton.js.map