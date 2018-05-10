import React from 'react';

// When coming from a PhoneNumberWidget (not review), value will be only numbers
export default function PhoneNumberWidget(_ref) {
  var value = _ref.value;

  var formatted = value;
  if (value && value.length === 10) {
    formatted = '(' + value.substr(0, 3) + ') ' + value.substr(3, 3) + '-' + value.substr(6);
  }

  return React.createElement(
    'span',
    null,
    formatted
  );
}