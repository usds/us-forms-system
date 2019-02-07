'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SubmitButtons;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProgressButton = require('../components/ProgressButton');

var _ProgressButton2 = _interopRequireDefault(_ProgressButton);

var _date = require('../utilities/date');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubmitButtons(props) {
  var onBack = props.onBack,
      onSubmit = props.onSubmit,
      submission = props.submission,
      renderErrorMessage = props.renderErrorMessage;

  var submitButton = void 0;
  var submitMessage = void 0;
  if (submission.status === false) {
    submitButton = _react2.default.createElement(_ProgressButton2.default, {
      onButtonClick: onSubmit,
      buttonText: 'Submit',
      buttonClass: 'usa-button-primary' });
  } else if (submission.status === 'submitPending') {
    submitButton = _react2.default.createElement(_ProgressButton2.default, {
      onButtonClick: onSubmit,
      buttonText: 'Sending...',
      disabled: true,
      buttonClass: 'usa-button-disabled' });
  } else if (submission.status === 'applicationSubmitted') {
    submitButton = _react2.default.createElement(_ProgressButton2.default, {
      onButtonClick: onSubmit,
      buttonText: 'Submitted',
      disabled: true,
      buttonClass: 'form-button-green',
      beforeText: '\u2713' });
  } else if (submission.status === 'clientError') {
    submitButton = _react2.default.createElement(_ProgressButton2.default, {
      onButtonClick: onSubmit,
      buttonText: 'Submit',
      buttonClass: 'usa-button-primary' });
    submitMessage = _react2.default.createElement(
      'div',
      { className: 'usa-alert usa-alert-error schemaform-failure-alert' },
      _react2.default.createElement(
        'div',
        { className: 'usa-alert-body' },
        _react2.default.createElement(
          'p',
          { className: 'schemaform-warning-header' },
          _react2.default.createElement(
            'strong',
            null,
            'We\u2019re sorry, there was an error connecting to the server.'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Please check your Internet connection and try again.'
        )
      )
    );
  } else if (submission.status === 'throttledError') {
    submitButton = _react2.default.createElement(_ProgressButton2.default, {
      onButtonClick: onSubmit,
      buttonText: 'Submit',
      buttonClass: 'usa-button-primary' });
    submitMessage = _react2.default.createElement(
      'div',
      { className: 'usa-alert usa-alert-error schemaform-failure-alert' },
      _react2.default.createElement(
        'div',
        { className: 'usa-alert-body' },
        _react2.default.createElement(
          'p',
          { className: 'schemaform-warning-header' },
          _react2.default.createElement(
            'strong',
            null,
            'We\u2019ve run into a problem'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'We\u2019re sorry. Your submission didn\u2019t go through because we received too many requests from you. Please wait ',
          (0, _date.timeFromNow)(new Date(submission.extra * 1000)),
          ' and submit your request again.'
        )
      )
    );
  } else if (submission.status === 'validationError') {
    submitButton = _react2.default.createElement(_ProgressButton2.default, {
      onButtonClick: onSubmit,
      buttonText: 'Submit',
      buttonClass: 'usa-button-primary' });
    submitMessage = _react2.default.createElement(
      'div',
      { className: 'usa-alert usa-alert-error schemaform-failure-alert' },
      _react2.default.createElement(
        'div',
        { className: 'usa-alert-body' },
        _react2.default.createElement(
          'p',
          { className: 'schemaform-warning-header' },
          _react2.default.createElement(
            'strong',
            null,
            'We\u2019re sorry. Some information in your application is missing or not valid.'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Please check each section of your application to make sure you\u2019ve filled out all the information that is required.'
        )
      )
    );
  } else {
    if (renderErrorMessage) {
      submitMessage = renderErrorMessage();
    } else {
      submitMessage = _react2.default.createElement(
        'div',
        { className: 'usa-alert usa-alert-error schemaform-failure-alert' },
        _react2.default.createElement(
          'div',
          { className: 'usa-alert-body' },
          _react2.default.createElement(
            'p',
            { className: 'schemaform-warning-header' },
            _react2.default.createElement(
              'strong',
              null,
              'We\u2019re sorry, the application didn\u2019t go through.'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            'You\u2019ll have to start over. We suggest you wait 1 day while we fix this problem.'
          )
        )
      );
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'small-12 medium-12 columns' },
          submitMessage
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row form-progress-buttons schemaform-back-buttons' },
        _react2.default.createElement(
          'div',
          { className: 'small-6 usa-width-one-half medium-6 columns' },
          _react2.default.createElement(
            'a',
            { href: '/' },
            _react2.default.createElement(
              'button',
              { className: 'usa-button-primary' },
              'Go back to the home page'
            )
          )
        ),
        submitButton
      )
    );
  }
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'row form-progress-buttons' },
      _react2.default.createElement(
        'div',
        { className: 'small-6 medium-5 columns' },
        _react2.default.createElement(_ProgressButton2.default, {
          onButtonClick: onBack,
          buttonText: 'Back',
          buttonClass: 'usa-button-secondary',
          beforeText: '' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'small-6 medium-5 columns' },
        submitButton
      ),
      _react2.default.createElement(
        'div',
        { className: 'small-1 medium-1 end columns' },
        _react2.default.createElement(
          'div',
          { className: 'hidden' },
          '\xA0'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'columns' },
        submitMessage
      )
    )
  );
}
//# sourceMappingURL=SubmitButtons.js.map