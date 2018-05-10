var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Scroll from 'react-scroll';
import PropTypes from 'prop-types';

import { SAVE_STATUSES, saveErrors } from './actions';
import { focusElement } from '../../utils/helpers';

var Element = Scroll.Element;
var scroller = Scroll.scroller;
var scrollToTop = function scrollToTop() {
  scroller.scrollTo('saveFormLinkTop', window.VetsGov.scroll || {
    duration: 500,
    delay: 0,
    smooth: true
  });
};

var SaveFormLink = function (_React$Component) {
  _inherits(SaveFormLink, _React$Component);

  function SaveFormLink(props) {
    _classCallCheck(this, SaveFormLink);

    var _this = _possibleConstructorReturn(this, (SaveFormLink.__proto__ || Object.getPrototypeOf(SaveFormLink)).call(this, props));

    _this.saveFormAfterLogin = function () {
      window.dataLayer.push({
        event: _this.props.form.trackingPrefix + 'sip-login-before-save'
      });
      _this.handleSave();
    };

    _this.saveForm = function () {
      if (_this.props.user.login.currentlyLoggedIn) {
        _this.handleSave();
      } else {
        _this.openLoginModal();
      }
    };

    _this.openLoginModal = function () {
      _this.loginAttemptInProgress = true;
      _this.props.toggleLoginModal(true);
    };

    _this.state = {
      modalOpened: false
    };

    _this.loginAttemptInProgress = false;
    return _this;
  }

  _createClass(SaveFormLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (saveErrors.has(this.props.savedStatus)) {
        scrollToTop();
        focusElement('.schemaform-save-error');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var loginAttemptCompleted = this.props.user.login.showModal === true && newProps.user.login.showModal === false && this.loginAttemptInProgress;

      if (loginAttemptCompleted && newProps.user.login.currentlyLoggedIn) {
        this.loginAttemptInProgress = false;
        this.saveFormAfterLogin();
      } else if (loginAttemptCompleted && !newProps.user.login.currentlyLoggedIn) {
        this.loginAttemptInProgress = false;
      }
    }
  }, {
    key: 'handleSave',
    value: function handleSave() {
      var _props$form = this.props.form,
          formId = _props$form.formId,
          version = _props$form.version,
          data = _props$form.data;

      var returnUrl = this.props.locationPathname;
      this.props.saveAndRedirectToReturnUrl(formId, data, version, returnUrl);
    }
  }, {
    key: 'render',
    value: function render() {
      var savedStatus = this.props.form.savedStatus;


      var saveLinkMessage = this.props.user.login.currentlyLoggedIn ? 'Finish this application later' : 'Save and finish this application later';

      return React.createElement(
        'div',
        { style: { display: this.props.children ? 'inline' : null } },
        React.createElement(Element, { name: 'saveFormLinkTop' }),
        saveErrors.has(savedStatus) && React.createElement(
          'div',
          { role: 'alert', className: 'usa-alert usa-alert-error no-background-image schemaform-save-error' },
          savedStatus === SAVE_STATUSES.failure && 'We’re sorry. Something went wrong when saving your form. If you’re on a secure and private computer, you can leave this page open and try saving your form again in a few minutes. If you’re on a public computer, you can continue to fill out your form, but it won’t automatically save as you fill it out.',
          savedStatus === SAVE_STATUSES.clientFailure && 'We’re sorry, but we’re unable to connect to Vets.gov. Please check that you’re connected to the Internet and try again.',
          savedStatus === SAVE_STATUSES.noAuth && React.createElement(
            'span',
            null,
            'Sorry, you\u2019re signed out. Please ',
            React.createElement(
              'button',
              { className: 'va-button-link', onClick: this.openLoginModal },
              'sign in'
            ),
            ' again to save your application.'
          )
        ),
        savedStatus !== SAVE_STATUSES.noAuth && React.createElement(
          'span',
          null,
          React.createElement(
            'button',
            { type: 'button', className: 'va-button-link schemaform-sip-save-link', onClick: this.saveForm },
            this.props.children || saveLinkMessage
          ),
          '.'
        )
      );
    }
  }]);

  return SaveFormLink;
}(React.Component);

SaveFormLink.propTypes = {
  locationPathname: PropTypes.string.isRequired,
  form: PropTypes.shape({
    formId: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    trackingPrefix: PropTypes.string.isRequired,
    savedStatus: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.object.isRequired,
  toggleLoginModal: PropTypes.func.isRequired
};

export default SaveFormLink;