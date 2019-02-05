'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isValidSSN = isValidSSN;
exports.isValidYear = isValidYear;
exports.isValidPartialDate = isValidPartialDate;
exports.isValidCurrentOrPastDate = isValidCurrentOrPastDate;
exports.isValidCurrentOrPastYear = isValidCurrentOrPastYear;
exports.isValidCurrentOrFutureMonthYear = isValidCurrentOrFutureMonthYear;
exports.parseDateField = parseDateField;
exports.isValidDateRange = isValidDateRange;
exports.isValidRoutingNumber = isValidRoutingNumber;
exports.isValidPartialMonthYear = isValidPartialMonthYear;
exports.isValidPartialMonthYearInPast = isValidPartialMonthYearInPast;

var _dateFns = require('date-fns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Conditions for valid SSN from the original 1010ez pdf form:
// '123456789' is not a valid SSN
// A value where the first 3 digits are 0 is not a valid SSN
// A value where the 4th and 5th digits are 0 is not a valid SSN
// A value where the last 4 digits are 0 is not a valid SSN
// A value with 3 digits, an optional -, 2 digits, an optional -, and 4 digits is a valid SSN
// 9 of the same digits (e.g., '111111111') is not a valid SSN
function isValidSSN(value) {
  if (value === '123456789' || value === '123-45-6789') {
    return false;
  } else if (/^0{3}-?\d{2}-?\d{4}$/.test(value)) {
    return false;
  } else if (/^\d{3}-?0{2}-?\d{4}$/.test(value)) {
    return false;
  } else if (/^\d{3}-?\d{2}-?0{4}$/.test(value)) {
    return false;
  }

  var noBadSameDigitNumber = (0, _range3.default)(0, 10).every(function (i) {
    var sameDigitRegex = new RegExp(i + '{3}-?' + i + '{2}-?' + i + '{4}');
    return !sameDigitRegex.test(value);
  });

  if (!noBadSameDigitNumber) {
    return false;
  }

  return (/^\d{9}$/.test(value) || /^\d{3}-\d{2}-\d{4}$/.test(value)
  );
}

function isValidYear(value) {
  return Number(value) >= 1900 && Number(value) <= (0, _dateFns.getYear)((0, _dateFns.addYears)(new Date(), 100));
}

function isValidPartialDate(day, month, year) {
  if (year && !isValidYear(year)) {
    return false;
  }

  return true;
}

function isValidCurrentOrPastDate(day, month, year) {
  var date = new Date(year, month - 1, day);
  var today = new Date();
  return (0, _dateFns.isSameDay)(date, today) || (0, _dateFns.isBefore)(date, today);
}

function isValidCurrentOrPastYear(value) {
  var currentYear = (0, _dateFns.getYear)(new Date());
  return Number(value) >= 1900 && Number(value) <= currentYear;
}

function isValidCurrentOrFutureMonthYear(month, year) {
  var date = new Date(year, month - 1);
  var today = new Date();
  return (0, _dateFns.isSameMonth)(date, today) || (0, _dateFns.isAfter)(date, today);
}

function isBlank(value) {
  return value === '';
}

function isBlankDateField(field) {
  return isBlank(field.day.value) && isBlank(field.month.value) && isBlank(field.year.value);
}

function parseDateField(dateField) {
  var year = dateField.year.value;
  var month = dateField.month.value || null;
  var day = dateField.day.value || null;
  return new Date(year, month - 1, day);
}

function isValidDateRange(fromDateField, toDateField) {
  if (isBlankDateField(toDateField) || isBlankDateField(fromDateField)) {
    return true;
  }
  var fromDate = parseDateField(fromDateField);
  var toDate = parseDateField(toDateField);
  return fromDate <= toDate;
}

// Pulled from https://en.wikipedia.org/wiki/Routing_transit_number#Check_digit
function isValidRoutingNumber(value) {
  if (/^\d{9}$/.test(value)) {
    var digits = value.split('').map(function (val) {
      return parseInt(val, 10);
    });
    var weighted = 3 * (digits[0] + digits[3] + digits[6]) + 7 * (digits[1] + digits[4] + digits[7]) + (digits[2] + digits[5] + digits[8]);

    return weighted % 10 === 0;
  }
  return false;
}

function isValidPartialMonthYear(month, year) {
  if ((typeof month === 'undefined' ? 'undefined' : _typeof(month)) === 'object') {
    throw new Error('Pass a month and a year to function');
  }
  if (month && (Number(month) > 12 || Number(month) < 1)) {
    return false;
  }

  return isValidPartialDate(null, null, year);
}

function isValidPartialMonthYearInPast(month, year) {
  if ((typeof month === 'undefined' ? 'undefined' : _typeof(month)) === 'object') {
    throw new Error('Pass a month and a year to function');
  }
  var date = new Date(year, month, null);
  var today = new Date();
  var isSameOrBefore = (0, _dateFns.isSameMonth)(date, today) || (0, _dateFns.isBefore)(date, today);
  return !year || isValidPartialMonthYear(month, year) && isSameOrBefore;
}
//# sourceMappingURL=index.js.map