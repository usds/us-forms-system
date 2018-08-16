import React from 'react';
import Raven from 'raven-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SubmitButtons from './SubmitButtons';
import { PreSubmitSection } from '../components/PreSubmitSection';
import { isValidForm } from '../validation';
import {
  createPageListByChapter,
  expandArrayPages,
  getActivePages,
  recordEvent
} from '../helpers';
import {
  setPreSubmit,
  setSubmission,
  submitForm
} from '../actions';

class SubmitController extends React.Component {

  componentWillReceiveProps(nextProps) {
    const nextStatus = nextProps.form.submission.status;
    const previousStatus = this.props.form.submission.status;
    if (nextStatus !== previousStatus && nextStatus === 'applicationSubmitted') {
      const newRoute = `${nextProps.formConfig.urlPrefix}confirmation`;
      this.props.router.push(newRoute);
    }
  }

  goBack = () => {
    const {
      form,
      pageList,
      router
    } = this.props;

    const eligiblePageList = getActivePages(pageList, form.data);
    const expandedPageList = expandArrayPages(eligiblePageList, this.props.form.data);

    router.push(expandedPageList[expandedPageList.length - 2].path);
  }

  handleSubmit = () => {
    const {
      form,
      formConfig,
      pagesByChapter,
      trackingPrefix
    } = this.props;

    let isValid, errors;

    // If a pre-submit agreement was specified, it has to be accepted first
    const preSubmitField = formConfig.preSubmitInfo &&
      formConfig.preSubmitInfo.required && formConfig.preSubmitInfo.field || 'AGREED';
console.log('------------------', preSubmitField, form.data[preSubmitField])
console.log(formConfig.preSubmitInfo)
console.log('------------------')
    if (preSubmitField && !form.data[preSubmitField]) {
      isValid = false;
    } else {
      ({ isValid, errors } = isValidForm(form, pagesByChapter));
    }

    if (isValid) {
      console.log('WE   ARE   SUBMITTING')
      this.props.submitForm(formConfig, form);
    } else {
      // validation errors in this situation are not visible, so we’d
      // like to know if they’re common
      if (preSubmitField && form.data[preSubmitField]) {
        recordEvent({
          event: `${trackingPrefix}-validation-failed`,
        });
        Raven.captureMessage('Validation issue not displayed', {
          extra: {
            errors,
            prefix: trackingPrefix
          }
        });
        this.props.setSubmission('status', 'validationError');
      }
      this.props.setSubmission('hasAttemptedSubmit', true);
    }
  }

  render() {
    const {
      form,
      formConfig,
      showPreSubmitError,
      renderErrorMessage,
      submission
    } = this.props;
    return (
      <div>
        <PreSubmitSection
          required
          preSubmitInfo={formConfig.preSubmitInfo}
          onChange={this.props.setPreSubmit}
          form={form}
          showError={showPreSubmitError}/>
        <SubmitButtons
          onBack={this.goBack}
          onSubmit={this.handleSubmit}
          submission={submission}
          renderErrorMessage={renderErrorMessage}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {
    formConfig,
    pageList,
    renderErrorMessage
  } = ownProps;
  const router = ownProps.router;

  const form = state.form;
  const pagesByChapter = createPageListByChapter(formConfig);
  const trackingPrefix = formConfig.trackingPrefix;
  const submission = form.submission;
  const showPreSubmitError = submission.hasAttemptedSubmit;

  return {
    form,
    formConfig,
    pagesByChapter,
    pageList,
    renderErrorMessage,
    router,
    submission,
    showPreSubmitError,
    trackingPrefix
  };
}

const mapDispatchToProps = {
  setPreSubmit,
  setSubmission,
  submitForm
};

SubmitController.propTypes = {
  form: PropTypes.object.isRequired,
  formConfig: PropTypes.object.isRequired,
  pagesByChapter: PropTypes.object.isRequired,
  pageList: PropTypes.array.isRequired,
  renderErrorMessage: PropTypes.func,
  router: PropTypes.object.isRequired,
  setPreSubmit: PropTypes.func.isRequired,
  setSubmission: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
  trackingPrefix: PropTypes.string.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitController));

// for tests
export { SubmitController };
