import _unset from 'lodash/fp/unset';
import _find from 'lodash/fp/find';
import _flatten from 'lodash/fp/flatten';
import _omit from 'lodash/fp/omit';
import _values from 'lodash/fp/values';
import _set from 'lodash/fp/set';
import _assign from 'lodash/fp/assign';
import _get from 'lodash/fp/get';

import { Validator } from 'jsonschema';

import { isValidSSN, isValidPartialDate, isValidCurrentOrPastDate, isValidCurrentOrPastYear, isValidCurrentOrFutureMonthYear, isValidDateRange, isValidRoutingNumber, isValidPartialMonthYear, isValidPartialMonthYearInPast } from './utils/validations';

import { isActivePage, parseISODate } from './helpers';

/*
 * This contains the code for supporting our own custom validations and messages
 */

/*
 * Override the default messages for these json schema error types
 */
var defaultMessages = {
  required: 'Please provide a response',
  'enum': 'Please select a valid option',
  maxLength: function maxLength(max) {
    return 'This field should be less than ' + max + ' characters';
  },
  minLength: function minLength(min) {
    return 'This field should be at least ' + min + ' character(s)';
  },
  format: function format(type) {
    if (type === 'email') {
      return 'Please enter a valid email address';
    }

    return 'Please enter a valid value';
  }
};

function getMessage(path, name, uiSchema, errorArgument) {
  var pathSpecificMessage = void 0;
  if (path === 'instance') {
    pathSpecificMessage = _get(['ui:errorMessages', name], uiSchema);
  } else {
    var cleanPath = path.replace('instance.', '').replace(/\[\d+\]/g, '.items');
    pathSpecificMessage = _get(cleanPath + '[\'ui:errorMessages\'].' + name, uiSchema);
  }

  if (pathSpecificMessage) {
    return pathSpecificMessage;
  }

  return typeof defaultMessages[name] === 'function' ? defaultMessages[name](errorArgument) : defaultMessages[name];
}

/*
 * This takes the list of errors outputted by the json schema node library
 * and moves the required errors to the missing field, rather than the containing
 * object.
 *
 * It also replaces the error messages with any form specific messages.
 */
export function transformErrors(errors, uiSchema) {
  var newErrors = errors.map(function (error) {
    if (error.name === 'required') {
      var path = error.property + '.' + error.argument;
      return _assign(error, {
        property: path,
        message: getMessage(path, error.name, uiSchema, error.argument)
      });
    }

    var newMessage = getMessage(error.property, error.name, uiSchema, error.argument);
    if (newMessage) {
      return _set('message', newMessage, error);
    }

    return error;
  });

  return newErrors;
}

/**
 * This pulls custom validations specified in the uiSchema and validates the formData
 * against them.
 *
 * Expects validations that look like:
 *
 * someField: {
 *   "ui:validations": [
 *     someValidationFunction,
 *   ]
 * }
 *
 * The function is passed errors, fieldData, pageData, formData, and otherData and
 * should call addError to add the error.
 *
 * @param {Object} errors Errors object from rjsf, which includes an addError method
 * @param {Object} uiSchema The uiSchema for the current field
 * @param {Object} schema The schema for the current field
 * @param {Object} formData The (flattened) data for the entire form
 * @param {String} path The path to the current field relative to the root of the page.
 *   Used to select the correct field data to validate against
 */

