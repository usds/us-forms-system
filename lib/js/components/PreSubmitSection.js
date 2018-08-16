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

// formConfig.preSubmitInfo = {
//
//  notice: '',     // HTML and/or React components placed above checkbox (or Submit)
//  required: false,  // Show the checkbox
//  field: '',      // Name of agreement field in form, e.g. 'privacyAgreementAccepted'
//  label: '',      // Text used for checkbox label, e.g. 'I accept the privacy agreement'
//  error: '',      // Shown if they submit without checking the box
// }
//
function PreSubmitSection(_ref) {
  var onChange = _ref.onChange,
      checked = _ref.checked,
      showError = _ref.showError,
      preSubmitInfo = _ref.preSubmitInfo,
      form = _ref.form;

  var info = preSubmitInfo || {};
  var field = info.field || 'AGREED';

  return _react2.default.createElement(
    'div',
    null,
    info.notice || '',
    info.required && _react2.default.createElement(_ErrorableCheckbox2.default, { required: true,
      checked: form.data[field],
      onValueChange: onChange,
      name: field,
      errorMessage: showError && !form.data[field] ? info.error || 'Please agree before continuing' : undefined,
      label: info.label })
  );
}

PreSubmitSection.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  checked: _propTypes2.default.bool.isRequired,
  preSubmitInfo: _propTypes2.default.object,
  showError: _propTypes2.default.bool
};
//# sourceMappingURL=PreSubmitSection.js.map