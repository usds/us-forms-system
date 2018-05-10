import Raven from 'raven-js';
import moment from 'moment';
import _ from './utils/data-utils';
import { timeFromNow, transformForSubmit } from './helpers';
import environment from './environment';

export var SET_EDIT_MODE = 'SET_EDIT_MODE';
export var SET_DATA = 'SET_DATA';
export var SET_PRIVACY_AGREEMENT = 'SET_PRIVACY_AGREEMENT';
export var SET_SUBMISSION = 'SET_SUBMISSION';
export var SET_SUBMITTED = 'SET_SUBMITTED';

export function setData(data) {
  return {
    type: SET_DATA,
    data: data
  };
}

export function setEditMode(page, edit) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return {
    type: SET_EDIT_MODE,
    edit: edit,
    page: page,
    index: index
  };
}

// extra is used to pass other information (from a submission error or anything else)
// into the submission state object
export function setSubmission(field, value) {
  var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return {
    type: SET_SUBMISSION,
    field: field,
    value: value,
    extra: extra
  };
}

export function setPrivacyAgreement(privacyAgreementAccepted) {
  return {
    type: SET_PRIVACY_AGREEMENT,
    privacyAgreementAccepted: privacyAgreementAccepted
  };
}

export function setSubmitted(response) {
  return {
    type: SET_SUBMITTED,
    response: typeof response.data !== 'undefined' ? response.data : response
  };
}

function submitToUrl(body, submitUrl, trackingPrefix) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('POST', '' + environment.API_URL + submitUrl);
    req.addEventListener('load', function () {
      if (req.status >= 200 && req.status < 300) {
        window.dataLayer.push({
          event: trackingPrefix + '-submission-successful'
        });
        // got this from the fetch polyfill, keeping it to be safe
        var responseBody = 'response' in req ? req.response : req.responseText;
        var results = JSON.parse(responseBody);
        resolve(results);
      } else {
        var error = void 0;
        if (req.status === 429) {
          error = new Error('vets_throttled_error: ' + req.statusText);
          error.extra = parseInt(req.getResponseHeader('x-ratelimit-reset'), 10);
        } else {
          error = new Error('vets_server_error: ' + req.statusText);
        }
        error.statusText = req.statusText;
        reject(error);
      }
    });

    req.addEventListener('error', function () {
      var error = new Error('vets_client_error: Network request failed');
      error.statusText = req.statusText;
      reject(error);
    });

    req.addEventListener('abort', function () {
      var error = new Error('vets_client_error: Request aborted');
      error.statusText = req.statusText;
      reject(error);
    });

    req.addEventListener('timeout', function () {
      var error = new Error('vets_client_error: Request timed out');
      error.statusText = req.statusText;
      reject(error);
    });

    req.setRequestHeader('X-Key-Inflection', 'camel');
    req.setRequestHeader('Content-Type', 'application/json');

    var userToken = _.get('sessionStorage.userToken', window);
    if (userToken) {
      req.setRequestHeader('Authorization', 'Token token=' + userToken);
    }

    req.send(body);
  });
}

export function submitForm(formConfig, form) {
  var captureError = function captureError(error, errorType) {
    Raven.captureException(error, {
      fingerprint: [formConfig.trackingPrefix, error.message],
      extra: {
        errorType: errorType,
        statusText: error.statusText
      }
    });
    window.dataLayer.push({
      event: formConfig.trackingPrefix + '-submission-failed' + (errorType.startsWith('client') ? '-client' : '')
    });
  };

  return function (dispatch) {
    dispatch(setSubmission('status', 'submitPending'));
    window.dataLayer.push({
      event: formConfig.trackingPrefix + '-submission'
    });

    var promise = void 0;
    if (formConfig.submit) {
      promise = formConfig.submit(form, formConfig);
    } else {
      var body = formConfig.transformForSubmit ? formConfig.transformForSubmit(formConfig, form) : transformForSubmit(formConfig, form);

      promise = submitToUrl(body, formConfig.submitUrl, formConfig.trackingPrefix);
    }

    return promise.then(function (resp) {
      return dispatch(setSubmitted(resp));
    }).catch(function (error) {
      // overly cautious
      var errorMessage = _.get('message', error);
      var errorType = 'clientError';
      if (errorMessage.startsWith('vets_throttled_error')) {
        errorType = 'throttledError';
      } else if (errorMessage.startsWith('vets_server_error')) {
        errorType = 'serverError';
      }
      captureError(error, errorType);
      dispatch(setSubmission('status', errorType, error.extra));
    });
  };
}

export function uploadFile(file, uiOptions, onProgress, onChange, onError) {
  return function (dispatch, getState) {
    if (file.size > uiOptions.maxSize) {
      onChange({
        name: file.name,
        errorMessage: 'File is too large to be uploaded'
      });

      onError();
      return null;
    }

    if (file.size < uiOptions.minSize) {
      onChange({
        name: file.name,
        errorMessage: 'File is too small to be uploaded'
      });

      onError();
      return null;
    }

    // we limit file types, but it’s not respected on mobile and desktop
    // users can bypass it without much effort
    if (!uiOptions.fileTypes.some(function (fileType) {
      return file.name.toLowerCase().endsWith(fileType.toLowerCase());
    })) {
      onChange({
        name: file.name,
        errorMessage: 'File is not one of the allowed types'
      });

      onError();
      return null;
    }

    onChange({
      name: file.name,
      uploading: true
    });

    var payload = uiOptions.createPayload(file, getState().form.formId);

    var req = new XMLHttpRequest();

    req.open('POST', '' + environment.API_URL + uiOptions.endpoint);
    req.addEventListener('load', function () {
      if (req.status >= 200 && req.status < 300) {
        var body = 'response' in req ? req.response : req.responseText;
        var fileData = uiOptions.parseResponse(JSON.parse(body), file);
        onChange(fileData);
      } else {
        var errorMessage = req.statusText;
        if (req.status === 429) {
          errorMessage = 'You\u2019ve reached the limit for the number of submissions we can accept at this time. Please try again in ' + timeFromNow(moment.unix(parseInt(req.getResponseHeader('x-ratelimit-reset'), 10))) + '.';
        }

        onChange({
          name: file.name,
          errorMessage: errorMessage
        });
        Raven.captureMessage('vets_upload_error: ' + req.statusText);
        onError();
      }
    });

    req.addEventListener('error', function () {
      var errorMessage = 'Network request failed';
      onChange({
        name: file.name,
        errorMessage: errorMessage
      });
      Raven.captureMessage('vets_upload_error: ' + errorMessage, {
        extra: {
          statusText: req.statusText
        }
      });
      onError();
    });

    req.upload.addEventListener('progress', function (evt) {
      if (evt.lengthComputable && onProgress) {
        // setting this at 80, because there's some time after we get to 100%
        // where the backend is uploading to s3
        onProgress(evt.loaded / evt.total * 80);
      }
    });

    req.setRequestHeader('X-Key-Inflection', 'camel');
    req.send(payload);

    return req;
  };
}