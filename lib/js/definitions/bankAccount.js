'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validation = require('../validation');

var uiSchema = {
  'ui:order': ['accountType', 'accountNumber', 'routingNumber'],
  accountType: {
    'ui:title': 'Account type',
    'ui:widget': 'radio',
    'ui:options': {
      labels: {
        checking: 'Checking',
        savings: 'Savings'
      }
    }
  },
  accountNumber: {
    'ui:title': 'Account number'
  },
  routingNumber: {
    'ui:title': 'Routing number',
    'ui:validations': [_validation.validateRoutingNumber],
    'ui:errorMessages': {
      pattern: 'Please enter a valid nine digit routing number'
    }
  }
};

exports.default = uiSchema;
//# sourceMappingURL=bankAccount.js.map