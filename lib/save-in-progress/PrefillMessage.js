import React from 'react';

var message = 'We’ve prefilled some of your information from your account. If you need to correct anything, you can edit the form fields below.';

export default function PrefillMessage(_ref) {
  var children = _ref.children,
      formContext = _ref.formContext;

  if (!formContext.prefilled) {
    return null;
  }

  return React.createElement(
    'div',
    { className: 'usa-alert usa-alert-info no-background-image schemaform-prefill-message' },
    children || message
  );
}