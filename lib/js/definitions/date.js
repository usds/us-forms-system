'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateConfig = undefined;

var _validation = require('../validation');

// export const schema = {
//   pattern: '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
//   type: 'string'
// };

function schema() {
  return {
    pattern: '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
    type: 'string'
  };
}

function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';

  return {
    'ui:title': title,
    'ui:widget': 'date',
    'ui:validations': [_validation.validateDate],
    'ui:errorMessages': {
      pattern: 'Please provide a valid date'
    }
  };
}

var dateConfig = exports.dateConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=date.js.map