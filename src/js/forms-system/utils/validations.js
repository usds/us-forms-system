import _ from 'lodash';
import moment from 'moment';
import { dateToMoment } from '../helpers';

export function isBlank(value) {
  return value === '';
}

export function isNotBlank(value) {
  return value !== '';
}

export function isValidRequiredField(validator, field) {
  return isNotBlank(field.value) && validator(field.value);
}

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

export function isValidPartialDate(day, month, year) {
  if (year && !isValidYear(year)) {
    return false;
  }

  return true;
}

export function isValidCurrentOrPastDate(day, month, year) {
  const momentDate = moment({ day, month: parseInt(month, 10) - 1, year });
  return momentDate.isSameOrBefore(moment().endOf('day'), 'day');
}

export function isValidCurrentOrPastYear(value) {
  return Number(value) >= 1900 && Number(value) < moment().year() + 1;
}

export function isValidCurrentOrFutureMonthYear(month, year) {
  const momentDate = moment({ month: parseInt(month, 10) - 1, year });
  return momentDate.isSameOrAfter(moment(), 'month');
}

export function isValidDateRange(fromDate, toDate) {
  if (isBlankDateField(toDate) || isBlankDateField(fromDate)) {
    return true;
  }
  const momentStart = dateToMoment(fromDate);
  const momentEnd = dateToMoment(toDate);

  return momentStart.isBefore(momentEnd);
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
  const momentDate = moment({ year, month: month ? parseInt(month, 10) - 1 : null });
  return !year || isValidPartialMonthYear(month, year) && momentDate.isValid() && momentDate.isSameOrBefore(moment().startOf('month'));
}
