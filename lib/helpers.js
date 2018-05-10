import _uniq from 'lodash/fp/uniq';
import _merge from 'lodash/fp/merge';
import _intersection from 'lodash/fp/intersection';
import _get from 'lodash/fp/get';
import _omit from 'lodash/fp/omit';
import _unset from 'lodash/fp/unset';
import _matches from 'lodash/fp/matches';
import _set from 'lodash/fp/set';
import _assign from 'lodash/fp/assign';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import moment from 'moment';
import shouldUpdate from 'recompose/shouldUpdate';
import { deepEquals } from '@department-of-veterans-affairs/react-jsonschema-form/lib/utils';
import Scroll from 'react-scroll';
import fastLevenshtein from 'fast-levenshtein';

import FormPage from './containers/FormPage';
import ReviewPage from './review/ReviewPage';

export function createFormPageList(formConfig) {
  return Object.keys(formConfig.chapters).reduce(function (pageList, chapter) {
    var chapterTitle = formConfig.chapters[chapter].title;
    var pages = Object.keys(formConfig.chapters[chapter].pages).map(function (page) {
      return _assign(formConfig.chapters[chapter].pages[page], {
        chapterTitle: chapterTitle,
        chapterKey: chapter,
        pageKey: page
      });
    });
    return pageList.concat(pages);
  }, []);
}

export function createPageListByChapter(formConfig) {
  return Object.keys(formConfig.chapters).reduce(function (chapters, chapter) {
    var pages = Object.keys(formConfig.chapters[chapter].pages).map(function (page) {
      return _assign(formConfig.chapters[chapter].pages[page], {
        pageKey: page,
        chapterKey: chapter
      });
    });
    return _set(chapter, pages, chapters);
  }, {});
}

export function createPageList(formConfig, formPages) {
  var pageList = formPages;
  if (formConfig.introduction) {
    pageList = [{
      pageKey: 'introduction',
      path: 'introduction'
    }].concat(pageList);
  }

  return pageList.concat([{
    pageKey: 'review-and-submit',
    path: 'review-and-submit',
    chapterKey: 'review'
  }]).map(function (page) {
    return _set('path', '' + (formConfig.urlPrefix || '') + page.path, page);
  });
}

/*
 * Create the routes based on a form config. This goes through each chapter in a form
 * config, pulls out the config for each page, then generates a list of Route components with the
 * config as props
 */
export function createRoutes(formConfig) {
  var formPages = createFormPageList(formConfig);
  var pageList = createPageList(formConfig, formPages);
  var Page = FormPage;
  var routes = formPages.map(function (page) {
    return {
      path: page.path,
      component: page.component || Page,
      pageConfig: page,
      pageList: pageList,
      urlPrefix: formConfig.urlPrefix
    };
  });

  if (formConfig.introduction) {
    routes = [{
      path: 'introduction',
      component: formConfig.introduction,
      formConfig: formConfig,
      pageList: pageList
    }].concat(routes);
  }

  return routes.concat([{
    path: 'review-and-submit',
    formConfig: formConfig,
    component: ReviewPage,
    pageList: pageList
  }, {
    path: 'confirmation',
    component: formConfig.confirmation
  }, {
    path: '*',
    onEnter: function onEnter(nextState, replace) {
      return replace(formConfig.urlPrefix || '/');
    }
  }]);
}

export function dateToMoment(dateField) {
  return moment({
    year: dateField.year.value,
    month: dateField.month.value ? parseInt(dateField.month.value, 10) - 1 : '',
    day: dateField.day ? dateField.day.value : null
  });
}

export function focusElement(selectorOrElement) {
  var el = typeof selectorOrElement === 'string' ? document.querySelector(selectorOrElement) : selectorOrElement;

  if (el) {
    el.setAttribute('tabindex', '-1');
    el.focus();
  }
}

function formatDayMonth(val) {
  if (val) {
    var dayOrMonth = val.toString();
    if (Number(dayOrMonth) && dayOrMonth.length === 1) {
      return '0' + val;
    } else if (Number(dayOrMonth)) {
      return dayOrMonth;
    }
  }

  return 'XX';
}

