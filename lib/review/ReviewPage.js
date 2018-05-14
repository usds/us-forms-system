import _findIndex from 'lodash/fp/findIndex';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import Raven from 'raven-js';
import React from 'react';
import Scroll from 'react-scroll';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReviewCollapsibleChapter from './ReviewCollapsibleChapter';
import SubmitButtons from './SubmitButtons';
import PrivacyAgreement from '../components/PrivacyAgreement';
import { isValidForm } from '../validation';
import { createPageListByChapter, expandArrayPages, focusElement, getPageKeys, getActivePages, getActiveChapters } from '../helpers';
import { setData, setPrivacyAgreement, setEditMode, setSubmission, submitForm, uploadFile } from '../actions';

var scroller = Scroll.scroller;

var scrollToTop = function scrollToTop() {
  scroller.scrollTo('topScrollElement', window.VetsGov.scroll || {
    duration: 500,
    delay: 0,
    smooth: true
  });
};

var ReviewPage = function (_React$Component) {
  _inherits(ReviewPage, _React$Component);

  function ReviewPage(props) {
    _classCallCheck(this, ReviewPage);

    var _this = _possibleConstructorReturn(this, (ReviewPage.__proto__ || Object.getPrototypeOf(ReviewPage)).call(this, props));

    _this.setPagesViewed = function (keys) {
      var viewedPages = keys.reduce(function (pages, key) {
        if (!pages.has(key)) {
          // if we hit a page that we need to add, check to see if
          // we haven’t cloned the set yet; we should only do that once
          if (pages === _this.state.viewedPages) {
            var newPages = new Set(_this.state.viewedPages);
            newPages.add(key);

            return newPages;
          }

          pages.add(key);
        }

        return pages;
      }, _this.state.viewedPages);

      if (viewedPages !== _this.state.viewedPages) {
        _this.setState({ viewedPages: viewedPages });
      }
    };

    _this.handleEdit = function (pageKey, editing) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var fullPageKey = '' + pageKey + (index === null ? '' : index);
      if (editing) {
        _this.setPagesViewed([fullPageKey]);
      }
      _this.props.setEditMode(pageKey, editing, index);
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.goBack = _this.goBack.bind(_this);
    // this only needs to be run once
    _this.pagesByChapter = createPageListByChapter(_this.props.route.formConfig);

    _this.state = {
      // we’re going to shallow clone this set at times later, but that does not appear
      // to be slower than shallow cloning objects
      viewedPages: new Set(getPageKeys(props.route.pageList, props.form.data))
    };
    return _this;
  }

  _createClass(ReviewPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      scrollToTop();
      focusElement('h4');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextStatus = nextProps.form.submission.status;
      var previousStatus = this.props.form.submission.status;
      if (nextStatus !== previousStatus && nextStatus === 'applicationSubmitted') {
        this.props.router.push(nextProps.route.formConfig.urlPrefix + 'confirmation');
      }
    }
  }, {
    key: 'getEligiblePages',


    /*
     * Returns the page list without conditional pages that have not satisfied
     * their dependencies and therefore should be skipped.
     */
    value: function getEligiblePages() {
      var _props = this.props,
          form = _props.form,
          _props$route = _props.route,
          pageList = _props$route.pageList,
          path = _props$route.path;

      var eligiblePageList = getActivePages(pageList, form.data);
      var pageIndex = _findIndex(function (item) {
        return item.pageKey === path;
      }, eligiblePageList);
      return { eligiblePageList: eligiblePageList, pageIndex: pageIndex };
    }
  }, {
    key: 'goBack',
    value: function goBack() {
      var _getEligiblePages = this.getEligiblePages(),
          eligiblePageList = _getEligiblePages.eligiblePageList;

      var expandedPageList = expandArrayPages(eligiblePageList, this.props.form.data);
      this.props.router.push(expandedPageList[expandedPageList.length - 2].path);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      var formConfig = this.props.route.formConfig;

      var _isValidForm = isValidForm(this.props.form, this.pagesByChapter),
          isValid = _isValidForm.isValid,
          errors = _isValidForm.errors;

      if (isValid) {
        this.props.submitForm(formConfig, this.props.form);
      } else {
        // validation errors in this situation are not visible, so we’d
        // like to know if they’re common
        if (this.props.form.data.privacyAgreementAccepted) {
          window.dataLayer.push({
            event: formConfig.trackingPrefix + '-validation-failed'
          });
          Raven.captureMessage('Validation issue not displayed', {
            extra: {
              errors: errors,
              prefix: formConfig.trackingPrefix
            }
          });
          this.props.setSubmission('status', 'validationError');
        }
        this.props.setSubmission('hasAttemptedSubmit', true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          route = _props2.route,
          form = _props2.form,
          contentAfterButtons = _props2.contentAfterButtons,
          renderErrorMessage = _props2.renderErrorMessage,
          formContext = _props2.formContext;

      var formConfig = route.formConfig;
      var chapters = getActiveChapters(formConfig, form.data);

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'input-section' },
          React.createElement(
            'div',
            null,
            chapters.map(function (chapter) {
              return React.createElement(ReviewCollapsibleChapter, {
                key: chapter,
                onEdit: _this2.handleEdit,
                pages: _this2.pagesByChapter[chapter],
                chapterKey: chapter,
                setData: _this2.props.setData,
                setValid: _this2.props.setValid,
                uploadFile: _this2.props.uploadFile,
                chapter: formConfig.chapters[chapter],
                viewedPages: _this2.state.viewedPages,
                setPagesViewed: _this2.setPagesViewed,
                formContext: formContext,
                form: form });
            })
          )
        ),
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
        React.createElement(PrivacyAgreement, { required: true,
          onChange: this.props.setPrivacyAgreement,
          checked: form.data.privacyAgreementAccepted,
          showError: form.submission.hasAttemptedSubmit }),
        React.createElement(SubmitButtons, {
          onBack: this.goBack,
          onSubmit: this.handleSubmit,
          submission: form.submission,
          renderErrorMessage: renderErrorMessage }),
        contentAfterButtons
      );
    }
  }]);

  return ReviewPage;
}(React.Component);

function mapStateToProps(state) {
  return {
    form: state.form
  };
}

var mapDispatchToProps = {
  setEditMode: setEditMode,
  setSubmission: setSubmission,
  submitForm: submitForm,
  setPrivacyAgreement: setPrivacyAgreement,
  setData: setData,
  uploadFile: uploadFile
};

ReviewPage.propTypes = {
  form: PropTypes.object.isRequired,
  route: PropTypes.shape({
    formConfig: PropTypes.object.isRequired
  }).isRequired,
  setData: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  setSubmission: PropTypes.func.isRequired,
  setPrivacyAgreement: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  contentAfterButtons: PropTypes.element,
  renderErrorMessage: PropTypes.func,
  formContext: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewPage));

export { ReviewPage };