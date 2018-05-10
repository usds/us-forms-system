import { createStructuredSelector } from 'reselect';
import { getFormData } from '../state/selectors';
import { PREFILL_STATUSES } from './actions';

export var getSaveInProgressState = createStructuredSelector({
  loadedStatus: function loadedStatus(state) {
    return state.form.loadedStatus;
  },
  savedStatus: function savedStatus(state) {
    return state.form.savedStatus;
  },
  autoSavedStatus: function autoSavedStatus(state) {
    return state.form.autoSavedStatus;
  },
  prefillStatus: function prefillStatus(state) {
    return state.form.prefillStatus;
  },
  returnUrl: function returnUrl(state) {
    return state.form.loadedData.metadata.returnUrl;
  },
  formData: getFormData,
  isLoggedIn: function isLoggedIn(state) {
    return state.user.login.currentlyLoggedIn;
  },
  savedForms: function savedForms(state) {
    return state.user.profile.savedForms;
  },
  prefillsAvailable: function prefillsAvailable(state) {
    return state.user.profile.prefillsAvailable;
  },
  profileIsLoading: function profileIsLoading(state) {
    return state.user.profile.loading;
  }
});

export var getIntroState = createStructuredSelector({
  formId: function formId(state) {
    return state.form.formId;
  },
  migrations: function migrations(state) {
    return state.form.migrations;
  },
  prefillTransformer: function prefillTransformer(state) {
    return state.form.prefillTransformer;
  },
  returnUrl: function returnUrl(state) {
    return state.form.loadedData.metadata.returnUrl;
  },
  user: function user(state) {
    return state.user;
  },
  lastSavedDate: function lastSavedDate(state) {
    return state.form.lastSavedDate;
  }
});

export var getFormContext = createStructuredSelector({
  isLoggedIn: function isLoggedIn(state) {
    return state.user.login.currentlyLoggedIn;
  },
  prefilled: function prefilled(form) {
    return form.prefillStatus === PREFILL_STATUSES.success;
  }
});