function formatYear(val) {
  if (!val || !val.length) {
    return 'XXXX';
  }

  return val;
}

export function formatISOPartialDate(_ref) {
  var month = _ref.month,
      day = _ref.day,
      year = _ref.year;

  if (month || day || year) {
    return formatYear(year) + '-' + formatDayMonth(month) + '-' + formatDayMonth(day);
  }

  return undefined;
}

export function formatReviewDate(dateString) {
  var monthYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (dateString) {
    var _dateString$split = dateString.split('-', 3),
        _dateString$split2 = _slicedToArray(_dateString$split, 3),
        year = _dateString$split2[0],
        month = _dateString$split2[1],
        day = _dateString$split2[2];

    return monthYear ? formatDayMonth(month) + '/' + formatYear(year) : formatDayMonth(month) + '/' + formatDayMonth(day) + '/' + formatYear(year);
  }

  return undefined;
}

export function isActivePage(page, data) {
  if (typeof page.depends === 'function') {
    return page.depends(data, page.index);
  }

  if (Array.isArray(page.depends)) {
    return page.depends.some(function (condition) {
      return _matches(condition)(data);
    });
  }

  return page.depends === undefined || _matches(page.depends)(data);
}

export function getActivePages(pages, data) {
  return pages.filter(function (page) {
    return isActivePage(page, data);
  });
}

export function getInactivePages(pages, data) {
  return pages.filter(function (page) {
    return !isActivePage(page, data);
  });
}

export function parseISODate(dateString) {
  if (typeof dateString === 'string') {
    var _dateString$split3 = dateString.split('-', 3),
        _dateString$split4 = _slicedToArray(_dateString$split3, 3),
        year = _dateString$split4[0],
        month = _dateString$split4[1],
        day = _dateString$split4[2];

    return {
      month: month === 'XX' ? '' : Number(month).toString(),
      day: day === 'XX' ? '' : Number(day).toString(),
      year: year === 'XXXX' ? '' : year
    };
  }

  return {
    month: '',
    day: '',
    year: ''
  };
}

/*
 * Removes 'view:' fields from data object
 */
export function filterViewFields(data) {
  return Object.keys(data).reduce(function (newData, nextProp) {
    var field = data[nextProp];

    if (Array.isArray(field)) {
      var newArray = field.map(function (item) {
        return filterViewFields(item);
      });

      return _set(nextProp, newArray, newData);
    }

    if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
      if (nextProp.startsWith('view:')) {
        return _assign(newData, filterViewFields(field));
      }
      return _set(nextProp, filterViewFields(field), newData);
    }

    if (!nextProp.startsWith('view:')) {
      return _set(nextProp, field, newData);
    }

    return newData;
  }, {});
}

export function filterInactivePages(pages, form) {
  return pages.reduce(function (formData, page) {
    return Object.keys(page.schema.properties).reduce(function (currentData, prop) {
      return _unset(prop, currentData);
    }, formData);
  }, form.data);
}

export function stringifyFormReplacer(key, value) {
  // an object with country is an address
  if (value && typeof value.country !== 'undefined' && (!value.street || !value.city || !value.postalCode && !value.zipcode)) {
    return undefined;
  }

  // clean up empty objects, which we have no reason to send
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var fields = Object.keys(value);
    if (fields.length === 0 || fields.every(function (field) {
      return value[field] === undefined;
    })) {
      return undefined;
    }
    // autosuggest widgets save value and label info, but we should just return the value
    if (value.widget === 'autosuggest') {
      return value.id;
    }

    // Exclude file data
    if (value.confirmationCode && (value.serverPath || value.file)) {
      return _omit(['serverPath', 'serverName', 'file'], value);
    }
  }

  // Clean up empty objects in arrays
  if (Array.isArray(value)) {
    var newValues = value.filter(function (v) {
      return !!stringifyFormReplacer(key, v);
    });
    // If every item in the array is cleared, remove the whole array
    return newValues.length > 0 ? newValues : undefined;
  }

  return value;
}

/*
 * Normal transform for schemaform data
 */
