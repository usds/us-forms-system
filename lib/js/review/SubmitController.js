var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Raven from 'raven-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SubmitButtons from './SubmitButtons';
import PrivacyAgreement from '../components/PrivacyAgreement';
import { isValidForm } from '../validation';
import { createPageListByChapter, expandArrayPages, getActivePages, recordEvent } from '../helpers';
import { setPrivacyAgreement, setSubmission, submitForm } from '../actions';

var SubmitController = function (_React$Component) {
  _inherits(SubmitController, _React$Component);

  function SubmitController() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SubmitController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SubmitController.__proto__ || Object.getPrototypeOf(SubmitController)).call.apply(_ref, [this].concat(args))), _this), _this.goBack = function () {
      var _this$props = _this.props,
          form = _this$props.form,
          pageList = _this$props.pageList,
          router = _this$props.router;


      var eligiblePageList = getActivePages(pageList, form.data);
      var expandedPageList = expandArrayPages(eligiblePageList, _this.props.form.data);

      router.push(expandedPageList[expandedPageList.length - 2].path);
    }, _this.handleSubmit = function () {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          formConfig = _this$props2.formConfig,
          pagesByChapter = _this$props2.pagesByChapter,
          privacyAgreementAccepted = _this$props2.privacyAgreementAccepted,
          trackingPrefix = _this$props2.trackingPrefix;

      var _isValidForm = isValidForm(form, pagesByChapter),
          isValid = _isValidForm.isValid,
          errors = _isValidForm.errors;

      if (isValid) {
        _this.props.submitForm(formConfig, form);
      } else {
        // validation errors in this situation are not visible, so we’d
        // like to know if they’re common
        if (privacyAgreementAccepted) {
          recordEvent({
            event: trackingPrefix + '-validation-failed'
          });
          Raven.captureMessage('Validation issue not displayed', {
            extra: {
              errors: errors,
              prefix: trackingPrefix
            }
          });
          _this.props.setSubmission('status', 'validationError');
        }
        _this.props.setSubmission('hasAttemptedSubmit', true);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SubmitController, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextStatus = nextProps.form.submission.status;
      var previousStatus = this.props.form.submission.status;
      if (nextStatus !== previousStatus && nextStatus === 'applicationSubmitted') {
        var newRoute = nextProps.formConfig.urlPrefix + 'confirmation';
        this.props.router.push(newRoute);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          privacyAgreementAccepted = _props.privacyAgreementAccepted,
          renderErrorMessage = _props.renderErrorMessage,
          showPrivacyAgreementError = _props.showPrivacyAgreementError,
          submission = _props.submission;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          React.createElement(
            'strong',
            null,
            'Note:'
          ),
          ' According to federal law, there are criminal penalties, including a fine and/or imprisonment for up to 5 years, for withholding information or for providing incorrect information. (See 18 U.S.C. 1001)'
        ),
        React.createElement(PrivacyAgreement, {
          required: true,
          onChange: this.props.setPrivacyAgreement,
          checked: privacyAgreementAccepted,
          showError: showPrivacyAgreementError }),
        React.createElement(SubmitButtons, {
          onBack: this.goBack,
          onSubmit: this.handleSubmit,
          submission: submission,
          renderErrorMessage: renderErrorMessage })
      );
    }
  }]);

  return SubmitController;
}(React.Component);

function mapStateToProps(state, ownProps) {
  var formConfig = ownProps.formConfig,
      pageList = ownProps.pageList,
      renderErrorMessage = ownProps.renderErrorMessage;

  var router = ownProps.router;

  var form = state.form;
  var pagesByChapter = createPageListByChapter(formConfig);
  var trackingPrefix = formConfig.trackingPrefix;
  var submission = form.submission;
  var showPrivacyAgreementError = submission.hasAttemptedSubmit;
  var privacyAgreementAccepted = form.data.privacyAgreementAccepted;

  return {
    form: form,
    formConfig: formConfig,
    pagesByChapter: pagesByChapter,
    pageList: pageList,
    privacyAgreementAccepted: privacyAgreementAccepted,
    renderErrorMessage: renderErrorMessage,
    router: router,
    submission: submission,
    showPrivacyAgreementError: showPrivacyAgreementError,
    trackingPrefix: trackingPrefix
  };
}

var mapDispatchToProps = {
  setPrivacyAgreement: setPrivacyAgreement,
  setSubmission: setSubmission,
  submitForm: submitForm
};

SubmitController.propTypes = {
  form: PropTypes.object.isRequired,
  formConfig: PropTypes.object.isRequired,
  pagesByChapter: PropTypes.object.isRequired,
  pageList: PropTypes.array.isRequired,
  privacyAgreementAccepted: PropTypes.bool.isRequired,
  renderErrorMessage: PropTypes.func,
  router: PropTypes.object.isRequired,
  setPrivacyAgreement: PropTypes.func.isRequired,
  setSubmission: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
  trackingPrefix: PropTypes.string.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitController));

// for tests
export { SubmitController };