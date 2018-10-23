'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unset2 = require('lodash/fp/unset');

var _unset3 = _interopRequireDefault(_unset2);

var _find2 = require('lodash/fp/find');

var _find3 = _interopRequireDefault(_find2);

var _flatten2 = require('lodash/fp/flatten');

var _flatten3 = _interopRequireDefault(_flatten2);

var _omit2 = require('lodash/fp/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _values2 = require('lodash/fp/values');

var _values3 = _interopRequireDefault(_values2);

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

exports.transformErrors = transformErrors;
exports.uiSchemaValidate = uiSchemaValidate;
exports.errorSchemaIsValid = errorSchemaIsValid;
exports.isValidForm = isValidForm;
exports.validateSSN = validateSSN;
exports.validateDate = validateDate;
exports.validateMonthYear = validateMonthYear;
exports.validateCurrentOrPastDate = validateCurrentOrPastDate;
exports.validateCurrentOrPastMonthYear = validateCurrentOrPastMonthYear;
exports.validateFutureDateIfExpectedGrad = validateFutureDateIfExpectedGrad;
exports.validateCurrentOrPastYear = validateCurrentOrPastYear;
exports.validateMatch = validateMatch;
exports.convertToDateField = convertToDateField;
exports.validateDateRange = validateDateRange;
exports.getFileError = getFileError;
exports.validateFileField = validateFileField;
exports.validateBooleanGroup = validateBooleanGroup;
exports.validateAutosuggestOption = validateAutosuggestOption;
exports.validateCurrency = validateCurrency;

var _jsonschema = require('jsonschema');

var _helpers = require('./helpers');

var _validations = require('./utilities/validations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    pathSpecificMessage = (0, _get3.default)(['ui:errorMessages', name], uiSchema);
  } else {
    var cleanPath = path.replace('instance.', '').replace(/\[\d+\]/g, '.items');
    pathSpecificMessage = (0, _get3.default)(cleanPath + '[\'ui:errorMessages\'].' + name, uiSchema);
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
function transformErrors(errors, uiSchema) {
  var newErrors = errors.map(function (error) {
    if (error.name === 'required') {
      var path = error.property + '.' + error.argument;
      return (0, _assign3.default)(error, {
        property: path,
        message: getMessage(path, error.name, uiSchema, error.argument)
      });
    }

    var newMessage = getMessage(error.property, error.name, uiSchema, error.argument);
    if (newMessage) {
      return (0, _set3.default)('message', newMessage, error);
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
 *     someValidation
 *   ]
 * }
 *
 * Each item in the ui:validations array can be a function OR an object:
 *    - Functions are called with (in order)
 *        pathErrors:                   Errors object for the field
 *        currentData:                  Data for the field
 *        formData:                     Current form data
 *        schema:                       Current JSON Schema for the field
 *        uiSchema['ui:errorMessages']: Error messsage object (if available) for the field
 *        currentIndex:                 Used to select the correct field data to validate against
 *    - Objects should have two properties, 'options' and 'validator'
 *        options:   Object (or anything, really) that will be passed to your validation function.
 *                   You can use this to allow your validation function to be configurable for
 *                   different fields on the form.
 *        validator: Same signature as function above, but with extra 'options' object as the
 *                   second-to-last argument (...options, currentIndex)
 * Both versions of custom validators should call `addError()` to actually add any errors to the
 * errors object
 *
 * @param {Object} errors Errors object from rjsf, which includes an addError method
 * @param {Object} uiSchema The uiSchema for the current field
 * @param {Object} schema The schema for the current field
 * @param {Object} formData The (flattened) data for the entire form
 * @param {string} [path] The path to the current field relative to the root of the page.
 * @param {number} [currentIndex] Used to select the correct field data to validate against
 */

function uiSchemaValidate(errors, uiSchema, schema, formData) {
  var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var currentIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var fullFormData = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : formData;

  if (uiSchema && schema) {
    var currentData = path !== '' ? (0, _get3.default)(path, formData) : formData;
    if (uiSchema.items && currentData) {
      currentData.forEach(function (item, index) {
        var newPath = path + '[' + index + ']';
        var currentSchema = index < schema.items.length ? schema.items[index] : schema.additionalItems;
        if (!(0, _get3.default)(newPath, errors)) {
          var currentErrors = path ? (0, _get3.default)(path, errors) : errors;
          currentErrors[index] = {
            __errors: [],
            addError: function addError(error) {
              this.__errors.push(error);
            }
          };
        }
        uiSchemaValidate(errors, uiSchema.items, currentSchema, formData, newPath, index, fullFormData);
      });
    } else if (!uiSchema.items) {
      Object.keys(uiSchema).filter(function (prop) {
        return !prop.startsWith('ui:');
      }).forEach(function (item) {
        var nextPath = path !== '' ? path + '.' + item : item;
        if (!(0, _get3.default)(nextPath, errors)) {
          var currentErrors = path === '' ? errors : (0, _get3.default)(path, errors);

          currentErrors[item] = {
            __errors: [],
            addError: function addError(error) {
              this.__errors.push(error);
            }
          };
        }
        uiSchemaValidate(errors, uiSchema[item], schema.properties[item], formData, nextPath, currentIndex, fullFormData);
      });
    }

    var validations = uiSchema['ui:validations'];
    if (validations && currentData) {
      validations.forEach(function (validation) {
        var pathErrors = path ? (0, _get3.default)(path, errors) : errors;
        if (typeof validation === 'function') {
          validation(pathErrors, currentData, formData, schema, uiSchema['ui:errorMessages'], currentIndex, fullFormData);
        } else {
          validation.validator(pathErrors, currentData, formData, schema, uiSchema['ui:errorMessages'], validation.options, currentIndex, fullFormData);
        }
      });
    }
  }
  return errors;
}

function errorSchemaIsValid(errorSchema) {
  if (errorSchema && errorSchema.__errors && errorSchema.__errors.length) {
    return false;
  }

  return (0, _values3.default)((0, _omit3.default)('__errors', errorSchema)).every(errorSchemaIsValid);
}

function isValidForm(form, pageListByChapters) {
  var pageConfigs = (0, _flatten3.default)((0, _values3.default)(pageListByChapters));
  var validPages = Object.keys(form.pages).filter(function (pageKey) {
    return (0, _helpers.isActivePage)((0, _find3.default)({ pageKey: pageKey }, pageConfigs), form.data);
  });

  var v = new _jsonschema.Validator();
  var fullFormData = form.data;

  return validPages.reduce(function (_ref, page) {
    var isValid = _ref.isValid,
        errors = _ref.errors;
    var _form$pages$page = form.pages[page],
        uiSchema = _form$pages$page.uiSchema,
        schema = _form$pages$page.schema,
        showPagePerItem = _form$pages$page.showPagePerItem,
        itemFilter = _form$pages$page.itemFilter,
        arrayPath = _form$pages$page.arrayPath;

    var formData = fullFormData;

    if (showPagePerItem) {
      var arrayData = formData[arrayPath];
      if (arrayData) {
        formData = (0, _set3.default)(arrayPath, itemFilter ? arrayData.filter(itemFilter) : arrayData, formData);
      } else {
        formData = (0, _unset3.default)(arrayPath, formData);
      }
    }

    var result = v.validate(formData, schema);

    if (result.valid) {
      var customErrors = {};
      // Let path and index be their defaults
      uiSchemaValidate(customErrors, uiSchema, schema, formData, undefined, undefined, fullFormData);

      return {
        isValid: isValid && errorSchemaIsValid(customErrors),
        errors: errors.concat(customErrors)
      };
    }

    return {
      isValid: false,
      // removes PII
      errors: errors.concat(result.errors.map((0, _unset3.default)('instance')))
    };
  }, { isValid: true, errors: [] });
}

function validateSSN(errors, ssn) {
  if (ssn && !(0, _validations.isValidSSN)(ssn)) {
    errors.addError('Please enter a valid 9 digit SSN (dashes allowed)');
  }
}

function validateDate(errors, dateString) {
  var _parseISODate = (0, _helpers.parseISODate)(dateString),
      day = _parseISODate.day,
      month = _parseISODate.month,
      year = _parseISODate.year;

  if (!(0, _validations.isValidPartialDate)(day, month, year)) {
    errors.addError('Please provide a valid date');
  }
}

function validateMonthYear(errors, dateString) {
  var _parseISODate2 = (0, _helpers.parseISODate)(dateString),
      month = _parseISODate2.month,
      year = _parseISODate2.year;

  if (!(0, _validations.isValidPartialMonthYear)(month, year)) {
    errors.addError('Please provide a valid date');
  }
}

/**
 * Adds an error message to errors if a date is an invalid date or in the future.
 *
 * The message it adds can be customized in uiSchema.errorMessages.futureDate
 */
function validateCurrentOrPastDate(errors, dateString, formData, schema) {
  var errorMessages = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _errorMessages$future = errorMessages.futureDate,
      futureDate = _errorMessages$future === undefined ? 'Please provide a valid current or past date' : _errorMessages$future;

  validateDate(errors, dateString);

  var _parseISODate3 = (0, _helpers.parseISODate)(dateString),
      day = _parseISODate3.day,
      month = _parseISODate3.month,
      year = _parseISODate3.year;

  if (!(0, _validations.isValidCurrentOrPastDate)(day, month, year)) {
    errors.addError(futureDate);
  }
}

function validateCurrentOrPastMonthYear(errors, dateString, formData, schema) {
  var errorMessages = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _errorMessages$future2 = errorMessages.futureDate,
      futureDate = _errorMessages$future2 === undefined ? 'Please provide a valid current or past date' : _errorMessages$future2;

  validateMonthYear(errors, dateString);

  var _parseISODate4 = (0, _helpers.parseISODate)(dateString),
      month = _parseISODate4.month,
      year = _parseISODate4.year;

  if (!(0, _validations.isValidPartialMonthYearInPast)(month, year)) {
    errors.addError(futureDate);
  }
}

/**
 * Adds an error message to errors if a date is an invalid date or in the past.
 */
function validateFutureDateIfExpectedGrad(errors, dateString, formData) {
  validateDate(errors, dateString);

  var _parseISODate5 = (0, _helpers.parseISODate)(dateString),
      month = _parseISODate5.month,
      year = _parseISODate5.year;

  if (formData.highSchool.status === 'graduationExpected' && !(0, _validations.isValidCurrentOrFutureMonthYear)(month, year)) {
    errors.addError('Please provide a valid future date');
  }
}

/**
 * Adds an error message to errors if an integer year value is not between 1900 and the current year.
 */
function validateCurrentOrPastYear(errors, year) {
  if (!(0, _validations.isValidCurrentOrPastYear)(year)) {
    errors.addError('Please provide a valid year');
  }
}

function validateMatch(field1, field2) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Please ensure your entries match';

  return function (errors, formData) {
    if (formData[field1] !== formData[field2]) {
      errors[field2].addError(message);
    }
  };
}

function convertToDateField(dateStr) {
  var date = (0, _helpers.parseISODate)(dateStr);
  return Object.keys(date).reduce(function (dateField, part) {
    var datePart = {};
    datePart[part] = {
      value: date[part]
    };
    return (0, _assign3.default)(dateField, datePart);
  }, date);
}

function validateDateRange(errors, dateRange, formData, schema, errorMessages) {
  var fromDate = convertToDateField(dateRange.from);
  var toDate = convertToDateField(dateRange.to);

  if (!(0, _validations.isValidDateRange)(fromDate, toDate)) {
    errors.to.addError(errorMessages.pattern || 'To date must be on or after from date');
  }
}

function getFileError(file) {
  if (file.errorMessage) {
    return file.errorMessage;
  } else if (file.uploading) {
    return 'Uploading file...';
  } else if (!file.confirmationCode) {
    return 'Something went wrong...';
  }

  return null;
}

function validateFileField(errors, fileList) {
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

function validateBooleanGroup(errors, userGroup, form, schema) {
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

function validateAutosuggestOption(errors, formData) {
  if (formData && formData.widget === 'autosuggest' && !formData.id && formData.label) {
    errors.addError('Please select an option from the suggestions');
  }
}

function validateCurrency(errors, currencyAmount) {
  // Source: https://stackoverflow.com/a/16242575
  if (!/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(currencyAmount)) {
    errors.addError('Please enter a valid dollar amount');
  }
}
//# sourceMappingURL=validation.js.map