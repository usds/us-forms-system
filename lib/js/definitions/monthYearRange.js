'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monthYearRangeConfig = undefined;

var _validation = require('../validation');

var _monthYear = require('./monthYear');

var _dateRange = require('./dateRange');

function schema() {
  return _dateRange.dateRangeConfig.schema();
}

function uiSchema() {
  var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'From';
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'To';
  var rangeError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'To date must be on or after From date';

  return {
    'ui:validations': [_validation.validateDateRange],
    'ui:errorMessages': {
      pattern: rangeError
    },
    from: _monthYear.monthYearConfig.uiSchema(from),
    to: _monthYear.monthYearConfig.uiSchema(to)
  };
}

var monthYearRangeConfig = exports.monthYearRangeConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=monthYearRange.js.map