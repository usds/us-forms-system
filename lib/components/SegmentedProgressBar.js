import _range from 'lodash/range';
import React from 'react';


/**
 * Create a segmented progress bar for multi-page forms.
 *
 * @param {number} current - The index of the current chapter
 * @param {number} total   - The total number of chapters in the form
 */
export default function SegmentedProgressBar(_ref) {
  var current = _ref.current,
      total = _ref.total;

  return React.createElement(
    'div',
    { className: 'progress-bar-segmented', role: 'progressbar', 'aria-valuenow': current, 'aria-valuemin': '0', 'aria-valuemax': total, tabIndex: '0' },
    _range(total).map(function (step) {
      return React.createElement('div', { key: step, className: 'progress-segment ' + (current > step ? 'progress-segment-complete' : '') });
    })
  );
}