'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PhoneNumberWidget;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When coming from a PhoneNumberWidget (not review), value will be only numbers
function PhoneNumberWidget(_ref) {
  var value = _ref.value;

  var formatted = value;
  if (value && value.length === 10) {
    formatted = '(' + value.substr(0, 3) + ') ' + value.substr(3, 3) + '-' + value.substr(6);
  }

  return _react2.default.createElement(
    'span',
    null,
    formatted
  );
}
//# sourceMappingURL=PhoneNumberWidget.js.map