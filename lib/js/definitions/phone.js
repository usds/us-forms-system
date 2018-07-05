'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uiSchema;

var _PhoneNumberWidget = require('../widgets/PhoneNumberWidget');

var _PhoneNumberWidget2 = _interopRequireDefault(_PhoneNumberWidget);

var _PhoneNumberWidget3 = require('../review/PhoneNumberWidget');

var _PhoneNumberWidget4 = _interopRequireDefault(_PhoneNumberWidget3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      widgetClassNames: 'home-phone va-input-medium-large',
      inputType: 'tel'
    }
  };
}
//# sourceMappingURL=phone.js.map