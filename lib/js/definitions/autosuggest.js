import _merge from 'lodash/fp/merge';
import _get from 'lodash/fp/get';


import AutosuggestField from '../fields/AutosuggestField';
import { validateAutosuggestOption } from '../validation';

// don't use for enum fields, they need access to the
// list of enums and names
export var schema = {
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
export function uiSchema(label, getOptions) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var validations = [];
  if (!_get('ui:options.freeInput', options)) {
    validations.push(validateAutosuggestOption);
  }

  return _merge({
    'ui:title': label,
    'ui:field': AutosuggestField,
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