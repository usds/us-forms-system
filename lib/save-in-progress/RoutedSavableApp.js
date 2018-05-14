var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import moment from 'moment';
import Scroll from 'react-scroll';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import FormNav from '../components/FormNav';
import FormTitle from '../components/FormTitle';
import { LOAD_STATUSES, PREFILL_STATUSES, SAVE_STATUSES, setFetchFormStatus, fetchInProgressForm } from './actions';
import LoadingIndicator from '../components/LoadingIndicator';

import { isInProgress } from '../../utils/helpers';
import { getSaveInProgressState } from './selectors';

var Element = Scroll.Element;
var scroller = Scroll.scroller;
var scrollToTop = function scrollToTop() {
  scroller.scrollTo('topScrollElement', window.VetsGov.scroll || {
    duration: 500,
    delay: 0,
    smooth: true
  });
};

moment.updateLocale('en', {
  meridiem: function meridiem(hour) {
    if (hour < 12) {
      return 'a.m.';
    }
    return 'p.m.';
  },
  monthsShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
});

/*
 * Primary component for a schema generated form app.
 */

var RoutedSavableApp = function (_React$Component) {
  _inherits(RoutedSavableApp, _React$Component);

  function RoutedSavableApp() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RoutedSavableApp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RoutedSavableApp.__proto__ || Object.getPrototypeOf(RoutedSavableApp)).call.apply(_ref, [this].concat(args))), _this), _this.onbeforeunload = function (e) {
      var _this$props = _this.props,
          currentLocation = _this$props.currentLocation,
          autoSavedStatus = _this$props.autoSavedStatus;

      var trimmedPathname = currentLocation.pathname.replace(/\/$/, '');

      var message = void 0;
      if (autoSavedStatus !== SAVE_STATUSES.success && isInProgress(trimmedPathname)) {
        message = 'Are you sure you wish to leave this application? All progress will be lost.';
        // Chrome requires this to be set
        e.returnValue = message; // eslint-disable-line no-param-reassign
      }
      return message;
    }, _this.removeOnbeforeunload = function () {
      window.removeEventListener('beforeunload', _this.onbeforeunload);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RoutedSavableApp, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      window.addEventListener('beforeunload', this.onbeforeunload);
      if (window.History) {
        window.History.scrollRestoration = 'manual';
      }

      // If we start in the middle of a form, redirect to the beginning or load
      //  saved form / prefill
      // If we're in production, we'll redirect if we start in the middle of a form
      // In development, we won't redirect unless we append the URL with `?redirect`
      var currentLocation = this.props.currentLocation;

      var trimmedPathname = currentLocation.pathname.replace(/\/$/, '');
      var resumeForm = trimmedPathname.endsWith('resume');
      var devRedirect = __BUILDTYPE__ !== 'development' && !currentLocation.search.includes('skip') || currentLocation.search.includes('redirect');
      var goToStartPage = resumeForm || devRedirect;
      if (isInProgress(currentLocation.pathname) && goToStartPage) {
        // We started on a page that isn't the first, so after we know whether
        //  we're logged in or not, we'll load or redirect as needed.
        this.shouldRedirectOrLoad = true;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // When a user isn't logged in, the profile finishes loading before the component mounts
      if (!this.props.profileIsLoading && this.shouldRedirectOrLoad) {
        this.redirectOrLoad(this.props);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // When a user is logged in, the profile finishes loading after the component
      //  has mounted, so we check here.
      // If we're done loading the profile, check to see if we should load or redirect
      if (this.props.profileIsLoading && !newProps.profileIsLoading && this.shouldRedirectOrLoad) {
        this.redirectOrLoad(newProps);
      }

      var status = newProps.loadedStatus;
      if (status === LOAD_STATUSES.success && newProps.currentLocation && newProps.currentLocation.pathname.endsWith('resume')) {
        newProps.router.replace(newProps.returnUrl);
      } else if (status === LOAD_STATUSES.success) {
        newProps.router.push(newProps.returnUrl);
        // Set loadedStatus in redux to not-attempted to not show the loading page
        newProps.setFetchFormStatus(LOAD_STATUSES.notAttempted);
      } else if (newProps.prefillStatus !== this.props.prefillStatus && newProps.prefillStatus === PREFILL_STATUSES.unfilled) {
        newProps.router.push(newProps.routes[this.props.routes.length - 1].pageList[1].path);
      } else if (status !== LOAD_STATUSES.notAttempted && status !== LOAD_STATUSES.pending && status !== this.props.loadedStatus && !window.location.pathname.endsWith('/error')) {
        var action = 'push';
        if (window.location.pathname.endsWith('resume')) {
          action = 'replace';
        }
        newProps.router[action]((newProps.formConfig.urlPrefix || '') + 'error');
      }
    }

    // should scroll up to top while user is waiting for form to load or save

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      if (oldProps.loadedStatus !== this.props.loadedStatus && this.props.loadedStatus === LOAD_STATUSES.pending || oldProps.savedStatus !== this.props.savedStatus && this.props.savedStatus === SAVE_STATUSES.pending) {
        scrollToTop();
      }

      if (this.props.savedStatus !== oldProps.savedStatus && this.props.savedStatus === SAVE_STATUSES.success) {
        this.props.router.push((this.props.formConfig.urlPrefix || '') + 'form-saved');
      }
    }

    // I’m not convinced this is ever executed

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeOnbeforeunload();
    }
  }, {
    key: 'redirectOrLoad',
    value: function redirectOrLoad(props) {
      // Stop a user that's been redirected to be redirected again after logging in
      this.shouldRedirectOrLoad = false;

      var firstPagePath = props.routes[props.routes.length - 1].pageList[0].path;
      // If we're logged in and have a saved / pre-filled form, load that
      if (props.isLoggedIn) {
        var currentForm = props.formConfig.formId;
        var isSaved = props.savedForms.some(function (savedForm) {
          return savedForm.form === currentForm;
        });
        var hasPrefillData = props.prefillsAvailable.includes(currentForm);
        if (isSaved || hasPrefillData) {
          props.fetchInProgressForm(currentForm, props.formConfig.migrations, !isSaved && hasPrefillData);
        } else {
          // No forms to load; go to the beginning
          // If the first page is not the intro and uses `depends`, this will probably break
          props.router.replace(firstPagePath);
        }
      } else {
        // Can't load a form; go to the beginning
        // If the first page is not the intro and uses `depends`, this will probably break
        props.router.replace(firstPagePath);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocation = _props.currentLocation,
          formConfig = _props.formConfig,
          children = _props.children,
          formData = _props.formData,
          loadedStatus = _props.loadedStatus;

      var trimmedPathname = currentLocation.pathname.replace(/\/$/, '');
      var isIntroductionPage = trimmedPathname.endsWith('introduction');
      var content = void 0;
      var loadingForm = trimmedPathname.endsWith('resume') || loadedStatus === LOAD_STATUSES.pending;
      if (!formConfig.disableSave && loadingForm) {
        content = React.createElement(LoadingIndicator, { message: 'Retrieving your saved form...' });
      } else if (!formConfig.disableSave && this.props.savedStatus === SAVE_STATUSES.pending) {
        content = React.createElement(LoadingIndicator, { message: 'Saving your form...' });
      } else if (!formConfig.disableSave && this.shouldRedirectOrLoad) {
        content = React.createElement(LoadingIndicator, { message: 'Retrieving your profile information...' });
      } else if (!isInProgress(trimmedPathname)) {
        content = children;
      } else {
        content = React.createElement(
          'div',
          null,
          React.createElement(FormNav, { formData: formData, formConfig: formConfig, currentPath: trimmedPathname }),
          React.createElement(
            'div',
            { className: 'progress-box progress-box-schemaform' },
            children
          )
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement(Element, { name: 'topScrollElement' }),
        formConfig.title && (
        // If we’re on the introduction page, show the title if we’re actually on the loading screen
        !isIntroductionPage || this.props.loadedStatus !== LOAD_STATUSES.notAttempted) && React.createElement(FormTitle, { title: formConfig.title, subTitle: formConfig.subTitle }),
        content
      );
    }
  }]);

  return RoutedSavableApp;
}(React.Component);

var mapDispatchToProps = {
  setFetchFormStatus: setFetchFormStatus,
  fetchInProgressForm: fetchInProgressForm
};

export default withRouter(connect(getSaveInProgressState, mapDispatchToProps)(RoutedSavableApp));

export { RoutedSavableApp };