export function uiSchemaValidate(errors, uiSchema, schema, formData) {
  var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var currentIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  if (uiSchema && schema) {
    var currentData = path !== '' ? _get(path, formData) : formData;
    if (uiSchema.items && currentData) {
      currentData.forEach(function (item, index) {
        var newPath = path + '[' + index + ']';
        var currentSchema = index < schema.items.length ? schema.items[index] : schema.additionalItems;
        if (!_get(newPath, errors)) {
          var currentErrors = path ? _get(path, errors) : errors;
          currentErrors[index] = {
            __errors: [],
            addError: function addError(error) {
              this.__errors.push(error);
            }
          };
        }
        uiSchemaValidate(errors, uiSchema.items, currentSchema, formData, newPath, index);
      });
    } else if (!uiSchema.items) {
      Object.keys(uiSchema).filter(function (prop) {
        return !prop.startsWith('ui:');
      }).forEach(function (item) {
        var nextPath = path !== '' ? path + '.' + item : item;
        if (!_get(nextPath, errors)) {
          var currentErrors = path === '' ? errors : _get(path, errors);

          currentErrors[item] = {
            __errors: [],
            addError: function addError(error) {
              this.__errors.push(error);
            }
          };
        }
        uiSchemaValidate(errors, uiSchema[item], schema.properties[item], formData, nextPath, currentIndex);
      });
    }

    var validations = uiSchema['ui:validations'];
    if (validations && currentData) {
      validations.forEach(function (validation) {
        var pathErrors = path ? _get(path, errors) : errors;
        if (typeof validation === 'function') {
          validation(pathErrors, currentData, formData, schema, uiSchema['ui:errorMessages'], currentIndex);
        } else {
          validation.validator(pathErrors, currentData, formData, schema, uiSchema['ui:errorMessages'], validation.options, currentIndex);
        }
      });
    }
  }
  return errors;
}

export function errorSchemaIsValid(errorSchema) {
  if (errorSchema && errorSchema.__errors && errorSchema.__errors.length) {
    return false;
  }

  return _values(_omit('__errors', errorSchema)).every(errorSchemaIsValid);
}

export function isValidForm(form, pageListByChapters) {
  var pageConfigs = _flatten(_values(pageListByChapters));
  var validPages = Object.keys(form.pages).filter(function (pageKey) {
    return isActivePage(_find({ pageKey: pageKey }, pageConfigs), form.data);
  });

  var v = new Validator();

  if (!form.data.privacyAgreementAccepted) {
    return { isValid: false };
  }

  return validPages.reduce(function (_ref, page) {
    var isValid = _ref.isValid,
        errors = _ref.errors;
    var _form$pages$page = form.pages[page],
        uiSchema = _form$pages$page.uiSchema,
        schema = _form$pages$page.schema,
        showPagePerItem = _form$pages$page.showPagePerItem,
        itemFilter = _form$pages$page.itemFilter,
        arrayPath = _form$pages$page.arrayPath;

    var formData = form.data;

    if (showPagePerItem) {
      var arrayData = formData[arrayPath];
      if (arrayData) {
        formData = _set(arrayPath, itemFilter ? arrayData.filter(itemFilter) : arrayData, formData);
      } else {
        formData = _unset(arrayPath, formData);
      }
    }

    var result = v.validate(formData, schema);

    if (result.valid) {
      var customErrors = {};
      uiSchemaValidate(customErrors, uiSchema, schema, formData);

      return {
        isValid: isValid && errorSchemaIsValid(customErrors),
        errors: errors.concat(customErrors)
      };
    }

    return {
      isValid: false,
      // removes PII
      errors: errors.concat(result.errors.map(_unset('instance')))
    };
  }, { isValid: true, errors: [] });
}

export function validateSSN(errors, ssn) {
  if (ssn && !isValidSSN(ssn)) {
    errors.addError('Please enter a valid 9 digit SSN (dashes allowed)');
  }
}

export function validateDate(errors, dateString) {
  var _parseISODate = parseISODate(dateString),
      day = _parseISODate.day,
      month = _parseISODate.month,
      year = _parseISODate.year;

  if (!isValidPartialDate(day, month, year)) {
    errors.addError('Please provide a valid date');
  }
}

export function validateMonthYear(errors, dateString) {
  var _parseISODate2 = parseISODate(dateString),
      month = _parseISODate2.month,
      year = _parseISODate2.year;

  if (!isValidPartialMonthYear(month, year)) {
    errors.addError('Please provide a valid date');
  }
}

/**
 * Adds an error message to errors if a date is an invalid date or in the future.
 *
 * The message it adds can be customized in uiSchema.errorMessages.futureDate
 */
