'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = StringField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This is a minimal string field implementation for the
 * review page, so we can pass custom review widgets
 * in the config
 */
function StringField(props) {
  var registry = props.registry,
      schema = props.schema,
      uiSchema = props.uiSchema,
      formData = props.formData;

  var uiOptions = (0, _utils.getUiOptions)(uiSchema);
  var labels = uiOptions.labels || {};
  var enumOptions = Array.isArray(schema.enum) && (0, _utils.optionsList)(schema);

  var Widget = (0, _get3.default)('ui:reviewWidget', uiSchema);
  if (!Widget) {
    var defaultWidget = schema.format || (enumOptions ? 'select' : 'text');
    Widget = (0, _utils.getWidget)(schema, uiOptions.widget || defaultWidget, registry.widgets);
  }

  return _react2.default.createElement(Widget, _extends({
    options: (0, _assign3.default)(uiOptions, { enumOptions: enumOptions, labels: labels }),
    value: formData
  }, props));
}
//# sourceMappingURL=StringField.js.map