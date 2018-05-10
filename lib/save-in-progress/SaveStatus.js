var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import SignInLink from '../../components/SignInLink';
import { SAVE_STATUSES, saveErrors } from './actions';

var SaveStatus = function (_React$Component) {
  _inherits(SaveStatus, _React$Component);

  function SaveStatus() {
    _classCallCheck(this, SaveStatus);

    return _possibleConstructorReturn(this, (SaveStatus.__proto__ || Object.getPrototypeOf(SaveStatus)).apply(this, arguments));
  }

  _createClass(SaveStatus, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          form = _props.form,
          isLoggedIn = _props.isLoggedIn,
          showLoginModal = _props.showLoginModal,
          toggleLoginModal = _props.toggleLoginModal;


      var savedAtMessage = void 0;
      if (form.lastSavedDate) {
        var savedAt = moment(form.lastSavedDate);
        savedAtMessage = ' Last saved at ' + savedAt.format('M/D/YYYY [at] h:mm a');
      } else {
        savedAtMessage = '';
      }

      var savedStatus = form.autoSavedStatus;

      var hasError = saveErrors.has(savedStatus) && (savedStatus === SAVE_STATUSES.noAuth && !isLoggedIn || savedStatus !== SAVE_STATUSES.noAuth);

      var signInLink = React.createElement(
        SignInLink,
        {
          className: 'va-button-link',
          isLoggedIn: isLoggedIn,
          showLoginModal: showLoginModal,
          toggleLoginModal: toggleLoginModal },
        'Sign in to save your form in progress'
      );

      return React.createElement(
        'div',
        null,
        savedStatus === SAVE_STATUSES.success && React.createElement(
          'div',
          { className: 'panel saved-success-container' },
          React.createElement('i', { className: 'fa fa-check-circle saved-success-icon' }),
          'Application has been saved.',
          savedAtMessage
        ),
        savedStatus === SAVE_STATUSES.pending && React.createElement(
          'p',
          { className: 'saved-form-autosaving' },
          'Saving...'
        ),
        hasError && React.createElement(
          'div',
          { role: 'alert', className: 'usa-alert usa-alert-error no-background-image schemaform-save-error' },
          savedStatus === SAVE_STATUSES.clientFailure && 'We’re sorry. We’re unable to connect to Vets.gov. Please check that you’re connected to the Internet, so we can save your form in progress.',
          savedStatus === SAVE_STATUSES.failure && 'We’re sorry, but we’re having some issues and are working to fix them. You can continue filling out the form, but it will not be automatically saved as you fill it out.',
          !isLoggedIn && savedStatus === SAVE_STATUSES.noAuth && React.createElement(
            'span',
            null,
            'Sorry, you\u2019re no longer signed in. ',
            signInLink,
            '.'
          )
        )
      );
    }
  }]);

  return SaveStatus;
}(React.Component);

SaveStatus.propTypes = {
  form: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default SaveStatus;