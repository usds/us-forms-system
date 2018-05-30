import React from 'react';

export default function CurrencyWidget(_ref) {
  var value = _ref.value;

  if (value && typeof value === 'number') {
    return React.createElement(
      'span',
      null,
      '$',
      value.toFixed(2)
    );
  }

  return React.createElement(
    'span',
    null,
    value
  );
}