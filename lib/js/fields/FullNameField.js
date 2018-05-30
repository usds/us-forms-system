import React from 'react';

export default function FullNameField(_ref) {
  var formData = _ref.formData;
  var first = formData.first,
      middle = formData.middle,
      last = formData.last,
      suffix = formData.suffix;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'strong',
      null,
      first,
      ' ',
      middle && middle + ' ',
      last,
      suffix && ', ' + suffix
    )
  );
}