'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

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

var ErrorableCheckbox = function (_React$Component) {
  _inherits(ErrorableCheckbox, _React$Component);

  function ErrorableCheckbox() {
    _classCallCheck(this, ErrorableCheckbox);

    var _this = _possibleConstructorReturn(this, (ErrorableCheckbox.__proto__ || Object.getPrototypeOf(ErrorableCheckbox)).call(this));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(ErrorableCheckbox, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.inputId = (0, _uniqueId3.default)('errorable-checkbox-');
    }
  }, {
    key: 'handleChange',
    value: function handleChange(domEvent) {
      this.props.onValueChange(domEvent.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      // TODO: extract error logic into a utility function
      // Calculate error state.
      var errorSpan = '';
      var errorSpanId = undefined;
      if (this.props.errorMessage) {
        errorSpanId = this.inputId + '-error-message';
        errorSpan = _react2.default.createElement(
          'span',
          { className: 'usa-input-error-message', role: 'alert', id: errorSpanId },
          _react2.default.createElement(
            'span',
            { className: 'sr-only' },
            'Error'
          ),
          ' ',
          this.props.errorMessage
        );
      }

      // Calculate required.
      var requiredSpan = undefined;
      if (this.props.required) {
        requiredSpan = _react2.default.createElement(
          'span',
          { className: 'form-required-span' },
          '*'
        );
      }

      var className = 'form-checkbox' + (this.props.errorMessage ? ' usa-input-error' : '');
      if (!(0, _isUndefined3.default)(this.props.className)) {
        className = className + ' ' + this.props.className;
      }

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement('input', {
          'aria-describedby': errorSpanId,
          checked: this.props.checked,
          id: this.inputId,
          name: this.props.name,
          type: 'checkbox',
          onChange: this.handleChange }),
        _react2.default.createElement(
          'label',
          {
            className: this.props.errorMessage ? 'usa-input-error-label' : undefined,
            name: this.props.name + '-label',
            htmlFor: this.inputId },
          this.props.label,
          requiredSpan
        ),
        errorSpan
      );
    }
  }]);

  return ErrorableCheckbox;
}(_react2.default.Component);

ErrorableCheckbox.propTypes = {
  /**
   * If the checkbox is checked or not
   */
  checked: _propTypes2.default.bool,
  /**
   * Error message for the modal
   */
  errorMessage: _propTypes2.default.string,
  /**
   * Name for the modal
   */
  name: _propTypes2.default.string,
  /**
   * Label for the checkbox
   */
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  /**
   * Handler for when the checkbox is changed
   */
  onValueChange: _propTypes2.default.func.isRequired,
  /**
   * If the checkbox is required or not
   */
  required: _propTypes2.default.bool
};

exports.default = ErrorableCheckbox;
//# sourceMappingURL=ErrorableCheckbox.js.map