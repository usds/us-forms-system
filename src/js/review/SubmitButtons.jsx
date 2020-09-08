import React from 'react';
import ProgressButton from '../components/ProgressButton';
import { timeFromNow } from '../utilities/date';

export default function SubmitButtons(props) {
  const {
    onBack,
    onSubmit,
    submission,
    renderErrorMessage
  } = props;
  let submitButton;
  let submitMessage;
  if (submission.status === false) {
    submitButton = (
      <ProgressButton
        onButtonClick={onSubmit}
        buttonText="Submit Application"
        buttonClass="usa-button usa-button--primary"/>
    );
  } else if (submission.status === 'submitPending') {
    submitButton = (
      <ProgressButton
        onButtonClick={onSubmit}
        buttonText="Sending..."
        disabled
        buttonClass="usa-button"/>
    );
  } else if (submission.status === 'applicationSubmitted') {
    submitButton = (
      <ProgressButton
        onButtonClick={onSubmit}
        buttonText="Submitted"
        disabled
        buttonClass="usa-button usa-button--base usfs-button--green"
        beforeText="&#10003;"/>
    );
  } else if (submission.status === 'clientError') {
    submitButton = (
      <ProgressButton
        onButtonClick={onSubmit}
        buttonText="Submit Application"
        buttonClass="usa-button usa-button--primary"/>
    );
    submitMessage = (
      <div className="usa-alert usa-alert--error schemaform-failure-alert">
        <div className="usa-alert__body">
          <h3 className="usa-alert__heading">
            We’re sorry, there was an error connecting to the server.
          </h3>
          <p className="usa-alert__text">Please check your Internet connection and try again.</p>
        </div>
      </div>
    );
  } else if (submission.status === 'throttledError') {
    submitButton = (
      <ProgressButton
        onButtonClick={onSubmit}
        buttonText="Submit Application"
        buttonClass="usa-button usa-button--primary"/>
    );
    submitMessage = (
      <div className="usa-alert usa-alert--error schemaform-failure-alert">
        <div className="usa-alert__body">
          <h3 className="usa-alert__heading">We’ve run into a problem</h3>
          <p className="usa-alert__text">We’re sorry. Your submission didn’t go through because we received too many requests from you. Please wait {timeFromNow(new Date(submission.extra * 1000))} and submit your request again.</p>
        </div>
      </div>
    );
  } else if (submission.status === 'validationError') {
    submitButton = (
      <ProgressButton
        onButtonClick={onSubmit}
        buttonText="Submit Application"
        buttonClass="usa-button usa-button--primary"/>
    );
    submitMessage = (
      <div className="usa-alert usa-alert--error schemaform-failure-alert">
        <div className="usa-alert__body">
          <h3 className="usa-alert__heading">
            We’re sorry. Some information in your application is missing or not valid.
          </h3>
          <p className="usa-alert__text">Please check each section of your application to make sure you’ve filled out all the information that is required.</p>
        </div>
      </div>
    );
  } else {
    if (renderErrorMessage) {
      submitMessage = renderErrorMessage();
    } else {
      submitMessage = (
        <div className="usa-alert usa-alert--error schemaform-failure-alert">
          <div className="usa-alert__body">
            <h3 className="usa-alert__heading">
              We’re sorry, the application didn’t go through.
            </h3>
            <p className="usa-alert__text">You’ll have to start over. We suggest you wait 1 day while we fix this problem.</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="grid-row">
          <div className="grid-col-fill">
            {submitMessage}
          </div>
        </div>
        <div className="grid-row form-progress-buttons schemaform-back-buttons">
          <div className="grid-col-6">
            <a href="/">
              <button className="usa-button usa-button--primary">Go back to the home page</button>
            </a>
          </div>
          {submitButton}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid-row form-progress-buttons">
        <div className="grid-col-6 tablet:grid-col-5">
          <ProgressButton
            onButtonClick={onBack}
            buttonText="Back"
            buttonClass="usa-button usa-button--secondary"
            beforeText="«"/>
        </div>
        <div className="grid-col-5">
          {submitButton}
        </div>
        <div className="grid-col-1">
          <div className="hidden">&nbsp;</div>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-auto">
          {submitMessage}
        </div>
      </div>
    </div>
  );
}
