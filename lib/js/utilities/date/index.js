'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.days = exports.months = undefined;
exports.timeFromNow = timeFromNow;

var _dateFns = require('date-fns');

var months = exports.months = [{ label: 'Jan', value: 1 }, { label: 'Feb', value: 2 }, { label: 'Mar', value: 3 }, { label: 'Apr', value: 4 }, { label: 'May', value: 5 }, { label: 'Jun', value: 6 }, { label: 'Jul', value: 7 }, { label: 'Aug', value: 8 }, { label: 'Sep', value: 9 }, { label: 'Oct', value: 10 }, { label: 'Nov', value: 11 }, { label: 'Dec', value: 12 }];

var twentyNineDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
var thirtyDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
var thirtyOneDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

var days = exports.days = {
  1: thirtyOneDays,
  2: twentyNineDays,
  3: thirtyOneDays,
  4: thirtyDays,
  5: thirtyOneDays,
  6: thirtyDays,
  7: thirtyOneDays,
  8: thirtyOneDays,
  9: thirtyDays,
  10: thirtyOneDays,
  11: thirtyDays,
  12: thirtyOneDays
};

function formatDiff(diff, desc) {
  return diff + ' ' + desc + (diff === 1 ? '' : 's');
}

/**
 * timeFromNow returns the number of days, hours, or minutes until
 * the provided date occurs. It’s meant to be less fuzzy than moment’s
 * timeFromNow so it can be used for expiration dates
 *
 * @param date {Date} The future date to check against
 * @param userFromDate {Date} The earlier date in the range. Defaults to today.
 * @returns {string} The string description of how long until date occurs
 */
function timeFromNow(date) {
  var userFromDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  // Not using defaulting because we want today to be when this function
  // is called, not when the file is parsed and run
  var fromDate = userFromDate || new Date();
  var dayDiff = (0, _dateFns.differenceInDays)(date, fromDate);

  if (dayDiff >= 1) {
    return formatDiff(dayDiff, 'day');
  }

  var hourDiff = (0, _dateFns.differenceInHours)(date, fromDate);

  if (hourDiff >= 1) {
    return formatDiff(hourDiff, 'hour');
  }

  var minuteDiff = (0, _dateFns.differenceInMinutes)(fromDate);

  if (minuteDiff >= 1) {
    return formatDiff(minuteDiff, 'minute');
  }

  var secondDiff = (0, _dateFns.differenceInSeconds)(fromDate);

  if (secondDiff >= 1) {
    return formatDiff(secondDiff, 'second');
  }

  return 'a moment';
}
//# sourceMappingURL=index.js.map