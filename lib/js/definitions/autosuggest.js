'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _merge2 = require('lodash/fp/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

exports.uiSchema = uiSchema;

var _AutosuggestField = require('../fields/AutosuggestField');

var _AutosuggestField2 = _interopRequireDefault(_AutosuggestField);

var _validation = require('../validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// don't use for enum fields, they need access to the
// list of enums and names
var schema = exports.schema = {
  type: 'object',
  properties: {
    id: {
      type: 'any'
    },
    label: {
      type: 'string'
    }
  }
};

/*
 * Create uiSchema for autosuggest
 *
 * @param {string} label - Label for the field
 * @param {function} getOptions - Function that fetchs options to be shown and returns a promise
 * @param {object} options - Any other options to override the uiSchema defaults with
 */
function uiSchema(label, getOptions) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var validations = [];
  if (!(0, _get3.default)('ui:options.freeInput', options)) {
    validations.push(_validation.validateAutosuggestOption);
  }

  return (0, _merge3.default)({
    'ui:title': label,
    'ui:field': _AutosuggestField2.default,
    'ui:validations': validations,
    'ui:errorMessages': {
      type: 'Please select an option from the suggestions'
    },
    'ui:options': {
      showFieldLabel: 'label',
      maxOptions: 20,
      getOptions: getOptions
    }
  }, options);
}
//# sourceMappingURL=autosuggest.js.map