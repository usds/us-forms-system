'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uiSchema;

var _CurrencyWidget = require('../widgets/CurrencyWidget');

var _CurrencyWidget2 = _interopRequireDefault(_CurrencyWidget);

var _CurrencyWidget3 = require('../review/CurrencyWidget');

var _CurrencyWidget4 = _interopRequireDefault(_CurrencyWidget3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uiSchema(title) {
  return {
    'ui:widget': _CurrencyWidget2.default,
    'ui:reviewWidget': _CurrencyWidget4.default,
    'ui:title': title,
    'ui:options': {
      classNames: 'schemaform-currency-input'
    },
    'ui:errorMessages': {
      type: 'Please enter a valid dollar amount'
    }
  };
}