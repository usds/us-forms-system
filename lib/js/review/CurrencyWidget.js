'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CurrencyWidget;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CurrencyWidget(_ref) {
  var value = _ref.value;

  if (value && typeof value === 'number') {
    return _react2.default.createElement(
      'span',
      null,
      '$',
      value.toFixed(2)
    );
  }

  return _react2.default.createElement(
    'span',
    null,
    value
  );
}
//# sourceMappingURL=CurrencyWidget.js.map