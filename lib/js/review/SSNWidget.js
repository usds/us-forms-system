'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SSNWidget;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SSNWidget(_ref) {
  var value = _ref.value;

  if (value && value.length === 9) {
    return _react2.default.createElement(
      'span',
      null,
      value.substr(0, 3) + '-' + value.substr(3, 2) + '-' + value.substr(5)
    );
  }

  return _react2.default.createElement(
    'span',
    null,
    value
  );
}
//# sourceMappingURL=SSNWidget.js.map