'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uiSchema;

var _validation = require('../validation');

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
//# sourceMappingURL=monthYear.js.map