export function transformForSubmit(formConfig, form) {
  var replacer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringifyFormReplacer;

  var inactivePages = getInactivePages(createFormPageList(formConfig), form.data);
  var withoutInactivePages = filterInactivePages(inactivePages, form);
  var withoutViewFields = filterViewFields(withoutInactivePages);

  return JSON.stringify(withoutViewFields, replacer) || '{}';
}

function isHiddenField(schema) {
  return !!schema['ui:collapsed'] || !!schema['ui:hidden'];
}

/*
 * Pull the array fields from a schema. Used to separate out array fields
 * from the rest of page to be displayed on the review page
 */
export function getArrayFields(data) {
  var fields = [];
  var findArrays = function findArrays(obj, ui) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (obj.type === 'array' && !isHiddenField(obj) && !_get('ui:options.keepInPageOnReview', ui)) {
      fields.push({
        path: path,
        schema: _set('definitions', data.schema.definitions, obj),
        uiSchema: _get(path, data.uiSchema) || data.uiSchema
      });
    }

    if (obj.type === 'object' && !isHiddenField(obj)) {
      Object.keys(obj.properties).forEach(function (prop) {
        findArrays(obj.properties[prop], ui[prop], path.concat(prop));
      });
    }
  };

  findArrays(data.schema, data.uiSchema);

  return fields;
}

/*
 * Checks to see if there are non array fields in a page schema, so that
 * we don’t show a blank page header on the review page if a page is just
 * a growable table
 */
export function hasFieldsOtherThanArray(schema) {
  if (schema.$ref || schema.type !== 'object' && schema.type !== 'array') {
    return true;
  }

  if (schema.type === 'object') {
    return Object.keys(schema.properties).some(function (nextProp) {
      return hasFieldsOtherThanArray(schema.properties[nextProp]);
    });
  }

  return false;
}

/*
 * Return a schema without array fields. If the schema has only array fields,
 * then return undefined (because there’s no reason to use an object schema with
 * no properties)
 */
export function getNonArraySchema(schema) {
  var uiSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (schema.type === 'array' && !_get('ui:options.keepInPageOnReview', uiSchema)) {
    return undefined;
  }

  if (schema.type === 'object') {
    var newProperties = Object.keys(schema.properties).reduce(function (current, next) {
      var newSchema = getNonArraySchema(schema.properties[next], uiSchema[next]);

      if (typeof newSchema === 'undefined') {
        return _unset(next, current);
      }

      if (newSchema !== schema.properties[next]) {
        return _set(next, newSchema, current);
      }

      return current;
    }, schema.properties);

    if (Object.keys(newProperties).length === 0) {
      return undefined;
    }

    if (newProperties !== schema.properties) {
      var newSchema = _set('properties', newProperties, schema);
      if (newSchema.required) {
        var newRequired = _intersection(Object.keys(newSchema.properties), newSchema.required);
        if (newRequired.length !== newSchema.required.length) {
          newSchema = _set('required', newRequired, newSchema);
        }
      }

      return newSchema;
    }
  }

  return schema;
}

export var pureWithDeepEquals = shouldUpdate(function (props, nextProps) {
  return !deepEquals(props, nextProps);
});

/**
 * Recursively checks to see if the schema is valid.
 *
 * Note: This only returns true. If the schema is invalid, an error is thrown to
 *  stop everything.
 *
 * @param {Object} schema - The schema in question
 * @return {bool}         - true if we succeed
 * @throws {Error}        - If the schema is invalid
 */
