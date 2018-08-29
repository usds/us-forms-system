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
      form = _ref.form;

  var info = preSubmitInfo || {};
  var field = info.field || 'AGREED';

  return _react2.default.createElement(
    'div',
    null,
    info.notice,
    info.required && _react2.default.createElement(_ErrorableCheckbox2.default, { required: true,
      checked: form.data[field],
      onValueChange: onChange,
      name: field,
      errorMessage: showError && !form.data[field] ? info.error || 'Please agree before continuing' : undefined,
      label: info.label })
  );
}

PreSubmitSection.propTypes = {
  form: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  preSubmitInfo: _propTypes2.default.object,
  showError: _propTypes2.default.bool
};
//# sourceMappingURL=PreSubmitSection.js.map