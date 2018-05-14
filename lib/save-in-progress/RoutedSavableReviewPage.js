import _debounce from 'lodash/fp/debounce';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SaveFormLink from '../save-in-progress/SaveFormLink';
import SaveStatus from '../save-in-progress/SaveStatus';

import { saveAndRedirectToReturnUrl, autoSaveForm, saveErrors } from './actions';
import { toggleLoginModal } from '../../../login/actions';

import { ReviewPage } from '../review/ReviewPage';
import { setData, setPrivacyAgreement, setEditMode, setSubmission, submitForm, uploadFile } from '../actions';
import { getFormContext } from './selectors';

var RoutedSavableReviewPage = function (_React$Component) {
  _inherits(RoutedSavableReviewPage, _React$Component);

  function RoutedSavableReviewPage(props) {
    _classCallCheck(this, RoutedSavableReviewPage);

    var _this = _possibleConstructorReturn(this, (RoutedSavableReviewPage.__proto__ || Object.getPrototypeOf(RoutedSavableReviewPage)).call(this, props));

    _this.setData = function () {
      var _this$props;

      (_this$props = _this.props).setData.apply(_this$props, arguments);
      _this.debouncedAutoSave();
    };

    _this.autoSave = function () {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          user = _this$props2.user;

      if (user.login.currentlyLoggedIn) {
        var data = form.data;
        var formId = form.formId,
            version = form.version;

        var returnUrl = _this.props.location.pathname;

        _this.props.autoSaveForm(formId, data, version, returnUrl);
      }
    };

    _this.renderErrorMessage = function () {
      var _this$props3 = _this.props,
          route = _this$props3.route,
          user = _this$props3.user,
          form = _this$props3.form,
          location = _this$props3.location;

      var errorText = route.formConfig.errorText;
      var savedStatus = form.savedStatus;

      var saveLink = React.createElement(
        SaveFormLink,
        {
          locationPathname: location.pathname,
          form: form,
          user: user,
          saveAndRedirectToReturnUrl: _this.props.saveAndRedirectToReturnUrl,
          toggleLoginModal: _this.props.toggleLoginModal },
        'save your application'
      );

      if (saveErrors.has(savedStatus)) {
        return saveLink;
      }

      var InlineErrorComponent = void 0;
      if (typeof errorText === 'function') {
        InlineErrorComponent = errorText;
      } else if (typeof errorText === 'string') {
        InlineErrorComponent = function InlineErrorComponent() {
          return React.createElement(
            'p',
            null,
            errorText
          );
        };
      } else {
        InlineErrorComponent = function InlineErrorComponent() {
          return React.createElement(
            'p',
            null,
            'If it still doesn\u2019t work, please call the Vets.gov Help Desk at ',
            React.createElement(
              'a',
              { href: 'tel:855-574-7286' },
              '1-855-574-7286'
            ),
            ', TTY: ',
            React.createElement(
              'a',
              { href: 'tel:18008778339' },
              '1-800-877-8339'
            ),
            '. We\u2019re here Monday \u2013 Friday, 8:00 a.m. \u2013 8:00 p.m. (ET).'
          );
        };
      }

      return React.createElement(
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
            'We\u2019re working to fix the problem, but it may take us a little while. Please ',
            saveLink,
            ' and try submitting it again tomorrow.'
          ),
          !user.login.currentlyLoggedIn && React.createElement(
            'p',
            null,
            'If you don\u2019t have an account, you\u2019ll have to start over. Please try submitting your application again tomorrow.'
          ),
          React.createElement(InlineErrorComponent, null)
        )
      );
    };

    _this.debouncedAutoSave = _debounce(1000, _this.autoSave);
    return _this;
  }

  _createClass(RoutedSavableReviewPage, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          form = _props.form,
          user = _props.user,
          location = _props.location;


      var contentAfterButtons = React.createElement(
        'div',
        null,
        React.createElement(SaveStatus, {
          isLoggedIn: user.login.currentlyLoggedIn,
          showLoginModal: user.login.showModal,
          toggleLoginModal: this.props.toggleLoginModal,
          form: form }),
        React.createElement(SaveFormLink, {
          locationPathname: location.pathname,
          form: form,
          user: user,
          saveAndRedirectToReturnUrl: this.props.saveAndRedirectToReturnUrl,
          toggleLoginModal: this.props.toggleLoginModal })
      );

      return React.createElement(ReviewPage, _extends({}, this.props, {
        setData: this.setData,
        formContext: getFormContext({ user: user, form: form }),
        contentAfterButtons: form.submission.status === 'error' ? null : contentAfterButtons,
        renderErrorMessage: this.renderErrorMessage }));
    }
  }]);

  return RoutedSavableReviewPage;
}(React.Component);

function mapStateToProps(state) {
  return {
    form: state.form,
    user: state.user
  };
}

var mapDispatchToProps = {
  setEditMode: setEditMode,
  setSubmission: setSubmission,
  submitForm: submitForm,
  setPrivacyAgreement: setPrivacyAgreement,
  setData: setData,
  uploadFile: uploadFile,
  saveAndRedirectToReturnUrl: saveAndRedirectToReturnUrl,
  autoSaveForm: autoSaveForm,
  toggleLoginModal: toggleLoginModal
};

RoutedSavableReviewPage.propTypes = {
  form: PropTypes.object.isRequired,
  route: PropTypes.shape({
    formConfig: PropTypes.object.isRequired
  }).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutedSavableReviewPage));

export { RoutedSavableReviewPage };