'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yearConfig = undefined;

var _validation = require('../validation');

var _widgets = require('../review/widgets');

var ReviewWidget = _interopRequireWildcard(_widgets);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schema = {
  type: 'integer',
  minimum: 1900
};

var uiSchema = {
  'ui:title': 'Year',
  'ui:reviewWidget': ReviewWidget.TextWidget,
  'ui:validations': [_validation.validateCurrentOrPastYear],
  'ui:errorMessages': {
    type: 'Please provide a valid year'
  },
  'ui:options': {
    widgetClassNames: 'usa-input-medium'
  }
};

var yearConfig = exports.yearConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=year.js.map