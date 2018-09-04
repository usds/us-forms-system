import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SubmitButtons from './SubmitButtons';
import { PreSubmitSection } from '../components/PreSubmitSection';
import { isValidForm } from '../validation';
import {
  createPageListByChapter,
  expandArrayPages,
  getActivePages
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

  getPreSubmit = formConfig => {
    return {
      required: false,
      field: 'AGREED',
      label: 'I agree to the terms and conditions.',
      error: 'You must accept the agreement before submitting.',
      ...formConfig.preSubmitInfo
    };
  }

  goBack = () => {
    const {
      form,
      pageList,
      router
    } = this.props;

    const eligiblePageList = getActivePages(pageList, form.data);
    const expandedPageList = expandArrayPages(eligiblePageList, this.props.form.data);

    // TODO: Fix this bug that assumes there is a confirmation page.
    // Actually, it assumes the app also doesn't add routes at the end!
    // A component at this level should not need to know these things!
    router.push(expandedPageList[expandedPageList.length - 2].path);
  }

  handleSubmit = () => {
    const {
      form,
      formConfig,
      pagesByChapter
    } = this.props;

    // If a pre-submit agreement is required, make sure it was accepted
    const preSubmit = this.getPreSubmit(formConfig);
    if (preSubmit.required && !form.data[preSubmit.field]) {
      this.props.setSubmission('hasAttemptedSubmit', true);
      // <PreSubmitSection/> is displaying an error for this case
      return;
    }

    // Validation errors in this situation are not visible, so we’d
    // like to know if they’re common
    const { isValid, errors } = isValidForm(form, pagesByChapter);
    if (!isValid) {
      const recordEvent = formConfig.recordEvent ?
        formConfig.recordEvent.bind(formConfig) :
        console.log.bind(console);   // eslint-disable-line no-console

      recordEvent({ event: 'validation-failed-on-submit', errors });
      this.props.setSubmission('status', 'validationError');
      this.props.setSubmission('hasAttemptedSubmit', true);
      return;
    }

    // User accepted if required, and no errors, so submit
    this.props.submitForm(formConfig, form);
  }

  render() {
    const {
      form,
      formConfig,
      showPreSubmitError,
      renderErrorMessage
    } = this.props;
    const preSubmit = this.getPreSubmit(formConfig);

    return (
      <div>
        <PreSubmitSection
          preSubmitInfo={preSubmit}
          onChange={(event) => this.props.setPreSubmit(preSubmit.field, event.target.value)}
          checked={form.data[preSubmit.field]}
          showError={showPreSubmitError}/>
        <SubmitButtons
          onBack={this.goBack}
          onSubmit={this.handleSubmit}
          submission={form.submission}
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
    showPreSubmitError
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
