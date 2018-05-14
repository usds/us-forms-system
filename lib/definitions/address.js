import _unset from 'lodash/fp/unset';
import _set from 'lodash/fp/set';
import _get from 'lodash/fp/get';
import _assign from 'lodash/fp/assign';

import { createSelector } from 'reselect';

import { countries, states, isValidUSZipCode, isValidCanPostalCode } from '../utils/address';

function validatePostalCodes(errors, address) {
  var isValidPostalCode = true;

  // Checks if postal code is valid
  if (address.country === 'USA') {
    isValidPostalCode = isValidPostalCode && isValidUSZipCode(address.postalCode);
  }
  if (address.country === 'CAN') {
    isValidPostalCode = isValidPostalCode && isValidCanPostalCode(address.postalCode);
  }

  // Add error message for postal code if it is invalid
  if (address.postalCode && !isValidPostalCode) {
    errors.postalCode.addError('Please provide a valid postal code');
  }
}

export var stateRequiredCountries = new Set(['USA', 'CAN', 'MEX']);

function validateAddress(errors, address, formData, currentSchema) {
  // Adds error message for state if it is blank and one of the following countries:
  // USA, Canada, or Mexico
  if (stateRequiredCountries.has(address.country) && address.state === undefined && currentSchema.required.length) {
    errors.state.addError('Please select a state or province');
  }

  var hasAddressInfo = stateRequiredCountries.has(address.country) && !currentSchema.required.length && typeof address.street !== 'undefined' && typeof address.city !== 'undefined' && typeof address.postalCode !== 'undefined';

  if (hasAddressInfo && typeof address.state === 'undefined') {
    errors.state.addError('Please enter a state or province, or remove other address information.');
  }

  validatePostalCodes(errors, address);
}

var countryValues = countries.map(function (object) {
  return object.value;
});
var countryNames = countries.map(function (object) {
  return object.label;
});
var militaryStates = states.USA.filter(function (state) {
  return state.value === 'AE' || state.value === 'AP' || state.value === 'AA';
}).map(function (state) {
  return state.value;
});
var militaryLabels = states.USA.filter(function (state) {
  return state.value === 'AE' || state.value === 'AP' || state.value === 'AA';
}).map(function (state) {
  return state.label;
});
var usaStates = states.USA.map(function (state) {
  return state.value;
});
var usaLabels = states.USA.map(function (state) {
  return state.label;
});
var canProvinces = states.CAN.map(function (state) {
  return state.value;
});
var canLabels = states.CAN.map(function (state) {
  return state.label;
});
var mexStates = states.MEX.map(function (state) {
  return state.value;
});
var mexLabels = states.MEX.map(function (state) {
  return state.label;
});

function isMilitaryCity() {
  var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var lowerCity = city.toLowerCase().trim();

  return lowerCity === 'apo' || lowerCity === 'fpo' || lowerCity === 'dpo';
}

var requiredFields = ['street', 'city', 'country', 'state', 'postalCode'];

/*
 * Create schema for addresses
 *
 * @param {object} schema - Schema for a full form, including address definition in definitions
 * @param {boolean} isRequired - If the address is required or not, defaults to false
 */
export function schema(currentSchema) {
  var isRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return {
    type: 'object',
    required: isRequired ? requiredFields : [],
    properties: _assign(currentSchema.definitions.address.properties, {
      country: {
        'default': 'USA',
        type: 'string',
        'enum': countryValues,
        enumNames: countryNames
      },
      state: {
        title: 'State',
        type: 'string',
        maxLength: 51
      },
      postalCode: {
        type: 'string',
        maxLength: 10
      }
    })
  };
}

/*
 * Create uiSchema for addresses
 *
 * @param {string} label - Block label for the address
 * @param {boolean} useStreet3 - Show a third line in the address
 * @param {function} isRequired - A function for conditionally setting if an address is required.
 *   Receives formData and an index (if in an array item)
 * @param {boolean} ignoreRequired - Ignore the required fields array, to avoid overwriting form specific
 *   customizations
 */
