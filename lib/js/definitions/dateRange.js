'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateRangeConfig = undefined;

var _validation = require('../validation');

var _date = require('./date');

function schema() {
  return {
    type: 'object',
    properties: {
      from: _date.dateConfig.schema(),
      to: _date.dateConfig.schema()
    }
  };
}

function uiSchema() {
  var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'From';
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'To';
  var rangeError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'To date must be after From date';

  return {
    'ui:validations': [_validation.validateDateRange],
    'ui:errorMessages': {
      pattern: rangeError
    },
    from: _date.dateConfig.uiSchema(from),
    to: _date.dateConfig.uiSchema(to)
  };
}

var dateRangeConfig = exports.dateRangeConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=dateRange.js.map