'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _OPEN_REVIEW_CHAPTER$;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('../actions');

var _helpers = require('../state/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = (_OPEN_REVIEW_CHAPTER$ = {}, _defineProperty(_OPEN_REVIEW_CHAPTER$, _actions.OPEN_REVIEW_CHAPTER, function (state, action) {
  var openChapters = [].concat(_toConsumableArray(state.reviewPageView.openChapters), [action.openedChapter]);

  return (0, _set3.default)('reviewPageView.openChapters', openChapters, state);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, _actions.CLOSE_REVIEW_CHAPTER, function (state, action) {
  var openChapters = state.reviewPageView.openChapters.filter(function (value) {
    return value !== action.closedChapter;
  });

  var newState = (0, _set3.default)('reviewPageView.openChapters', openChapters, state);

  var viewedPages = new Set(state.reviewPageView.viewedPages);

  action.pageKeys.forEach(function (pageKey) {
    return viewedPages.add(pageKey);
  });

  return (0, _set3.default)('reviewPageView.viewedPages', viewedPages, newState);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, _actions.SET_DATA, function (state, action) {
  var newState = (0, _set3.default)('data', action.data, state);

  return (0, _helpers.recalculateSchemaAndData)(newState);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, _actions.SET_EDIT_MODE, function (state, action) {
  if (state.pages[action.page].showPagePerItem) {
    return (0, _set3.default)(['pages', action.page, 'editMode', action.index], action.edit, state);
  }
  return (0, _set3.default)(['pages', action.page, 'editMode'], action.edit, state);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, _actions.SET_PRE_SUBMIT, function (state, action) {
  return _extends({}, state, { data: _extends({}, state.data, _defineProperty({}, action.preSubmitField, action.preSubmitAccepted)) });
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, _actions.SET_SUBMISSION, function (state, action) {
  var newState = (0, _set3.default)(['submission', action.field], action.value, state);
  if (action.extra) {
    newState.submission.extra = action.extra;
  }

  return newState;
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, _actions.SET_SUBMITTED, function (state, action) {
  var submission = (0, _assign3.default)(state.submission, {
    response: action.response,
    status: 'applicationSubmitted'
  });

  return (0, _set3.default)('submission', submission, state);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, _actions.SET_VIEWED_PAGES, function (state, action) {
  var viewedPages = new Set(state.reviewPageView.viewedPages);

  action.pageKeys.forEach(function (pageKey) {
    return viewedPages.add(pageKey);
  });

  return (0, _set3.default)('reviewPageView.viewedPages', viewedPages, state);
}), _OPEN_REVIEW_CHAPTER$);
//# sourceMappingURL=reducers.js.map