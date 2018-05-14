import React from 'react';
import { formatReviewDate } from '../helpers';

export default function ServicePeriodView(_ref) {
  var formData = _ref.formData;

  var from = '';
  var to = '';
  if (formData.dateRange) {
    from = formatReviewDate(formData.dateRange.from);
    to = formatReviewDate(formData.dateRange.to);
  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'strong',
      null,
      formData.serviceBranch
    ),
    React.createElement('br', null),
    from,
    ' \u2014 ',
    to
  );
}