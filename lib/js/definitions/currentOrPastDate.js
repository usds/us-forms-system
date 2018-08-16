'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentOrPastDateConfig = undefined;

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
    'ui:validations': [_validation.validateCurrentOrPastDate],
    'ui:errorMessages': {
      pattern: 'Please provide a valid current or past date'
    }
  };
}

var currentOrPastDateConfig = exports.currentOrPastDateConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=currentOrPastDate.js.map