'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.phoneConfig = undefined;

var _PhoneNumberWidget = require('../widgets/PhoneNumberWidget');

var _PhoneNumberWidget2 = _interopRequireDefault(_PhoneNumberWidget);

var _PhoneNumberWidget3 = require('../review/PhoneNumberWidget');

var _PhoneNumberWidget4 = _interopRequireDefault(_PhoneNumberWidget3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function schema() {
  return {
    type: 'string',
    minLength: 10
  };
}

/*
 * Phone uiSchema
 *
 * @param {string} title - The field label, defaults to Phone
 */
function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Phone';

  return {
    'ui:widget': _PhoneNumberWidget2.default,
    'ui:reviewWidget': _PhoneNumberWidget4.default,
    'ui:title': title,
    'ui:errorMessages': {
      pattern: 'Phone numbers must be 10 digits'
    },
    'ui:options': {
      widgetClassNames: 'home-phone usfs-input-medium-large',
      inputType: 'tel'
    }
  };
}

var phoneConfig = exports.phoneConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=phone.js.map