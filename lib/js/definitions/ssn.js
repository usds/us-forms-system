'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssnConfig = undefined;

var _validation = require('../validation');

var _SSNWidget = require('../widgets/SSNWidget');

var _SSNWidget2 = _interopRequireDefault(_SSNWidget);

var _SSNWidget3 = require('../review/SSNWidget');

var _SSNWidget4 = _interopRequireDefault(_SSNWidget3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function schema() {
  return {
    type: 'string',
    pattern: '^[0-9]{9}$'
  };
}

function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Social Security Number';

  return {
    'ui:widget': _SSNWidget2.default,
    'ui:reviewWidget': _SSNWidget4.default,
    'ui:title': title,
    'ui:options': {
      widgetClassNames: 'usa-input-medium'
    },
    'ui:validations': [_validation.validateSSN],
    'ui:errorMessages': {
      pattern: 'Please enter a valid 9 digit SSN (dashes allowed)'
    }
  };
}

var ssnConfig = exports.ssnConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=ssn.js.map