'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pureWithDeepEquals = undefined;

var _merge3 = require('lodash/fp/merge');

var _merge4 = _interopRequireDefault(_merge3);

var _intersection2 = require('lodash/fp/intersection');

var _intersection3 = _interopRequireDefault(_intersection2);

var _unset2 = require('lodash/fp/unset');

var _unset3 = _interopRequireDefault(_unset2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _omit2 = require('lodash/fp/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _uniq2 = require('lodash/fp/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

var _matches2 = require('lodash/fp/matches');

var _matches3 = _interopRequireDefault(_matches2);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.isActivePage = isActivePage;
exports.getActivePages = getActivePages;
exports.getActiveProperties = getActiveProperties;
exports.getInactivePages = getInactivePages;
exports.createFormPageList = createFormPageList;
exports.createPageListByChapter = createPageListByChapter;
exports.createPageList = createPageList;
exports.createRoutes = createRoutes;
exports.formatISOPartialDate = formatISOPartialDate;
exports.formatReviewDate = formatReviewDate;
exports.parseISODate = parseISODate;
exports.filterViewFields = filterViewFields;
exports.filterInactivePageData = filterInactivePageData;
exports.stringifyFormReplacer = stringifyFormReplacer;
exports.isInProgress = isInProgress;
exports.getArrayFields = getArrayFields;
exports.hasFieldsOtherThanArray = hasFieldsOtherThanArray;
exports.getNonArraySchema = getNonArraySchema;
exports.checkValidSchema = checkValidSchema;
exports.setArrayRecordTouched = setArrayRecordTouched;
exports.createUSAStateLabels = createUSAStateLabels;
exports.expandArrayPages = expandArrayPages;
exports.getActiveExpandedPages = getActiveExpandedPages;
exports.getPageKeys = getPageKeys;
exports.getActiveChapters = getActiveChapters;
exports.omitRequired = omitRequired;
exports.transformForSubmit = transformForSubmit;

var _shouldUpdate = require('recompose/shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

var _FormPage = require('./containers/FormPage');

var _FormPage2 = _interopRequireDefault(_FormPage);

var _ReviewPage = require('./review/ReviewPage');

var _ReviewPage2 = _interopRequireDefault(_ReviewPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// An active page is one that will be shown to the user.
// Pages become inactive if they are conditionally shown based
// on answers to previous questions.
function isActivePage(page, data) {
  if (typeof page.depends === 'function') {
    return page.depends(data, page.index);
  }

  if (Array.isArray(page.depends)) {
    return page.depends.some(function (condition) {
      return (0, _matches3.default)(condition)(data);
    });
  }

  return page.depends === undefined || (0, _matches3.default)(page.depends)(data);
}

function getActivePages(pages, data) {
  return pages.filter(function (page) {
    return isActivePage(page, data);
  });
}

function getActiveProperties(activePages) {
  var allProperties = [];
  activePages.forEach(function (page) {
    if (page.schema) {
      allProperties.push.apply(allProperties, _toConsumableArray(Object.keys(page.schema.properties)));
    }
  });
  return (0, _uniq3.default)(allProperties);
}

function getInactivePages(pages, data) {
  return pages.filter(function (page) {
    return !isActivePage(page, data);
  });
}

function createFormPageList(formConfig) {
  return Object.keys(formConfig.chapters).reduce(function (pageList, chapter) {
    var chapterTitle = formConfig.chapters[chapter].title;
    var pages = Object.keys(formConfig.chapters[chapter].pages).map(function (page) {
      return (0, _assign3.default)(formConfig.chapters[chapter].pages[page], {
        chapterTitle: chapterTitle,
        chapterKey: chapter,
        pageKey: page
      });
    });
    return pageList.concat(pages);
  }, []);
}

function createPageListByChapter(formConfig) {
  return Object.keys(formConfig.chapters).reduce(function (chapters, chapter) {
    var pages = Object.keys(formConfig.chapters[chapter].pages).map(function (page) {
      return (0, _assign3.default)(formConfig.chapters[chapter].pages[page], {
        pageKey: page,
        chapterKey: chapter
      });
    });
    return (0, _set3.default)(chapter, pages, chapters);
  }, {});
}

function createPageList(formConfig, formPages) {
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
    return (0, _set3.default)('path', '' + (formConfig.urlPrefix || '') + page.path, page);
  });
}

/*
 * Create the routes based on a form config. This goes through each chapter in a form
 * config, pulls out the config for each page, then generates a list of Route components with the
 * config as props
 */
function createRoutes(formConfig) {
  var formPages = createFormPageList(formConfig);
  var pageList = createPageList(formConfig, formPages);
  var routes = formPages.map(function (page) {
    return {
      path: page.path,
      component: page.component || _FormPage2.default,
      pageConfig: page,
      hideNavArrows: formConfig.hideNavArrows,
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
    component: _ReviewPage2.default,
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

function formatISOPartialDate(_ref) {
  var month = _ref.month,
      day = _ref.day,
      year = _ref.year;

  if (month || day || year) {
    return formatYear(year) + '-' + formatDayMonth(month) + '-' + formatDayMonth(day);
  }

  return undefined;
}

function formatReviewDate(dateString) {
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
function parseISODate(dateString) {
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
function filterViewFields(data) {
  return Object.keys(data).reduce(function (newData, nextProp) {
    var field = data[nextProp];

    if (Array.isArray(field)) {
      var newArray = field.map(function (item) {
        return filterViewFields(item);
      });

      return (0, _set3.default)(nextProp, newArray, newData);
    }

    if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
      if (nextProp.startsWith('view:')) {
        return (0, _assign3.default)(newData, filterViewFields(field));
      }
      return (0, _set3.default)(nextProp, filterViewFields(field), newData);
    }

    if (!nextProp.startsWith('view:')) {
      return (0, _set3.default)(nextProp, field, newData);
    }

    return newData;
  }, {});
}

function filterInactivePageData(inactivePages, activePages, form) {
  var activeProperties = getActiveProperties(activePages);
  var newData = void 0;

  return inactivePages.reduce(function (formData, page) {
    return Object.keys(page.schema.properties).reduce(function (currentData, prop) {
      newData = currentData;
      if (!activeProperties.includes(prop)) {
        delete newData[prop];
      }
      return newData;
    }, formData);
  }, form.data);
}

function stringifyFormReplacer(key, value) {

  // clean up empty objects, which we have no reason to send
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var fields = Object.keys(value);
    if (fields.length === 0 || fields.every(function (field) {
      return value[field] === undefined;
    })) {
      return undefined;
    }

    // Exclude file data
    if (value.confirmationCode && value.file) {
      return (0, _omit3.default)('file', value);
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

function isInProgress(pathName) {
  var trimmedPathname = pathName.replace(/\/$/, '');
  return !(trimmedPathname.endsWith('introduction') || trimmedPathname.endsWith('confirmation') || trimmedPathname.endsWith('form-saved') || trimmedPathname.endsWith('error'));
}

function isHiddenField(schema) {
  return !!schema['ui:collapsed'] || !!schema['ui:hidden'];
}

/*
 * Pull the array fields from a schema. Used to separate out array fields
 * from the rest of page to be displayed on the review page
 */
function getArrayFields(data) {
  var fields = [];
  var findArrays = function findArrays(obj, ui) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (obj.type === 'array' && !isHiddenField(obj) && !(0, _get3.default)('ui:options.keepInPageOnReview', ui)) {
      fields.push({
        path: path,
        schema: (0, _set3.default)('definitions', data.schema.definitions, obj),
        uiSchema: (0, _get3.default)(path, data.uiSchema) || data.uiSchema
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
function hasFieldsOtherThanArray(schema) {
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
function getNonArraySchema(schema) {
  var uiSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (schema.type === 'array' && !(0, _get3.default)('ui:options.keepInPageOnReview', uiSchema)) {
    return undefined;
  }

  if (schema.type === 'object') {
    var newProperties = Object.keys(schema.properties).reduce(function (current, next) {
      var newSchema = getNonArraySchema(schema.properties[next], uiSchema[next]);

      if (typeof newSchema === 'undefined') {
        return (0, _unset3.default)(next, current);
      }

      if (newSchema !== schema.properties[next]) {
        return (0, _set3.default)(next, newSchema, current);
      }

      return current;
    }, schema.properties);

    if (Object.keys(newProperties).length === 0) {
      return undefined;
    }

    if (newProperties !== schema.properties) {
      var newSchema = (0, _set3.default)('properties', newProperties, schema);
      if (newSchema.required) {
        var newRequired = (0, _intersection3.default)(Object.keys(newSchema.properties), newSchema.required);
        if (newRequired.length !== newSchema.required.length) {
          newSchema = (0, _set3.default)('required', newRequired, newSchema);
        }
      }

      return newSchema;
    }
  }

  return schema;
}

var pureWithDeepEquals = exports.pureWithDeepEquals = (0, _shouldUpdate2.default)(function (props, nextProps) {
  return !(0, _utils.deepEquals)(props, nextProps);
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
function checkValidSchema(schema) {
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

function setArrayRecordTouched(prefix, index) {
  return _defineProperty({}, prefix + '_' + index, true);
}

function createUSAStateLabels(states) {
  return states.USA.reduce(function (current, _ref3) {
    var label = _ref3.label,
        value = _ref3.value;

    return (0, _merge4.default)(current, _defineProperty({}, value, label));
  }, {});
}

/*
 * Take a list of pages and create versions of them
 * for each item in an array
 */
function generateArrayPages(arrayPages, data) {
  var items = (0, _get3.default)(arrayPages[0].arrayPath, data) || [];
  return items.reduce(function (pages, item, index) {
    return pages.concat(arrayPages.map(function (page) {
      return (0, _assign3.default)(page, {
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
function expandArrayPages(pageList, data) {
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
      return (0, _assign3.default)(acc, {
        lastArrayPath: null,
        arrayPages: [],
        currentList: newList
      });
    }

    return (0, _set3.default)('currentList', currentList.concat(nextPage), acc);
  }, { lastArrayPath: null, arrayPages: [], currentList: [] });

  if (result.arrayPages.length > 0) {
    return result.currentList.concat(generateArrayPages(result.arrayPages, data));
  }

  return result.currentList;
}

/**
 * Gets active and expanded pages, in the correct order
 *
 * Any `showPagePerItem` pages are expanded to create items for each array item.
 * We update the `path` for each of those pages to replace `:index` with the current item index.
 *
 * @param pages {Array<Object>} List of page configs
 * @param data {Object} Current form data
 * @returns {Array<Object>} A list of pages, including individual array
 *   pages that are active
 */
function getActiveExpandedPages(pages, data) {
  var expandedPages = expandArrayPages(pages, data);
  return getActivePages(expandedPages, data);
}

/**
 * getPageKeys returns a list of keys for the currently active pages
 *
 * @param pages {Array<Object>} List of page configs
 * @param formData {Object} Current form data
 * @returns {Array<string>} A list of page keys from the page config
 *   and the index if it’s a pagePerItem page
 */
function getPageKeys(pages, formData) {
  var expandedPageList = getActiveExpandedPages(pages, formData);

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
function getActiveChapters(formConfig, formData) {
  var formPages = createFormPageList(formConfig);
  var pageList = createPageList(formConfig, formPages);
  var expandedPageList = getActiveExpandedPages(pageList, formData);

  return (0, _uniq3.default)(expandedPageList.map(function (p) {
    return p.chapterKey;
  }).filter(function (key) {
    return !!key && key !== 'review';
  }));
}

/**
 * Returns the schema, omitting all `required` arrays.
 *
 * @param schema {Object}
 * @returns {Object} The schema without any `required` arrays
 */
function omitRequired(schema) {
  if ((typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) !== 'object' || Array.isArray(schema)) {
    return schema;
  }

  var newSchema = (0, _omit3.default)('required', schema);
  Object.keys(newSchema).forEach(function (key) {
    newSchema[key] = omitRequired(newSchema[key]);
  });

  return newSchema;
}

/*
 * Normal transform for schemaform data
 */
function transformForSubmit(formConfig, form) {
  var replacer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringifyFormReplacer;

  var expandedPages = expandArrayPages(createFormPageList(formConfig), form.data);
  var activePages = getActivePages(expandedPages, form.data);
  var inactivePages = getInactivePages(expandedPages, form.data);
  var withoutInactivePages = filterInactivePageData(inactivePages, activePages, form);
  var withoutViewFields = filterViewFields(withoutInactivePages);

  return JSON.stringify(withoutViewFields, replacer) || '{}';
}
//# sourceMappingURL=helpers.js.map