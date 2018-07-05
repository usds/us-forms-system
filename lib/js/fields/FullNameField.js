'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FullNameField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FullNameField(_ref) {
  var formData = _ref.formData;
  var first = formData.first,
      middle = formData.middle,
      last = formData.last,
      suffix = formData.suffix;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'strong',
      null,
      first,
      ' ',
      middle && middle + ' ',
      last,
      suffix && ', ' + suffix
    )
  );
}
//# sourceMappingURL=FullNameField.js.map