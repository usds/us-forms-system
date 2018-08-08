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
//  fieldName: '',  // name of agreement field in form, e.g. 'privacyAgreementAccepted'
//  notice: '',     // HTML and/or React components placed above checkbox
//  label: '',      // Text used for checkbox label, e.g. 'I accept the privacy agreement'
//  error: '',      // Shown if they submit without checking the box
// }
//
function PreSubmitSection(_ref) {
  var onChange = _ref.onChange,
      checked = _ref.checked,
      showError = _ref.showError,
      preSubmitInfo = _ref.preSubmitInfo;

  return _react2.default.createElement(
    'div',
    null,
    preSubmitInfo.notice || '',
    preSubmitInfo.label && _react2.default.createElement(_ErrorableCheckbox2.default, { required: true,
      checked: checked,
      onValueChange: onChange,
      name: preSubmitInfo.fieldName,
      errorMessage: showError && !checked ? preSubmitInfo.error || 'Please check before continuing' : undefined,
      label: preSubmitInfo.label })
  );
}

PreSubmitSection.propTypes = {
  preSubmitInfo: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  checked: _propTypes2.default.bool.isRequired
};
//# sourceMappingURL=PreSubmitSection.js.map