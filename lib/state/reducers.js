import _assign from 'lodash/fp/assign';
import _set from 'lodash/fp/set';

var _SET_DATA$SET_EDIT_MO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { SET_DATA, SET_EDIT_MODE, SET_PRIVACY_AGREEMENT, SET_SUBMISSION, SET_SUBMITTED } from '../actions';

import { recalculateSchemaAndData } from '../state/helpers';

export default (_SET_DATA$SET_EDIT_MO = {}, _defineProperty(_SET_DATA$SET_EDIT_MO, SET_DATA, function (state, action) {
  var newState = _set('data', action.data, state);

  return recalculateSchemaAndData(newState);
}), _defineProperty(_SET_DATA$SET_EDIT_MO, SET_EDIT_MODE, function (state, action) {
  if (state.pages[action.page].showPagePerItem) {
    return _set(['pages', action.page, 'editMode', action.index], action.edit, state);
  }
  return _set(['pages', action.page, 'editMode'], action.edit, state);
}), _defineProperty(_SET_DATA$SET_EDIT_MO, SET_PRIVACY_AGREEMENT, function (state, action) {
  return _set('data.privacyAgreementAccepted', action.privacyAgreementAccepted, state);
}), _defineProperty(_SET_DATA$SET_EDIT_MO, SET_SUBMISSION, function (state, action) {
  var newState = _set(['submission', action.field], action.value, state);
  if (action.extra) {
    newState.submission.extra = action.extra;
  }

  return newState;
}), _defineProperty(_SET_DATA$SET_EDIT_MO, SET_SUBMITTED, function (state, action) {
  var submission = _assign(state.submission, {
    response: action.response,
    status: 'applicationSubmitted'
  });

  return _set('submission', submission, state);
}), _SET_DATA$SET_EDIT_MO);