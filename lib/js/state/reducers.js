import _assign from 'lodash/fp/assign';
import _set from 'lodash/fp/set';

var _OPEN_REVIEW_CHAPTER$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { CLOSE_REVIEW_CHAPTER, OPEN_REVIEW_CHAPTER, SET_DATA, SET_EDIT_MODE, SET_PRIVACY_AGREEMENT, SET_SUBMISSION, SET_SUBMITTED, SET_VIEWED_PAGES } from '../actions';

import { recalculateSchemaAndData } from '../state/helpers';

export default (_OPEN_REVIEW_CHAPTER$ = {}, _defineProperty(_OPEN_REVIEW_CHAPTER$, OPEN_REVIEW_CHAPTER, function (state, action) {
  var openChapters = [].concat(_toConsumableArray(state.reviewPageView.openChapters), [action.openedChapter]);

  return _set('reviewPageView.openChapters', openChapters, state);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, CLOSE_REVIEW_CHAPTER, function (state, action) {
  var openChapters = state.reviewPageView.openChapters.filter(function (value) {
    return value !== action.closedChapter;
  });

  var newState = _set('reviewPageView.openChapters', openChapters, state);

  var viewedPages = new Set(state.reviewPageView.viewedPages);

  action.pageKeys.forEach(function (pageKey) {
    return viewedPages.add(pageKey);
  });

  return _set('reviewPageView.viewedPages', viewedPages, newState);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, SET_DATA, function (state, action) {
  var newState = _set('data', action.data, state);

  return recalculateSchemaAndData(newState);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, SET_EDIT_MODE, function (state, action) {
  if (state.pages[action.page].showPagePerItem) {
    return _set(['pages', action.page, 'editMode', action.index], action.edit, state);
  }
  return _set(['pages', action.page, 'editMode'], action.edit, state);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, SET_PRIVACY_AGREEMENT, function (state, action) {
  return _set('data.privacyAgreementAccepted', action.privacyAgreementAccepted, state);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, SET_SUBMISSION, function (state, action) {
  var newState = _set(['submission', action.field], action.value, state);
  if (action.extra) {
    newState.submission.extra = action.extra;
  }

  return newState;
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, SET_SUBMITTED, function (state, action) {
  var submission = _assign(state.submission, {
    response: action.response,
    status: 'applicationSubmitted'
  });

  return _set('submission', submission, state);
}), _defineProperty(_OPEN_REVIEW_CHAPTER$, SET_VIEWED_PAGES, function (state, action) {
  var viewedPages = new Set(state.reviewPageView.viewedPages);

  action.pageKeys.forEach(function (pageKey) {
    return viewedPages.add(pageKey);
  });

  return _set('reviewPageView.viewedPages', viewedPages, state);
}), _OPEN_REVIEW_CHAPTER$);