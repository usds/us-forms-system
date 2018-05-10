var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import Raven from 'raven-js';
import environment from '../environment';
import 'isomorphic-fetch';

import { removeFormApi, saveFormApi } from './api';
import { sanitizeForm } from '../helpers';

export var LOG_OUT = 'LOG_OUT';
export var SET_SAVE_FORM_STATUS = 'SET_SAVE_FORM_STATUS';
export var SET_AUTO_SAVE_FORM_STATUS = 'SET_AUTO_SAVE_FORM_STATUS';
export var SET_FETCH_FORM_STATUS = 'SET_FETCH_FORM_STATUS';
export var SET_FETCH_FORM_PENDING = 'SET_FETCH_FORM_PENDING';
export var SET_IN_PROGRESS_FORM = 'SET_IN_PROGRESS_FORM';
export var SET_START_OVER = 'SET_START_OVER';
export var SET_PREFILL_UNFILLED = 'SET_PREFILL_UNFILLED';

export function logOut() {
  return {
    type: LOG_OUT
  };
}

export var SAVE_STATUSES = Object.freeze({
  notAttempted: 'not-attempted',
  pending: 'pending',
  noAuth: 'no-auth',
  failure: 'failure',
  clientFailure: 'clientFailure',
  success: 'success'
});

export var saveErrors = new Set([SAVE_STATUSES.failure, SAVE_STATUSES.clientFailure, SAVE_STATUSES.noAuth]);

var saveTypes = {
  AUTO: 'auto',
  SAVE_AND_REDIRECT: 'saveAndRedirect'
};

var statusActionsByType = new Map([[saveTypes.AUTO, SET_AUTO_SAVE_FORM_STATUS], [saveTypes.SAVE_AND_REDIRECT, SET_SAVE_FORM_STATUS]]);

export var LOAD_STATUSES = Object.freeze({
  notAttempted: 'not-attempted',
  pending: 'pending',
  noAuth: 'no-auth',
  failure: 'failure',
  notFound: 'not-found',
  invalidData: 'invalid-data',
  success: 'success'
});

export var PREFILL_STATUSES = Object.freeze({
  notAttempted: 'not-attempted',
  pending: 'pending',
  success: 'success',
  unfilled: 'unfilled'
});

export function setSaveFormStatus(saveType, status) {
  var lastSavedDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var expirationDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    type: statusActionsByType.get(saveType),
    status: status,
    lastSavedDate: lastSavedDate,
    expirationDate: expirationDate
  };
}

export function setFetchFormStatus(status) {
  return {
    type: SET_FETCH_FORM_STATUS,
    status: status
  };
}

export function setFetchFormPending(prefill) {
  return {
    type: SET_FETCH_FORM_PENDING,
    prefill: prefill
  };
}

export function setInProgressForm(data, pages) {
  return {
    type: SET_IN_PROGRESS_FORM,
    data: data,
    pages: pages
  };
}

export function setStartOver() {
  return {
    type: SET_START_OVER
  };
}

export function setPrefillComplete() {
  return {
    type: SET_PREFILL_UNFILLED
  };
}
/**
 * Transforms the data from an old version of a form to be used in the latest
 *  version.
 *
 * @param  {Object}  savedData    The formData from the old version of the form.
 * @param  {Ingeter} savedVersion The version of the form the corresponding
 *                                 data was saved with.
 * @param  {Array}   migrations   An array of functions which transform the
 *                                 data saved to work with the current version.
 * @return {Object}               The modified formData which should work with
 *                                 the current version of the form.
 */
export function migrateFormData(savedData, migrations) {
  // migrations is an array that looks like this:
  // [
  //   (savedData) => {
  //     // Makes modifications to savedData to update it from version 0 -> version 1
  //   },
  //   (savedData) => {
  //     // Makes modifications to update the data from version 1 -> version 2
  //   },
  //   ...
  // ]
  // The functions transform the data from version of their index to the next one up.
  // This works because every time the version is bumped on the form, it’s because
  //  the saved data needs to be manipulated, so there will be no skipped versions.

  // Break out early in case we don’t have any migrations for the form yet
  if (!migrations) {
    return savedData;
  }

  var savedDataCopy = Object.assign({}, savedData);
  var savedVersion = savedData.metadata.version;
  while (typeof migrations[savedVersion] === 'function') {
    savedDataCopy = migrations[savedVersion](savedDataCopy);
    savedVersion++; // eslint-disable-line no-param-reassign
  }

  return savedDataCopy;
}

