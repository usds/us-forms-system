'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

exports.default = uiSchema;

var _validation = require('../validation');

var _monthYear = require('./monthYear');

var _monthYear2 = _interopRequireDefault(_monthYear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';

  return (0, _assign3.default)((0, _monthYear2.default)(title), {
    'ui:validations': [_validation.validateCurrentOrPastMonthYear],
    'ui:errorMessages': {
      pattern: 'Please provide a valid current or past date'
    }
  });
}
//# sourceMappingURL=currentOrPastMonthYear.js.map