var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { toggleLoginModal } from '../../../login/actions';
import { fetchInProgressForm, removeInProgressForm } from './actions';
import LoadingIndicator from '../../components/LoadingIndicator';
import FormStartControls from './FormStartControls';
import { getIntroState } from './selectors';

var SaveInProgressIntro = function (_React$Component) {
  _inherits(SaveInProgressIntro, _React$Component);

  function SaveInProgressIntro() {
    _classCallCheck(this, SaveInProgressIntro);

    return _possibleConstructorReturn(this, (SaveInProgressIntro.__proto__ || Object.getPrototypeOf(SaveInProgressIntro)).apply(this, arguments));
  }

  _createClass(SaveInProgressIntro, [{
    key: 'getAlert',
    value: function getAlert(savedForm) {
      var _this2 = this;

      var alert = void 0;
      var _props$user = this.props.user,
          profile = _props$user.profile,
          login = _props$user.login;

      var prefillAvailable = !!(profile && profile.prefillsAvailable.includes(this.props.formId));
      var _props = this.props,
          renderSignInMessage = _props.renderSignInMessage,
          prefillEnabled = _props.prefillEnabled;


      if (login.currentlyLoggedIn) {
        if (savedForm) {
          var savedAt = this.props.lastSavedDate ? moment(this.props.lastSavedDate) : moment.unix(savedForm.last_updated);
          var expirationDate = moment.unix(savedForm.metadata.expires_at).format('M/D/YYYY');

          alert = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'usa-alert usa-alert-info no-background-image schemaform-sip-alert' },
              React.createElement(
                'div',
                { className: 'schemaform-sip-alert-title' },
                'Application status: ',
                React.createElement(
                  'strong',
                  null,
                  'In progress'
                )
              ),
              React.createElement(
                'div',
                { className: 'saved-form-metadata-container' },
                React.createElement(
                  'span',
                  { className: 'saved-form-metadata' },
                  'Last saved on ',
                  savedAt.format('M/D/YYYY [at] h:mm a')
                ),
                React.createElement(
                  'div',
                  { className: 'expires-container' },
                  'Your saved application ',
                  React.createElement(
                    'span',
                    { className: 'expires' },
                    'will expire on ',
                    expirationDate,
                    '.'
                  )
                )
              ),
              React.createElement(
                'div',
                null,
                this.props.children
              )
            ),
            React.createElement('br', null)
          );
        } else if (prefillAvailable) {
          alert = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'usa-alert usa-alert-info schemaform-sip-alert' },
              React.createElement(
                'div',
                { className: 'usa-alert-body' },
                React.createElement(
                  'strong',
                  null,
                  'Note:'
                ),
                ' Since you\u2019re signed in to your account, we can prefill part of your application based on your account details. You can also save your form in progress, and come back later to finish filling it out.'
              )
            ),
            React.createElement('br', null)
          );
        } else {
          alert = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'usa-alert usa-alert-info schemaform-sip-alert' },
              React.createElement(
                'div',
                { className: 'usa-alert-body' },
                'You can save this form in progress, and come back later to finish filling it out.'
              )
            ),
            React.createElement('br', null)
          );
        }
      } else if (renderSignInMessage) {
        alert = renderSignInMessage(prefillEnabled);
      } else if (prefillEnabled) {
        alert = React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'usa-alert usa-alert-info schemaform-sip-alert' },
            React.createElement(
              'div',
              { className: 'usa-alert-body' },
              'If you\u2019re signed in to your account, your application process can go more smoothly. Here\u2019s why:',
              React.createElement('br', null),
              React.createElement(
                'ul',
                null,
                React.createElement(
                  'li',
                  null,
                  'We can prefill part of your application based on your account details.'
                ),
                React.createElement(
                  'li',
                  null,
                  'You can save your form in progress, and come back later to finish filling it out. You have 60 days from the date you start or update your application to submit the form. After 60 days, the form won\u2019t be saved, and you\u2019ll need to start over.'
                )
              ),
              React.createElement('br', null),
              React.createElement(
                'button',
                { className: 'va-button-link', onClick: function onClick() {
                    return _this2.props.toggleLoginModal(true);
                  } },
                'Sign in to your account.'
              )
            )
          ),
          React.createElement('br', null)
        );
      } else {
        alert = React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'usa-alert usa-alert-info schemaform-sip-alert' },
            React.createElement(
              'div',
              { className: 'usa-alert-body' },
              'You can save this form in progress, and come back later to finish filling it out.',
              React.createElement('br', null),
              React.createElement(
                'button',
                { className: 'va-button-link', onClick: function onClick() {
                    return _this2.props.toggleLoginModal(true);
                  } },
                'Sign in to your account.'
              )
            )
          ),
          React.createElement('br', null)
        );
      }

      return alert;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var profile = this.props.user.profile;

      var savedForm = profile && profile.savedForms.filter(function (f) {
        return moment.unix(f.metadata.expires_at).isAfter();
      }).find(function (f) {
        return f.form === _this3.props.formId;
      });
      var prefillAvailable = !!(profile && profile.prefillsAvailable.includes(this.props.formId));

      if (profile.loading && !this.props.resumeOnly) {
        return React.createElement(
          'div',
          null,
          React.createElement(LoadingIndicator, { message: 'Checking to see if you have a saved version of this application...' }),
          React.createElement('br', null)
        );
      }

      if (this.props.resumeOnly && !savedForm) {
        return null;
      }

      return React.createElement(
        'div',
        null,
        !this.props.buttonOnly && this.getAlert(savedForm),
        React.createElement(FormStartControls, {
          resumeOnly: this.props.resumeOnly,
          messages: this.props.messages,
          startText: this.props.startText,
          startPage: this.props.pageList[1].path,
          formId: this.props.formId,
          returnUrl: this.props.returnUrl,
          migrations: this.props.migrations,
          prefillTransformer: this.props.prefillTransformer,
          fetchInProgressForm: this.props.fetchInProgressForm,
          removeInProgressForm: this.props.removeInProgressForm,
          prefillAvailable: prefillAvailable,
          formSaved: !!savedForm }),
        React.createElement('br', null)
      );
    }
  }]);

  return SaveInProgressIntro;
}(React.Component);

export default SaveInProgressIntro;


SaveInProgressIntro.propTypes = {
  buttonOnly: PropTypes.bool,
  prefillEnabled: PropTypes.bool,
  formId: PropTypes.string.isRequired,
  messages: PropTypes.object,
  migrations: PropTypes.array,
  returnUrl: PropTypes.string,
  lastSavedDate: PropTypes.number,
  user: PropTypes.object.isRequired,
  pageList: PropTypes.array.isRequired,
  fetchInProgressForm: PropTypes.func.isRequired,
  removeInProgressForm: PropTypes.func.isRequired,
  startText: PropTypes.string,
  toggleLoginModal: PropTypes.func.isRequired,
  renderSignInMessage: PropTypes.func
};

export var introSelector = getIntroState;

export var introActions = {
  fetchInProgressForm: fetchInProgressForm,
  removeInProgressForm: removeInProgressForm,
  toggleLoginModal: toggleLoginModal
};