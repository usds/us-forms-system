import _assign from 'lodash/fp/assign';
import _merge from 'lodash/fp/merge';
import _set from 'lodash/fp/set';

var _saveInProgressReduce;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { recalculateSchemaAndData } from '../state/helpers';

import { SET_SAVE_FORM_STATUS, SET_AUTO_SAVE_FORM_STATUS, SET_FETCH_FORM_STATUS, SET_FETCH_FORM_PENDING, SET_IN_PROGRESS_FORM, SET_START_OVER, SET_PREFILL_UNFILLED, SAVE_STATUSES, LOAD_STATUSES, PREFILL_STATUSES, saveErrors } from '../save-in-progress/actions';

export var saveInProgressReducers = (_saveInProgressReduce = {}, _defineProperty(_saveInProgressReduce, SET_SAVE_FORM_STATUS, function (state, action) {
  var newState = _set('savedStatus', action.status, state);
  newState.startingOver = false;
  newState.prefillStatus = PREFILL_STATUSES.notAttempted;

  if (action.status === SAVE_STATUSES.success) {
    newState.lastSavedDate = action.lastSavedDate;
    newState.expirationDate = action.expirationDate;
  }

  // We don't want to show two errors at once, so reset the status
  // of the other save method when there's an error
  if (saveErrors.has(action.status)) {
    newState.autoSavedStatus = SAVE_STATUSES.notAttempted;
  }

  return newState;
}), _defineProperty(_saveInProgressReduce, SET_AUTO_SAVE_FORM_STATUS, function (state, action) {
  var newState = _set('autoSavedStatus', action.status, state);

  if (action.status === SAVE_STATUSES.success) {
    newState.lastSavedDate = action.lastSavedDate;
    newState.expirationDate = action.expirationDate;
  }

  if (saveErrors.has(action.status)) {
    newState.savedStatus = SAVE_STATUSES.notAttempted;
  }

  return newState;
}), _defineProperty(_saveInProgressReduce, SET_FETCH_FORM_STATUS, function (state, action) {
  return _set('loadedStatus', action.status, state);
}), _defineProperty(_saveInProgressReduce, SET_FETCH_FORM_PENDING, function (state, action) {
  var newState = _set('loadedStatus', LOAD_STATUSES.pending, state);

  if (action.prefill) {
    newState.prefillStatus = PREFILL_STATUSES.pending;
  }

  return newState;
}), _defineProperty(_saveInProgressReduce, SET_IN_PROGRESS_FORM, function (state, action) {
  var newState = void 0;

  // if we’re prefilling, we want to use whatever initial data the form has
  if (state.prefillStatus === PREFILL_STATUSES.pending) {
    var formData = _merge(state.data, action.data.formData);
    var loadedData = _set('formData', formData, action.data);
    newState = _set('loadedData', loadedData, state);

    // We get an empty object back when we attempt to prefill and there's
    // no information
    if (Object.keys(action.data.formData).length > 0) {
      newState.prefillStatus = PREFILL_STATUSES.success;
    } else {
      newState.prefillStatus = PREFILL_STATUSES.unfilled;
    }
  } else {
    newState = _set('loadedData', action.data, state);
    newState.prefillStatus = PREFILL_STATUSES.notAttempted;
  }

  newState.loadedStatus = LOAD_STATUSES.success;
  newState.data = newState.loadedData.formData;
  newState.pages = action.pages;

  return recalculateSchemaAndData(newState);
}), _defineProperty(_saveInProgressReduce, SET_START_OVER, function (state) {
  return _assign(state, {
    isStartingOver: true,
    data: state.initialData,
    loadedStatus: LOAD_STATUSES.pending
  });
}), _defineProperty(_saveInProgressReduce, SET_PREFILL_UNFILLED, function (state) {
  return _assign(state, {
    prefillStatus: PREFILL_STATUSES.unfilled,
    data: state.initialData,
    loadedStatus: LOAD_STATUSES.notAttempted
  });
}), _saveInProgressReduce);

export function createSaveInProgressInitialState(formConfig, initialState) {
  return Object.assign({}, initialState, {
    initialData: initialState.data,
    savedStatus: SAVE_STATUSES.notAttempted,
    autoSavedStatus: SAVE_STATUSES.notAttempted,
    loadedStatus: LOAD_STATUSES.notAttempted,
    version: formConfig.version,
    formId: formConfig.formId,
    lastSavedDate: null,
    expirationDate: null,
    disableSave: formConfig.disableSave,
    loadedData: {
      formData: {},
      metadata: {}
    },
    prefillStatus: PREFILL_STATUSES.notAttempted,
    isStartingOver: false,
    migrations: formConfig.migrations,
    prefillTransformer: formConfig.prefillTransformer,
    trackingPrefix: formConfig.trackingPrefix
  });
}