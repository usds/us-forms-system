'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLOSE_REVIEW_CHAPTER = exports.OPEN_REVIEW_CHAPTER = exports.SET_SUBMITTED = exports.SET_SUBMISSION = exports.SET_PRE_SUBMIT = exports.SET_VIEWED_PAGES = exports.SET_DATA = exports.SET_EDIT_MODE = undefined;
exports.closeReviewChapter = closeReviewChapter;
exports.openReviewChapter = openReviewChapter;
exports.setData = setData;
exports.setEditMode = setEditMode;
exports.setSubmission = setSubmission;
exports.setPreSubmit = setPreSubmit;
exports.setSubmitted = setSubmitted;
exports.setViewedPages = setViewedPages;
exports.submitToUrl = submitToUrl;
exports.submitForm = submitForm;
exports.uploadFile = uploadFile;

var _helpers = require('./helpers');

var _date = require('./utilities/date');

var SET_EDIT_MODE = exports.SET_EDIT_MODE = 'SET_EDIT_MODE';
var SET_DATA = exports.SET_DATA = 'SET_DATA';
var SET_VIEWED_PAGES = exports.SET_VIEWED_PAGES = 'SET_VIEWED_PAGES';
var SET_PRE_SUBMIT = exports.SET_PRE_SUBMIT = 'SET_PRE_SUBMIT';
var SET_SUBMISSION = exports.SET_SUBMISSION = 'SET_SUBMISSION';
var SET_SUBMITTED = exports.SET_SUBMITTED = 'SET_SUBMITTED';
var OPEN_REVIEW_CHAPTER = exports.OPEN_REVIEW_CHAPTER = 'OPEN_REVIEW_CHAPTER';
var CLOSE_REVIEW_CHAPTER = exports.CLOSE_REVIEW_CHAPTER = 'CLOSE_REVIEW_CHAPTER';

function closeReviewChapter(closedChapter) {
  var pageKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return {
    type: CLOSE_REVIEW_CHAPTER,
    closedChapter: closedChapter,
    pageKeys: pageKeys
  };
}

function openReviewChapter(openedChapter) {
  return {
    type: OPEN_REVIEW_CHAPTER,
    openedChapter: openedChapter
  };
}

function setData(data) {
  return {
    type: SET_DATA,
    data: data
  };
}

function setEditMode(page, edit) {
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
function setSubmission(field, value) {
  var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return {
    type: SET_SUBMISSION,
    field: field,
    value: value,
    extra: extra
  };
}

function setPreSubmit(preSubmitField, preSubmitAccepted) {
  return {
    type: SET_PRE_SUBMIT,
    preSubmitField: preSubmitField,
    preSubmitAccepted: preSubmitAccepted
  };
}

function setSubmitted(response) {
  return {
    type: SET_SUBMITTED,
    response: typeof response.data !== 'undefined' ? response.data : response
  };
}

function setViewedPages(pageKeys) {
  return {
    type: SET_VIEWED_PAGES,
    pageKeys: pageKeys
  };
}

function submitToUrl(body, submitUrl, recordEvent) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('POST', submitUrl);
    req.addEventListener('load', function () {
      if (req.status >= 200 && req.status < 300) {
        recordEvent({ event: 'form-submit-successful' });

        // got this from the fetch polyfill, keeping it to be safe
        var responseBody = 'response' in req ? req.response : req.responseText;
        var results = JSON.parse(responseBody);
        resolve(results);
      } else {
        var error = void 0;
        if (req.status === 429) {
          error = new Error('throttled_error: ' + req.statusText);
          error.extra = parseInt(req.getResponseHeader('x-ratelimit-reset'), 10);
        } else {
          error = new Error('server_error: ' + req.statusText);
        }
        error.statusText = req.statusText;
        reject(error);
      }
    });

    req.addEventListener('error', function () {
      var error = new Error('client_error: Network request failed');
      error.statusText = req.statusText;
      reject(error);
    });

    req.addEventListener('abort', function () {
      var error = new Error('client_error: Request aborted');
      error.statusText = req.statusText;
      reject(error);
    });

    req.addEventListener('timeout', function () {
      var error = new Error('client_error: Request timed out');
      error.statusText = req.statusText;
      reject(error);
    });

    req.setRequestHeader('Content-Type', 'application/json');

    req.send(body);
  });
}

function submitForm(formConfig, form) {
  var recordEvent = formConfig.recordEvent ? formConfig.recordEvent : console.log.bind(console); // eslint-disable-line no-console

  return function (dispatch) {
    dispatch(setSubmission('status', 'submitPending'));
    recordEvent({ event: 'form-submit-pending' });

    var promise = void 0;
    if (formConfig.submit) {
      promise = formConfig.submit(form, formConfig);
    } else {
      var body = formConfig.transformForSubmit ? formConfig.transformForSubmit(formConfig, form) : (0, _helpers.transformForSubmit)(formConfig, form);

      promise = submitToUrl(body, formConfig.submitUrl, recordEvent);
    }

    return promise.then(function (resp) {
      return dispatch(setSubmitted(resp));
    }).catch(function (errorReceived) {
      // overly cautious
      var error = errorReceived instanceof Error ? errorReceived : new Error(errorReceived);
      var errorMessage = String(error.message);
      var errorType = 'clientError';
      if (errorMessage.startsWith('throttled_error')) {
        errorType = 'throttledError';
      } else if (errorMessage.startsWith('server_error')) {
        errorType = 'serverError';
      }
      recordEvent({ event: 'form-submit-error', error: error, errorType: errorType });
      dispatch(setSubmission('status', errorType, error.extra));
    });
  };
}

function uploadFile(file, uiOptions, onProgress, onChange, onError) {
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

    req.open('POST', uiOptions.fileUploadUrl);
    req.addEventListener('load', function () {
      if (req.status >= 200 && req.status < 300) {
        var body = 'response' in req ? req.response : req.responseText;
        var fileData = uiOptions.parseResponse(JSON.parse(body), file);
        onChange(fileData);
      } else {
        var errorMessage = req.statusText;
        if (req.status === 429) {
          var resetDate = new Date(req.getResponseHeader('x-ratelimit-reset') * 1000);
          errorMessage = 'You\u2019ve reached the limit for the number of submissions we can accept at this time. Please try again in ' + (0, _date.timeFromNow)(resetDate) + '.';
        }

        onChange({
          name: file.name,
          errorMessage: errorMessage
        });
        onError();
      }
    });

    req.addEventListener('error', function () {
      var errorMessage = 'Network request failed';
      onChange({
        name: file.name,
        errorMessage: errorMessage
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
//# sourceMappingURL=actions.js.map