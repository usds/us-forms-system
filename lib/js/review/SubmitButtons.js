import React from 'react';
import moment from 'moment';
import ProgressButton from '@department-of-veterans-affairs/formation/ProgressButton';
import { timeFromNow } from '../utilities/date';

export default function SubmitButtons(props) {
  var onBack = props.onBack,
      onSubmit = props.onSubmit,
      submission = props.submission,
      renderErrorMessage = props.renderErrorMessage;

  var submitButton = void 0;
  var submitMessage = void 0;
  if (submission.status === false) {
    submitButton = React.createElement(ProgressButton, {
      onButtonClick: onSubmit,
      buttonText: 'Submit Application',
      buttonClass: 'usa-button-primary' });
  } else if (submission.status === 'submitPending') {
    submitButton = React.createElement(ProgressButton, {
      onButtonClick: onSubmit,
      buttonText: 'Sending...',
      disabled: true,
      buttonClass: 'usa-button-disabled' });
  } else if (submission.status === 'applicationSubmitted') {
    submitButton = React.createElement(ProgressButton, {
      onButtonClick: onSubmit,
      buttonText: 'Submitted',
      disabled: true,
      buttonClass: 'form-button-green',
      beforeText: '\u2713' });
  } else if (submission.status === 'clientError') {
    submitButton = React.createElement(ProgressButton, {
      onButtonClick: onSubmit,
      buttonText: 'Submit Application',
      buttonClass: 'usa-button-primary' });
    submitMessage = React.createElement(
      'div',
      { className: 'usa-alert usa-alert-error schemaform-failure-alert' },
      React.createElement(
        'div',
        { className: 'usa-alert-body' },
        React.createElement(
          'p',
          { className: 'schemaform-warning-header' },
          React.createElement(
            'strong',
            null,
            'We\u2019re sorry, there was an error connecting to Vets.gov.'
          )
        ),
        React.createElement(
          'p',
          null,
          'Please check your Internet connection and try again. If the problem persists, please contact the Vets.gov Help Desk.'
        )
      )
    );
  } else if (submission.status === 'throttledError') {
    submitButton = React.createElement(ProgressButton, {
      onButtonClick: onSubmit,
      buttonText: 'Submit Application',
      buttonClass: 'usa-button-primary' });
    submitMessage = React.createElement(
      'div',
      { className: 'usa-alert usa-alert-error schemaform-failure-alert' },
      React.createElement(
        'div',
        { className: 'usa-alert-body' },
        React.createElement(
          'p',
          { className: 'schemaform-warning-header' },
          React.createElement(
            'strong',
            null,
            'We\u2019ve run into a problem'
          )
        ),
        React.createElement(
          'p',
          null,
          'We\u2019re sorry. Your submission didn\u2019t go through because we received too many requests from you. Please wait ',
          timeFromNow(moment.unix(submission.extra)),
          ' and submit your request again.'
        )
      )
    );
  } else if (submission.status === 'validationError') {
    submitButton = React.createElement(ProgressButton, {
      onButtonClick: onSubmit,
      buttonText: 'Submit Application',
      buttonClass: 'usa-button-primary' });
    submitMessage = React.createElement(
      'div',
      { className: 'usa-alert usa-alert-error schemaform-failure-alert' },
      React.createElement(
        'div',
        { className: 'usa-alert-body' },
        React.createElement(
          'p',
          { className: 'schemaform-warning-header' },
          React.createElement(
            'strong',
            null,
            'We\u2019re sorry. Some information in your application is missing or not valid.'
          )
        ),
        React.createElement(
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
      submitMessage = React.createElement(
        'div',
        { className: 'usa-alert usa-alert-error schemaform-failure-alert' },
        React.createElement(
          'div',
          { className: 'usa-alert-body' },
          React.createElement(
            'p',
            { className: 'schemaform-warning-header' },
            React.createElement(
              'strong',
              null,
              'We\u2019re sorry, the application didn\u2019t go through.'
            )
          ),
          React.createElement(
            'p',
            null,
            'You\u2019ll have to start over. We suggest you wait 1 day while we fix this problem.'
          )
        )
      );
    }

    if (process.env.NODE_ENV !== 'production') {
      submitButton = React.createElement(
        'div',
        { className: 'small-6 usa-width-one-half medium-6 columns' },
        React.createElement(
          'a',
          { onClick: onSubmit },
          'Submit again'
        )
      );
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'small-12 medium-12 columns' },
          submitMessage
        )
      ),
      React.createElement(
        'div',
        { className: 'row form-progress-buttons schemaform-back-buttons' },
        React.createElement(
          'div',
          { className: 'small-6 usa-width-one-half medium-6 columns' },
          React.createElement(
            'a',
            { href: '/' },
            React.createElement(
              'button',
              { className: 'usa-button-primary' },
              'Go Back to Vets.gov'
            )
          )
        ),
        submitButton
      )
    );
  }
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: 'row form-progress-buttons' },
      React.createElement(
        'div',
        { className: 'small-6 medium-5 columns' },
        React.createElement(ProgressButton, {
          onButtonClick: onBack,
          buttonText: 'Back',
          buttonClass: 'usa-button-secondary',
          beforeText: '\xAB' })
      ),
      React.createElement(
        'div',
        { className: 'small-6 medium-5 columns' },
        submitButton
      ),
      React.createElement(
        'div',
        { className: 'small-1 medium-1 end columns' },
        React.createElement(
          'div',
          { className: 'hidden' },
          '\xA0'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'columns' },
        submitMessage
      )
    )
  );
}