export function checkValidSchema(schema) {
  var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['root'];

  if (typeof schema.type !== 'string') {
    errors.push('Missing type in ' + path.join('.') + ' schema.');
  }

  if (schema.type === 'object') {
    if (_typeof(schema.properties) !== 'object') {
      errors.push('Missing object properties in ' + path.join('.') + ' schema.');
    } else {
      Object.keys(schema.properties).forEach(function (propName) {
        checkValidSchema(schema.properties[propName], errors, [].concat(_toConsumableArray(path), [propName]));
      });
    }
  }

  if (schema.type === 'array') {
    // We check this both before items is turned into additionalItems and after,
    //  so we need to account for it being both an object and an array.
    if (Array.isArray(schema.items)) {
      if (!schema.additionalItems) {
        errors.push(path.join('.') + ' should contain additionalItems when items is an array.');
      }
      schema.items.forEach(function (item, index) {
        checkValidSchema(item, errors, [].concat(_toConsumableArray(path), ['items', index]));
      });
    } else if (_typeof(schema.items) === 'object') {
      if (schema.additionalItems) {
        errors.push(path.join('.') + ' should not contain additionalItems when items is an object.');
      }
      checkValidSchema(schema.items, errors, [].concat(_toConsumableArray(path), ['items']));
    } else {
      errors.push('Missing items schema in ' + path.join('.') + '.');
    }

    // Check additionalItems
    if (schema.additionalItems) {
      checkValidSchema(schema.additionalItems, errors, [].concat(_toConsumableArray(path), ['additionalItems']));
    }
  }

  // We’ve recursed all the way back down to ['root']; throw an error containing
  //  all the error messages.
  if (path.length === 1 && errors.length > 0) {
    // console.log(`Error${errors.length > 1 ? 's' : ''} found in schema: ${errors.join(' ')} -- ${path.join('.')}`);
    throw new Error('Error' + (errors.length > 1 ? 's' : '') + ' found in schema: ' + errors.join(' '));
  } else {
    return true;
  }
}

export function setArrayRecordTouched(prefix, index) {
  return _defineProperty({}, prefix + '_' + index, true);
}

export function createUSAStateLabels(states) {
  return states.USA.reduce(function (current, _ref3) {
    var label = _ref3.label,
        value = _ref3.value;

    return _merge(current, _defineProperty({}, value, label));
  }, {});
}

/*
 * Take a list of pages and create versions of them
 * for each item in an array
 */
function generateArrayPages(arrayPages, data) {
  var items = _get(arrayPages[0].arrayPath, data) || [];
  return items.reduce(function (pages, item, index) {
    return pages.concat(arrayPages.map(function (page) {
      return _assign(page, {
        path: page.path.replace(':index', index),
        index: index
      });
    }));
  }, [])
  // doing this after the map so that we don’t change indexes
  .filter(function (page) {
    return !page.itemFilter || page.itemFilter(items[page.index]);
  });
}

/*
 * We want to generate the pages we need for each item in the array
 * being used by an array page. We also want to group those pages by item.
 * So, this grabs contiguous sections of array pages and at the end generates
 * the right number of pages based on the items in the array
 */
export function expandArrayPages(pageList, data) {
  var result = pageList.reduce(function (acc, nextPage) {
    var lastArrayPath = acc.lastArrayPath,
        arrayPages = acc.arrayPages,
        currentList = acc.currentList;
    // If we see an array page and we’re starting a section or in the middle of one, just add it
    // to the temporary array

    if (nextPage.showPagePerItem && (!lastArrayPath || nextPage.arrayPath === lastArrayPath)) {
      arrayPages.push(nextPage);
      return acc;
      // Now we’ve hit the end of a section of array pages using the same array, so
      // actually generate the pages now
    } else if (nextPage.arrayPath !== lastArrayPath && !!arrayPages.length) {
      var newList = currentList.concat(generateArrayPages(arrayPages, data), nextPage);
      return _assign(acc, {
        lastArrayPath: null,
        arrayPages: [],
        currentList: newList
      });
    }

    return _set('currentList', currentList.concat(nextPage), acc);
  }, { lastArrayPath: null, arrayPages: [], currentList: [] });

  if (result.arrayPages.length > 0) {
    return result.currentList.concat(generateArrayPages(result.arrayPages, data));
  }

  return result.currentList;
}

/**
 * getPageKeys returns a list of keys for the currently active pages
 *
 * @param pages {Array<Object>} List of page configs
 * @param formData {Object} Current form data
 * @returns {Array<string>} A list of page keys from the page config
 *   and the index if it’s a pagePerItem page
 */
