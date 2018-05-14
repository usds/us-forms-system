var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Raven from 'raven-js';

import { formLinks, formTitles } from '../../../user-profile/helpers';
import LoadingIndicator from '../components/LoadingIndicator';
import ProgressButton from '../components/ProgressButton';
import Modal from '../components/Modal';
import { removeSavedForm } from '../../../user-profile/actions';

export var ApplicationStatus = function (_React$Component) {
  _inherits(ApplicationStatus, _React$Component);

  function ApplicationStatus(props) {
    _classCallCheck(this, ApplicationStatus);

    var _this = _possibleConstructorReturn(this, (ApplicationStatus.__proto__ || Object.getPrototypeOf(ApplicationStatus)).call(this, props));

    _this.removeForm = function (formId) {
      _this.setState({ modalOpen: false, loading: true });
      _this.props.removeSavedForm(formId)
      // Swallow any errors and redirect anyway
      .catch(function (x) {
        return x;
      }).then(function () {
        if (!_this.props.stayAfterDelete) {
          window.location.href = formLinks[formId];
        } else {
          _this.setState({ modalOpen: false, loading: false });
        }
      });
    };

    _this.toggleModal = function () {
      _this.setState({ modalOpen: !_this.state.modalOpen });
    };

    _this.state = {
      modalOpen: false,
      loading: false
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
    return _this;
  }

  _createClass(ApplicationStatus, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.profile.loading) {
        this.timeout = setTimeout(function () {
          Raven.captureMessage('vets_application_status_slow');
        }, 5000);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      if (oldProps.profile.loading && !this.props.profile.loading) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          formIds = _props.formIds,
          profile = _props.profile,
          login = _props.login,
          applyText = _props.applyText,
          showApplyButton = _props.showApplyButton,
          applyRender = _props.applyRender,
          formType = _props.formType,
          applyLink = _props.applyLink;

      if (profile.loading || this.state.loading) {
        var message = profile.loading ? 'Checking your application status.' : 'Deleting your form.';

        return React.createElement(
          'div',
          { className: 'sip-application-status' },
          React.createElement(LoadingIndicator, { message: message })
        );
      }

      var savedForm = void 0;
      var formId = this.props.formId;

      var multipleForms = false;
      if (formIds) {
        var matchingForms = profile.savedForms.filter(function (_ref) {
          var form = _ref.form;
          return formIds.has(form);
        });
        if (matchingForms.length) {
          savedForm = matchingForms.sort(function (_ref2) {
            var metadata = _ref2.metadata;
            return -1 * metadata.last_updated;
          })[0];
          formId = savedForm.form;
          multipleForms = matchingForms.length > 1;
        }
      } else {
        savedForm = profile.savedForms.find(function (_ref3) {
          var form = _ref3.form;
          return form === _this2.props.formId;
        });
      }

      if (login.currentlyLoggedIn && savedForm) {
        var _savedForm$metadata = savedForm.metadata,
            lastSaved = _savedForm$metadata.last_updated,
            expirationTime = _savedForm$metadata.expires_at;

        var expirationDate = moment.unix(expirationTime);
        var isExpired = expirationDate.isBefore();

        var _formTitles$formId = _toArray(formTitles[formId]),
            firstLetter = _formTitles$formId[0],
            restOfTitle = _formTitles$formId.slice(1);

        var cardTitle = '' + firstLetter.toUpperCase() + restOfTitle.join('') + ' application in progress';

        if (!isExpired) {
          var lastSavedDateTime = moment.unix(lastSaved).format('M/D/YYYY [at] h:mm a');

          return React.createElement(
            'div',
            { className: 'usa-alert usa-alert-info no-background-image sip-application-status' },
            React.createElement(
              'h5',
              { className: 'form-title saved' },
              cardTitle
            ),
            React.createElement(
              'span',
              { className: 'saved-form-item-metadata' },
              'Last saved on ',
              lastSavedDateTime
            ),
            React.createElement('br', null),
            React.createElement(
              'p',
              null,
              React.createElement(
                'a',
                { className: 'usa-button-primary', href: formLinks[formId] + 'resume' },
                'Continue Your Application'
              ),
              React.createElement(
                'button',
                { className: 'usa-button-secondary', onClick: this.toggleModal },
                'Start Over'
              )
            ),
            React.createElement(
              'p',
              { className: 'no-bottom-margin' },
              'Your saved application ',
              React.createElement(
                'strong',
                null,
                'will expire on ',
                expirationDate.format('M/D/YYYY'),
                '.'
              )
            ),
            multipleForms && React.createElement(
              'p',
              { className: 'no-bottom-margin' },
              'You have more than one in-progress ',
              formType,
              ' form. ',
              React.createElement(
                'a',
                { href: '/profile' },
                'View and manage your forms on your Account page'
              ),
              '.'
            ),
            React.createElement(
              Modal,
              {
                cssClass: 'va-modal-large',
                id: 'start-over-modal',
                onClose: this.toggleModal,
                visible: this.state.modalOpen },
              React.createElement(
                'h4',
                null,
                'Starting over will delete your in-progress form.'
              ),
              React.createElement(
                'p',
                null,
                'Are you sure you want to start over?'
              ),
              React.createElement(ProgressButton, {
                onButtonClick: function onButtonClick() {
                  return _this2.removeForm(formId);
                },
                buttonText: 'Start Over',
                buttonClass: 'usa-button-primary' }),
              React.createElement(ProgressButton, {
                onButtonClick: this.toggleModal,
                buttonText: 'Cancel',
                buttonClass: 'usa-button-secondary' })
            )
          );
        }
      }

      if (showApplyButton && applyRender) {
        return applyRender();
      } else if (showApplyButton) {
        return React.createElement(
          'div',
          { itemProp: 'steps', itemScope: true, itemType: 'http://schema.org/HowToSection' },
          React.createElement(
            'h3',
            { itemProp: 'name' },
            'Ready to apply?'
          ),
          React.createElement(
            'div',
            { itemProp: 'itemListElement' },
            this.props.additionalText && React.createElement(
              'p',
              null,
              this.props.additionalText
            ),
            React.createElement(
              'div',
              { className: 'sip-application-status' },
              React.createElement(
                'a',
                { className: 'usa-button-primary va-button-primary', href: formLinks[formId] },
                applyText
              ),
              window.location.pathname.endsWith('eligibility/') && React.createElement(
                'p',
                null,
                React.createElement(
                  'a',
                  { href: applyLink },
                  'Learn more about the application process.'
                )
              )
            )
          )
        );
      }

      return null;
    }
  }]);

  return ApplicationStatus;
}(React.Component);

ApplicationStatus.propTypes = {
  formId: PropTypes.string,
  formType: PropTypes.string,
  applyLink: PropTypes.string,
  applyRender: PropTypes.func,
  applyText: PropTypes.string,
  additionalText: PropTypes.string,
  login: PropTypes.shape({
    currentlyLoggedIn: PropTypes.bool.isRequired
  }),
  profile: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    savedForms: PropTypes.array.isRequired
  }),
  stayAfterDelete: PropTypes.bool
};

function mapStateToProps(state) {
  var _state$user = state.user,
      login = _state$user.login,
      profile = _state$user.profile;


  return {
    login: login,
    profile: profile
  };
}

var mapDispatchToProps = {
  removeSavedForm: removeSavedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationStatus);