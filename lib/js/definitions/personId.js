'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

exports.schema = schema;
exports.uiSchema = uiSchema;

var _ssn = require('./ssn');

var _ssn2 = _interopRequireDefault(_ssn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function schema(currentSchema) {
  return {
    type: 'object',
    properties: {
      veteranSocialSecurityNumber: currentSchema.definitions.ssn,
      'view:noSSN': {
        type: 'boolean'
      },
      vaFileNumber: currentSchema.definitions.vaFileNumber
    }
  };
}

function uiSchema() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'veteran';

  var _ref;

  var noSSN = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'view:veteranId.view:noSSN';
  var labelText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'I don’t have a Social Security number';

  var fileNumberProp = prefix === 'veteran' ? 'va' : 'relativeVa';

  return _ref = {}, _defineProperty(_ref, prefix + 'SocialSecurityNumber', (0, _assign3.default)(_ssn2.default, {
    'ui:required': function uiRequired(formData) {
      return !(0, _get3.default)(noSSN, formData);
    }
  })), _defineProperty(_ref, 'view:noSSN', {
    'ui:title': labelText,
    'ui:options': {
      hideOnReview: true
    }
  }), _defineProperty(_ref, fileNumberProp + 'FileNumber', {
    'ui:required': function uiRequired(formData) {
      return !!(0, _get3.default)(noSSN, formData);
    },
    'ui:title': 'VA file number',
    'ui:errorMessages': {
      pattern: 'Your VA file number must be between 7 to 9 digits'
    },
    'ui:options': {
      expandUnder: 'view:noSSN'
    }
  }), _ref;
}