export function getPageKeys(pages, formData) {
  var eligiblePageList = getActivePages(pages, formData);
  var expandedPageList = expandArrayPages(eligiblePageList, formData);

  return expandedPageList.map(function (page) {
    var pageKey = page.pageKey;
    if (typeof page.index !== 'undefined') {
      pageKey += page.index;
    }
    return pageKey;
  });
}

/**
 * getActiveChapters returns the list of chapter keys with active pages
 *
 * @param formConfig {Object} The form config object
 * @param formData {Object} The current form data
 * @returns {Array<string>} The list of chapter key strings for active chapters
 */
export function getActiveChapters(formConfig, formData) {
  var formPages = createFormPageList(formConfig);
  var pageList = createPageList(formConfig, formPages);
  var eligiblePageList = getActivePages(pageList, formData);
  var expandedPageList = expandArrayPages(eligiblePageList, formData);

  return _uniq(expandedPageList.map(function (p) {
    return p.chapterKey;
  }).filter(function (key) {
    return !!key && key !== 'review';
  }));
}

export function sanitizeForm(formData) {
  try {
    var suffixes = ['vaFileNumber', 'first', 'last', 'accountNumber', 'socialSecurityNumber', 'dateOfBirth'];
    return JSON.stringify(formData, function (key, value) {
      if (value && suffixes.some(function (suffix) {
        return key.toLowerCase().endsWith(suffix.toLowerCase());
      })) {
        return 'removed';
      }

      return value;
    });
  } catch (e) {
    return null;
  }
}

export function scrollToFirstError() {
  var errorEl = document.querySelector('.usa-input-error, .input-error-date');
  if (errorEl) {
    // document.body.scrollTop doesn’t work with all browsers, so we’ll cover them all like so:
    var currentPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var position = errorEl.getBoundingClientRect().top + currentPosition;
    Scroll.animateScroll.scrollTo(position - 10, getScrollOptions());
    focusElement(errorEl);
  }
}

export function sortListByFuzzyMatch(value, list) {
  var prop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'label';

  return list.map(function (option) {
    var label = option[prop].toUpperCase().replace(/[^a-zA-Z ]/g, '');
    var val = value.toUpperCase().replace(/[^a-zA-Z ]/g, '');
    var score = label.includes(val) ? 0 : Infinity;

    // if the search term is just one word, split the
    // list into words and find the best match
    if (score > 0 && !val.includes(' ')) {
      score = Math.min.apply(null, label.split(/[ ,]/).map(function (word) {
        return fastLevenshtein.get(word, val);
      }).filter(function (wordScore) {
        return wordScore < val.length;
      }));
    } else if (score > 0) {
      score = fastLevenshtein.get(label, val);
    }

    return {
      score: score,
      original: option
    };
  }).sort(function (a, b) {
    var result = a.score - b.score;

    if (result === 0) {
      return a.original[prop].length - b.original[prop].length;
    }

    return result;
  }).map(function (sorted) {
    return sorted.original;
  });
}

/**
 * timeFromNow returns the number of days, hours, or minutes until
 * the provided date occurs. It’s meant to be less fuzzy than moment’s
 * timeFromNow so it can be used for expiration dates
 *
 * @param date {Moment Date} The future date to check against
 * @param userFromDate {Moment Date} The earlier date in the range. Defaults to today.
 * @returns {string} The string description of how long until date occurs
 */
export function timeFromNow(date) {
  var userFromDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  // Not using defaulting because we want today to be when this function
  // is called, not when the file is parsed and run
  var fromDate = userFromDate || moment();
  var dayDiff = date.diff(fromDate, 'days');

  if (dayDiff >= 1) {
    return formatDiff(dayDiff, 'day');
  }

  var hourDiff = date.diff(fromDate, 'hours');

  if (hourDiff >= 1) {
    return formatDiff(hourDiff, 'hour');
  }

  var minuteDiff = date.diff(fromDate, 'minutes');

  if (minuteDiff >= 1) {
    return formatDiff(minuteDiff, 'minute');
  }

  var secondDiff = date.diff(fromDate, 'seconds');

  if (secondDiff >= 1) {
    return formatDiff(secondDiff, 'second');
  }

  return 'a moment';
}