export function validateCurrentOrPastDate(errors, dateString, formData, schema) {
  var errorMessages = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _errorMessages$future = errorMessages.futureDate,
      futureDate = _errorMessages$future === undefined ? 'Please provide a valid current or past date' : _errorMessages$future;

  validateDate(errors, dateString);

  var _parseISODate3 = parseISODate(dateString),
      day = _parseISODate3.day,
      month = _parseISODate3.month,
      year = _parseISODate3.year;

  if (!isValidCurrentOrPastDate(day, month, year)) {
    errors.addError(futureDate);
  }
}

export function validateCurrentOrPastMonthYear(errors, dateString, formData, schema) {
  var errorMessages = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _errorMessages$future2 = errorMessages.futureDate,
      futureDate = _errorMessages$future2 === undefined ? 'Please provide a valid current or past date' : _errorMessages$future2;

  validateMonthYear(errors, dateString);

  var _parseISODate4 = parseISODate(dateString),
      month = _parseISODate4.month,
      year = _parseISODate4.year;

  if (!isValidPartialMonthYearInPast(month, year)) {
    errors.addError(futureDate);
  }
}

/**
 * Adds an error message to errors if a date is an invalid date or in the past.
 */
export function validateFutureDateIfExpectedGrad(errors, dateString, formData) {
  validateDate(errors, dateString);

  var _parseISODate5 = parseISODate(dateString),
      month = _parseISODate5.month,
      year = _parseISODate5.year;

  if (formData.highSchool.status === 'graduationExpected' && !isValidCurrentOrFutureMonthYear(month, year)) {
    errors.addError('Please provide a valid future date');
  }
}

/**
 * Adds an error message to errors if an integer year value is not between 1900 and the current year.
 */
export function validateCurrentOrPastYear(errors, year) {
  if (!isValidCurrentOrPastYear(year)) {
    errors.addError('Please provide a valid year');
  }
}

export function validateMatch(field1, field2) {
  return function (errors, formData) {
    if (formData[field1] !== formData[field2]) {
      errors[field2].addError('Please ensure your entries match');
    }
  };
}

export function validateRoutingNumber(errors, routingNumber, formData, schema, errorMessages) {
  if (!isValidRoutingNumber(routingNumber)) {
    errors.addError(errorMessages.pattern);
  }
}

export function convertToDateField(dateStr) {
  var date = parseISODate(dateStr);
  return Object.keys(date).reduce(function (dateField, part) {
    var datePart = {};
    datePart[part] = {
      value: date[part]
    };
    return _assign(dateField, datePart);
  }, date);
}

export function validateDateRange(errors, dateRange, formData, schema, errorMessages) {
  var fromDate = convertToDateField(dateRange.from);
  var toDate = convertToDateField(dateRange.to);

  if (!isValidDateRange(fromDate, toDate)) {
    errors.to.addError(errorMessages.pattern || 'To date must be after from date');
  }
}

export function getFileError(file) {
  if (file.errorMessage) {
    return file.errorMessage;
  } else if (file.uploading) {
    return 'Uploading file...';
  } else if (!file.confirmationCode) {
    return 'Something went wrong...';
  }

  return null;
}

export function validateFileField(errors, fileList) {
  fileList.forEach(function (file, index) {
    var error = getFileError(file);

    if (error && !errors[index]) {
      /* eslint-disable no-param-reassign */
      errors[index] = {
        __errors: [],
        addError: function addError(msg) {
          this.__errors.push(msg);
        }
      };
      /* eslint-enable no-param-reassign */
    }

    if (error) {
      errors[index].addError(error);
    }
  });
}

export function validateBooleanGroup(errors, userGroup, form, schema) {
  var errorMessages = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _errorMessages$atLeas = errorMessages.atLeastOne,
      atLeastOne = _errorMessages$atLeas === undefined ? 'Please choose at least one option' : _errorMessages$atLeas;

  var group = userGroup || {};
  if (!Object.keys(group).filter(function (item) {
    return group[item] === true;
  }).length) {
    errors.addError(atLeastOne);
  }
}

export function validateAutosuggestOption(errors, formData) {
  if (formData && formData.widget === 'autosuggest' && !formData.id && formData.label) {
    errors.addError('Please select an option from the suggestions');
  }
}