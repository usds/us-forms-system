'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProgressBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProgressBar(_ref) {
  var percent = _ref.percent;

  return _react2.default.createElement(
    'div',
    { className: 'progress-bar', role: 'progressbar', 'aria-valuenow': percent, 'aria-valuemin': '0', 'aria-valuemax': '100', tabIndex: '0' },
    _react2.default.createElement('div', { className: 'progress-bar-inner', style: { width: percent + '%' } })
  );
}

ProgressBar.propTypes = {
  /**
   * Percent of progress made
   */
  percent: _propTypes2.default.number.isRequired
};
//# sourceMappingURL=ProgressBar.js.map