export function uiSchema() {
  var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Address';
  var useStreet3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var isRequired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var ignoreRequired = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var fieldOrder = ['country', 'street', 'street2', 'street3', 'city', 'state', 'postalCode'];
  if (!useStreet3) {
    fieldOrder = fieldOrder.filter(function (field) {
      return field !== 'street3';
    });
  }

  var addressChangeSelector = createSelector(function (_ref) {
    var formData = _ref.formData,
        path = _ref.path;
    return _get(path.concat('country'), formData);
  }, function (_ref2) {
    var formData = _ref2.formData,
        path = _ref2.path;
    return _get(path.concat('city'), formData);
  }, _get('addressSchema'), function (currentCountry, city, addressSchema) {
    var schemaUpdate = {
      properties: addressSchema.properties,
      required: addressSchema.required
    };
    var country = currentCountry || addressSchema.properties.country.default;
    var required = addressSchema.required.length > 0;

    var stateList = void 0;
    var labelList = void 0;
    if (country === 'USA') {
      stateList = usaStates;
      labelList = usaLabels;
    } else if (country === 'CAN') {
      stateList = canProvinces;
      labelList = canLabels;
    } else if (country === 'MEX') {
      stateList = mexStates;
      labelList = mexLabels;
    }

    if (stateList) {
      // We have a list and it’s different, so we need to make schema updates
      if (addressSchema.properties.state.enum !== stateList) {
        var withEnum = _set('state.enum', stateList, schemaUpdate.properties);
        schemaUpdate.properties = _set('state.enumNames', labelList, withEnum);

        // all the countries with state lists require the state field, so add that if necessary
        if (!ignoreRequired && required && !addressSchema.required.some(function (field) {
          return field === 'state';
        })) {
          schemaUpdate.required = addressSchema.required.concat('state');
        }
      }
      // We don’t have a state list for the current country, but there’s an enum in the schema
      // so we need to update it
    } else if (addressSchema.properties.state.enum) {
      var withoutEnum = _unset('state.enum', schemaUpdate.properties);
      schemaUpdate.properties = _unset('state.enumNames', withoutEnum);
      if (!ignoreRequired && required) {
        schemaUpdate.required = addressSchema.required.filter(function (field) {
          return field !== 'state';
        });
      }
    }

    // Canada has a different title than others, so set that when necessary
    if (country === 'CAN' && addressSchema.properties.state.title !== 'Province') {
      schemaUpdate.properties = _set('state.title', 'Province', schemaUpdate.properties);
    } else if (country !== 'CAN' && addressSchema.properties.state.title !== 'State') {
      schemaUpdate.properties = _set('state.title', 'State', schemaUpdate.properties);
    }

    // We constrain the state list when someone picks a city that’s a military base
    if (country === 'USA' && isMilitaryCity(city) && schemaUpdate.properties.state.enum !== militaryStates) {
      var _withEnum = _set('state.enum', militaryStates, schemaUpdate.properties);
      schemaUpdate.properties = _set('state.enumNames', militaryLabels, _withEnum);
    }

    return schemaUpdate;
  });

  return {
    'ui:title': label,
    'ui:validations': [validateAddress],
    'ui:options': {
      updateSchema: function updateSchema(formData, addressSchema, addressUiSchema, index, path) {
        var currentSchema = addressSchema;
        if (isRequired) {
          var required = isRequired(formData, index);
          if (required && currentSchema.required.length === 0) {
            currentSchema = _set('required', requiredFields, currentSchema);
          } else if (!required && currentSchema.required.length > 0) {
            currentSchema = _set('required', [], currentSchema);
          }
        }
        return addressChangeSelector({
          formData: formData,
          addressSchema: currentSchema,
          path: path
        });
      }
    },
    'ui:order': fieldOrder,
    country: {
      'ui:title': 'Country'
    },
    street: {
      'ui:title': 'Street'
    },
    street2: {
      'ui:title': 'Line 2'
    },
    street3: {
      'ui:title': 'Line 3'
    },
    city: {
      'ui:title': 'City'
    },
    state: {},
    postalCode: {
      'ui:title': 'Postal code',
      'ui:options': {
        widgetClassNames: 'usa-input-medium'
      }
    }
  };
}