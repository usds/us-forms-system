'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentOrPastMonthYearConfig = undefined;

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _validation = require('../validation');

var _date = require('./date');

var _monthYear = require('./monthYear');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function schema() {
  return _date.dateConfig.schema();
}

function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';

  return (0, _assign3.default)(_monthYear.monthYearConfig.uiSchema(title), {
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