/**
 * Saves the form data to the back end
 * @param  {String}  saveType  The type of save that's happening, auto or save and redirect
 * @param  {String}  formId    The form’s formId
 * @param  {Object}  formData  The data the user has entered so far
 * @param  {Ingeter} version   The form’s version
 * @param  {String}  returnUrl The last URL the user was at before saving
 */
function saveForm(saveType, formId, formData, version, returnUrl) {
  var savedAt = Date.now();

  return function (dispatch, getState) {
    var trackingPrefix = getState().form.trackingPrefix;

    dispatch(setSaveFormStatus(saveType, SAVE_STATUSES.pending));

    return saveFormApi(formId, formData, version, returnUrl, savedAt, trackingPrefix).then(function (json) {
      dispatch(setSaveFormStatus(saveType, SAVE_STATUSES.success, savedAt, json.data.attributes.metadata.expiresAt));

      return Promise.resolve(json);
    }).catch(function (resOrError) {
      var errorStatus = void 0;
      if (resOrError.status === 401 || resOrError.message === 'Missing token') {
        dispatch(logOut());
        errorStatus = SAVE_STATUSES.noAuth;
      } else if (resOrError instanceof Response) {
        errorStatus = SAVE_STATUSES.failure;
      } else {
        errorStatus = SAVE_STATUSES.clientFailure;
      }
      dispatch(setSaveFormStatus(saveType, errorStatus));
    });
  };
}

export function autoSaveForm() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return saveForm.apply(undefined, [saveTypes.AUTO].concat(args));
}

export function saveAndRedirectToReturnUrl() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return saveForm.apply(undefined, [saveTypes.SAVE_AND_REDIRECT].concat(args));
}

/**
 * Loads the form data from the back end into the redux store.
 *
 * @param  {Integer} formId      The form’s identifier
 * @param  {Array}   migrations  An array of functions to run the data returned
 *                                from the server through in the event that the
 *                                version of the form the data was saved with
 *                                is different from the current version.
 */
