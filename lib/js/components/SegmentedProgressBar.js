'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

exports.default = SegmentedProgressBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a segmented progress bar for multi-page forms.
 *
 * @param {number} current - The index of the current chapter
 * @param {number} total   - The total number of chapters in the form
 */
function SegmentedProgressBar(_ref) {
  var current = _ref.current,
      total = _ref.total;

  return _react2.default.createElement(
    'div',
    { className: 'progress-bar-segmented', role: 'progressbar', 'aria-valuenow': current, 'aria-valuemin': '0', 'aria-valuemax': total, tabIndex: '0' },
    (0, _range3.default)(total).map(function (step) {
      return _react2.default.createElement('div', { key: step, className: 'progress-segment ' + (current > step ? 'progress-segment-complete' : '') });
    })
  );
}

SegmentedProgressBar.propTypes = {
  /**
   * The current segment in progress
   */
  current: _propTypes2.default.number.isRequired,
  /**
   * The total number of segments in the progress bar
   */
  total: _propTypes2.default.number.isRequired
};
//# sourceMappingURL=SegmentedProgressBar.js.map