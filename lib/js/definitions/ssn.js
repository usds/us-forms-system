'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validation = require('../validation');

var _SSNWidget = require('../widgets/SSNWidget');

var _SSNWidget2 = _interopRequireDefault(_SSNWidget);

var _SSNWidget3 = require('../review/SSNWidget');

var _SSNWidget4 = _interopRequireDefault(_SSNWidget3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uiSchema = {
  'ui:widget': _SSNWidget2.default,
  'ui:reviewWidget': _SSNWidget4.default,
  'ui:title': 'Social Security number',
  'ui:options': {
    widgetClassNames: 'usa-input-medium'
  },
  'ui:validations': [_validation.validateSSN],
  'ui:errorMessages': {
    pattern: 'Please enter a valid 9 digit SSN (dashes allowed)'
  }
};

exports.default = uiSchema;
//# sourceMappingURL=ssn.js.map