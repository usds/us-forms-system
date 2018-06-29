'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PrivacyAgreement;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ErrorableCheckbox = require('./ErrorableCheckbox');

var _ErrorableCheckbox2 = _interopRequireDefault(_ErrorableCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PrivacyAgreement(_ref) {
  var onChange = _ref.onChange,
      checked = _ref.checked,
      showError = _ref.showError;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_ErrorableCheckbox2.default, { required: true,
      checked: checked,
      onValueChange: onChange,
      name: 'privacyAgreement',
      errorMessage: showError && !checked ? 'You must accept the privacy policy before continuing' : undefined,
      label: _react2.default.createElement(
        'span',
        null,
        'I have read and accept the ',
        _react2.default.createElement(
          'a',
          { target: '_blank', href: '/privacy/' },
          'privacy policy'
        )
      ) })
  );
}

PrivacyAgreement.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  checked: _propTypes2.default.bool.isRequired
};