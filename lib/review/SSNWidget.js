import React from 'react';

export default function SSNWidget(_ref) {
  var value = _ref.value;

  if (value && value.length === 9) {
    return React.createElement(
      'span',
      null,
      value.substr(0, 3) + '-' + value.substr(3, 2) + '-' + value.substr(5)
    );
  }

  return React.createElement(
    'span',
    null,
    value
  );
}