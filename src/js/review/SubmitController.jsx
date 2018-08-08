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
      preSubmitAccepted,
      trackingPrefix
    } = this.props;

    const {
      isValid,
      errors
    } = isValidForm(form, pagesByChapter);

    if (isValid) {
      this.props.submitForm(formConfig, form);
    } else {
      // validation errors in this situation are not visible, so we’d
      // like to know if they’re common
      if (preSubmitAccepted) {
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
      formConfig,
      preSubmitAccepted,
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
          checked={preSubmitAccepted}
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
  const preSubmitAccepted = form.data.preSubmitAccepted;

  return {
    form,
    formConfig,
    pagesByChapter,
    pageList,
    preSubmitAccepted,
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
  preSubmitAccepted: PropTypes.bool.isRequired,
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
