'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreSubmitSection = PreSubmitSection;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ErrorableCheckbox = require('./ErrorableCheckbox');

var _ErrorableCheckbox2 = _interopRequireDefault(_ErrorableCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PreSubmitSection(_ref) {
  var onChange = _ref.onChange,
      showError = _ref.showError,
      preSubmitInfo = _ref.preSubmitInfo,
      checked = _ref.checked;


  return _react2.default.createElement(
    'div',
    null,
    preSubmitInfo.notice,
    preSubmitInfo.required && _react2.default.createElement(_ErrorableCheckbox2.default, { required: true,
      checked: checked,
      onValueChange: onChange,
      name: preSubmitInfo.field,
      errorMessage: showError && !checked ? preSubmitInfo.error || 'Please accept' : undefined,
      label: preSubmitInfo.label })
  );
}

PreSubmitSection.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  preSubmitInfo: _propTypes2.default.object.isRequired,
  showError: _propTypes2.default.bool
};
//# sourceMappingURL=PreSubmitSection.js.map