'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monthYearConfig = undefined;

var _validation = require('../validation');

var _date = require('./date');

function schema() {
  return _date.dateConfig.schema();
}

function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';

  return {
    'ui:title': title,
    'ui:widget': 'date',
    'ui:options': {
      monthYear: true
    },
    'ui:validations': [_validation.validateMonthYear],
    'ui:errorMessages': {
      pattern: 'Please provide a valid date'
    }
  };
}

var monthYearConfig = exports.monthYearConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=monthYear.js.map