import PropTypes from 'prop-types';
import React from 'react';
import ErrorableCheckbox from './ErrorableCheckbox';

export default function PrivacyAgreement(_ref) {
  var onChange = _ref.onChange,
      checked = _ref.checked,
      showError = _ref.showError;

  return React.createElement(
    'div',
    null,
    React.createElement(ErrorableCheckbox, { required: true,
      checked: checked,
      onValueChange: onChange,
      name: 'privacyAgreement',
      errorMessage: showError && !checked ? 'You must accept the privacy policy before continuing' : undefined,
      label: React.createElement(
        'span',
        null,
        'I have read and accept the ',
        React.createElement(
          'a',
          { target: '_blank', href: '/privacy/' },
          'privacy policy'
        )
      ) })
  );
}

PrivacyAgreement.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};