'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentOrPastMonthYearConfig = undefined;

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _validation = require('../validation');

var _monthYear = require('./monthYear');

var _monthYear2 = _interopRequireDefault(_monthYear);

var _date = require('./date');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _date.dateConfig.schema;

function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';

  return (0, _assign3.default)((0, _monthYear2.default)(title), {
    'ui:validations': [_validation.validateCurrentOrPastMonthYear],
    'ui:errorMessages': {
      pattern: 'Please provide a valid current or past date'
    }
  });
}

var currentOrPastMonthYearConfig = exports.currentOrPastMonthYearConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=currentOrPastMonthYear.js.map