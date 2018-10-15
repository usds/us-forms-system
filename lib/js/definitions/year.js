'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yearConfig = undefined;

var _widgets = require('../review/widgets');

var ReviewWidget = _interopRequireWildcard(_widgets);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function schema() {
  return {
    type: 'integer',
    minimum: 1900,
    maximum: 2100
  };
}

function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Year';

  return {
    'ui:title': title,
    'ui:reviewWidget': ReviewWidget.TextWidget,
    'ui:options': {
      widgetClassNames: 'usa-input-medium'
    }
  };
}

var yearConfig = exports.yearConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=year.js.map