export function fetchInProgressForm(formId, migrations) {
  var prefill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var prefillTransformer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  // TODO: Migrations currently aren’t sent; they’re taken from `form` in the
  //  redux store, but form.migrations doesn’t exist (nor should it, really)
  return function (dispatch, getState) {
    var trackingPrefix = getState().form.trackingPrefix;
    var userToken = sessionStorage.userToken;
    // If we don’t have a userToken, fail safely
    if (!userToken) {
      dispatch(setFetchFormStatus(LOAD_STATUSES.noAuth));
      return Promise.resolve();
    }

    // Update UI while we’re waiting for the API
    dispatch(setFetchFormPending(prefill));

    // Query the api and return a promise (for navigation / error handling afterward)
    return fetch(environment.API_URL + '/v0/in_progress_forms/' + formId, {
      headers: {
        'Content-Type': 'application/json',
        'X-Key-Inflection': 'camel',
        Authorization: 'Token token=' + userToken
      }
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      var status = LOAD_STATUSES.failure;
      if (res.status === 401) {
        dispatch(logOut());
        status = LOAD_STATUSES.noAuth;
      } else if (res.status === 404) {
        status = LOAD_STATUSES.notFound;
      }
      return Promise.reject(status);
    }).then(function (resBody) {
      // Just in case something funny happens where the json returned isn’t an object as expected
      // Unfortunately, JavaScript is quite fiddly here, so there has to be additional checks
      if ((typeof resBody === 'undefined' ? 'undefined' : _typeof(resBody)) !== 'object' || Array.isArray(resBody) || !resBody) {
        return Promise.reject(LOAD_STATUSES.invalidData);
      }

      // If an empty object is returned, throw a not-found
      // TODO: When / if we return a 404 for applications that don’t exist, remove this
      if (Object.keys(resBody).length === 0) {
        return Promise.reject(LOAD_STATUSES.notFound);
      }

      // If we’ve made it this far, we’ve got valid form

      var formData = void 0;
      var metadata = void 0;
      try {
        var dataToMigrate = {
          formId: formId,
          formData: resBody.formData,
          metadata: resBody.metadata
        };

        var _migrateFormData = migrateFormData(dataToMigrate, migrations);

        formData = _migrateFormData.formData;
        metadata = _migrateFormData.metadata;


        var pages = getState().form.pages;
        if (metadata.prefill && prefillTransformer) {
          var _prefillTransformer = prefillTransformer(pages, formData, metadata, getState());

          formData = _prefillTransformer.formData;
          pages = _prefillTransformer.pages;
          metadata = _prefillTransformer.metadata;
        }

        dispatch(setInProgressForm({ formData: formData, metadata: metadata }, pages));

        window.dataLayer.push({
          event: trackingPrefix + 'sip-form-loaded'
        });

        return Promise.resolve();
      } catch (e) {
        // We don’t want to lose the stacktrace, but want to be able to search for migration errors
        // related to SiP
        Raven.captureException(e);
        Raven.captureMessage('vets_sip_error_migration', {
          extra: {
            formData: sanitizeForm(resBody.formData),
            metadata: resBody.metadata
          }
        });
        return Promise.reject(LOAD_STATUSES.invalidData);
      }
    }).catch(function (status) {
      var loadedStatus = status;
      if (status instanceof SyntaxError) {
        // if res.json() has a parsing error, it’ll reject with a SyntaxError
        Raven.captureException(new Error('vets_sip_error_server_json: ' + status.message));
        loadedStatus = LOAD_STATUSES.invalidData;
      } else if (status instanceof Error) {
        // If we’ve got an error that isn’t a SyntaxError, it’s probably a network error
        Raven.captureException(status);
        Raven.captureMessage('vets_sip_error_fetch');
        loadedStatus = LOAD_STATUSES.clientFailure;
      }

      // If prefilling went wrong for a non-auth reason, it probably means that
      // they didn’t have info to use and we can continue on as usual
      if (prefill && loadedStatus !== LOAD_STATUSES.noAuth) {
        dispatch(setPrefillComplete());
        window.dataLayer.push({
          event: trackingPrefix + 'sip-form-prefill-failed'
        });
      } else {
        // If we're in a noAuth status, users are sent to the error page
        // where they can sign in again. This isn't an error, it's expected
        // when a session expires
        if (loadedStatus === LOAD_STATUSES.noAuth) {
          window.dataLayer.push({
            event: trackingPrefix + 'sip-form-load-signed-out'
          });
        } else {
          Raven.captureMessage('vets_sip_error_load: ' + loadedStatus);
          window.dataLayer.push({
            event: trackingPrefix + 'sip-form-load-failed'
          });
        }
        dispatch(setFetchFormStatus(loadedStatus));
      }
    });
  };
}

export function removeInProgressForm(formId, migrations) {
  return function (dispatch, getState) {
    var trackingPrefix = getState().form.trackingPrefix;

    // Update UI while we’re waiting for the API
    dispatch(setStartOver());

    return removeFormApi(formId).catch(function (res) {
      // If there’s some error when deleting, there’s not much we can
      // do aside from not stop the user from continuing on
      if (res instanceof Error || res.status !== 401) {
        return Promise.resolve();
      }

      return Promise.reject(res);
    }).then(function () {
      window.dataLayer.push({
        event: trackingPrefix + 'sip-form-start-over'
      });
      // after deleting, go fetch prefill info if they’ve got it
      return dispatch(fetchInProgressForm(formId, migrations, true));
    }).catch(function () {
      dispatch(logOut());
      dispatch(setFetchFormStatus(LOAD_STATUSES.noAuth));
    });
  };
}