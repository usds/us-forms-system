'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextWidget = require('./TextWidget');

var _TextWidget2 = _interopRequireDefault(_TextWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Handles removing dashes from SSNs by keeping the user input in local state
 * and saving the transformed version instead
 */
var PhoneNumberWidget = function (_React$Component) {
  _inherits(PhoneNumberWidget, _React$Component);

  function PhoneNumberWidget(props) {
    _classCallCheck(this, PhoneNumberWidget);

    var _this = _possibleConstructorReturn(this, (PhoneNumberWidget.__proto__ || Object.getPrototypeOf(PhoneNumberWidget)).call(this, props));

    _this.handleChange = function (val) {
      var stripped = void 0;
      if (val) {
        stripped = val.replace(/[ \-()x+]/g, '');
      }

      _this.setState({ val: val }, function () {
        _this.props.onChange(stripped);
      });
    };

    _this.state = { val: props.value };
    return _this;
  }

  _createClass(PhoneNumberWidget, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_TextWidget2.default, _extends({}, this.props, { value: this.state.val, onChange: this.handleChange }));
    }
  }]);

  return PhoneNumberWidget;
}(_react2.default.Component);

exports.default = PhoneNumberWidget;
//# sourceMappingURL=PhoneNumberWidget.js.map