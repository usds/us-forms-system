import _ from 'lodash';
import {
  addYears,
  isSameDay,
  isBefore,
  isSameMonth,
  isAfter,
  getYear
} from 'date-fns';

// Conditions for valid SSN from the original 1010ez pdf form:
// '123456789' is not a valid SSN
// A value where the first 3 digits are 0 is not a valid SSN
// A value where the 4th and 5th digits are 0 is not a valid SSN
// A value where the last 4 digits are 0 is not a valid SSN
// A value with 3 digits, an optional -, 2 digits, an optional -, and 4 digits is a valid SSN
// 9 of the same digits (e.g., '111111111') is not a valid SSN
export function isValidSSN(value) {
  if (value === '123456789' || value === '123-45-6789') {
    return false;
  } else if (/^0{3}-?\d{2}-?\d{4}$/.test(value)) {
    return false;
  } else if (/^\d{3}-?0{2}-?\d{4}$/.test(value)) {
    return false;
  } else if (/^\d{3}-?\d{2}-?0{4}$/.test(value)) {
    return false;
  }

  const noBadSameDigitNumber = _.range(0, 10)
    .every(i => {
      const sameDigitRegex = new RegExp(`${i}{3}-?${i}{2}-?${i}{4}`);
      return !sameDigitRegex.test(value);
    });

  if (!noBadSameDigitNumber) {
    return false;
  }

  return /^\d{9}$/.test(value) || /^\d{3}-\d{2}-\d{4}$/.test(value);
}

export function isValidYear(value) {
  return Number(value) >= 1900 && Number(value) <= getYear(addYears(new Date(), 100));
}

export function isValidPartialDate(day, month, year) {
  if (year && !isValidYear(year)) {
    return false;
  }

  return true;
}

export function isValidCurrentOrPastDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  const today = new Date();
  return isSameDay(date, today) || isBefore(date, today);
}

export function isValidCurrentOrPastYear(value) {
  const currentYear = getYear(new Date());
  return Number(value) >= 1900 && Number(value) <= currentYear;
}

export function isValidCurrentOrFutureMonthYear(month, year) {
  const date = new Date(year, month - 1);
  const today = new Date();
  return isSameMonth(date, today) || isAfter(date, today);
}

function isBlank(value) {
  return value === '';
}

function isBlankDateField(field) {
  return isBlank(field.day.value) && isBlank(field.month.value) && isBlank(field.year.value);
}

export function parseDateField(dateField) {
  const year = dateField.year.value;
  const month = dateField.month.value || null;
  const day = dateField.day.value || null;
  return new Date(year, month - 1, day);
}

export function isValidDateRange(fromDateField, toDateField) {
  if (isBlankDateField(toDateField) || isBlankDateField(fromDateField)) {
    return true;
  }
  const fromDate = parseDateField(fromDateField);
  const toDate = parseDateField(toDateField);
  return fromDate <= toDate;
}

// Pulled from https://en.wikipedia.org/wiki/Routing_transit_number#Check_digit
export function isValidRoutingNumber(value) {
  if (/^\d{9}$/.test(value)) {
    const digits = value.split('').map(val => parseInt(val, 10));
    const weighted =
      3 * (digits[0] + digits[3] + digits[6]) +
      7 * (digits[1] + digits[4] + digits[7]) +
      (digits[2] + digits[5] + digits[8]);

    return (weighted % 10) === 0;
  }
  return false;
}

export function isValidPartialMonthYear(month, year) {
  if (typeof month === 'object') {
    throw new Error('Pass a month and a year to function');
  }
  if (month && (Number(month) > 12 || Number(month) < 1)) {
    return false;
  }

  return isValidPartialDate(null, null, year);
}

export function isValidPartialMonthYearInPast(month, year) {
  if (typeof month === 'object') {
    throw new Error('Pass a month and a year to function');
  }
  const date = new Date(year, month, null);
  const today = new Date();
  const isSameOrBefore = (isSameMonth(date, today) || isBefore(date, today));
  return !year || isValidPartialMonthYear(month, year) && isSameOrBefore;
}
