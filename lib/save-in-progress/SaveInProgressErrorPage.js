var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { LOAD_STATUSES, PREFILL_STATUSES, fetchInProgressForm, setFetchFormStatus, removeInProgressForm } from './actions';

import SignInLink from '../../components/SignInLink';
import ProgressButton from '../components/ProgressButton';

import { toggleLoginModal } from '../../../login/actions';

// For now, this only handles loading errors, but it could feasibly be reworked
//  to handle save errors as well if we need it to.

var SaveInProgressErrorPage = function (_React$Component) {
  _inherits(SaveInProgressErrorPage, _React$Component);

  function SaveInProgressErrorPage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SaveInProgressErrorPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SaveInProgressErrorPage.__proto__ || Object.getPrototypeOf(SaveInProgressErrorPage)).call.apply(_ref, [this].concat(args))), _this), _this.getBackButton = function () {
      var primary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var buttonClass = primary ? 'usa-button-primary' : 'usa-button-secondary';
      return React.createElement(ProgressButton, {
        onButtonClick: _this.goBack,
        buttonClass: buttonClass,
        buttonText: 'Back',
        beforeText: '\xAB' });
    }, _this.goBack = function () {
      _this.props.setFetchFormStatus(LOAD_STATUSES.notAttempted);
      _this.props.router.goBack();
    }, _this.reloadForm = function () {
      // formConfig is put in this.props.routes[length - 1]
      var formConfig = _this.props.route.formConfig;
      if (_this.props.isStartingOver) {
        _this.props.removeInProgressForm(formConfig.formId, formConfig.migrations);
      } else {
        _this.props.fetchInProgressForm(formConfig.formId, formConfig.migrations, _this.props.prefillStatus === PREFILL_STATUSES.pending);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // Reload the form and try again.


  _createClass(SaveInProgressErrorPage, [{
    key: 'render',
    value: function render() {
      var loadedStatus = this.props.loadedStatus;

      var _ref2 = this.props.route.formConfig.savedFormMessages || {},
          noAuth = _ref2.noAuth,
          notFound = _ref2.notFound;

      var content = void 0;

      switch (loadedStatus) {
        case LOAD_STATUSES.noAuth:
          content = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'usa-alert usa-alert-error no-background-image' },
              'You\u2019re signed out of your account. ',
              noAuth
            ),
            React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                { style: { marginTop: '30px' } },
                this.getBackButton(),
                React.createElement(
                  SignInLink,
                  {
                    type: 'button',
                    className: 'usa-button-primary',
                    onLogin: this.reloadForm,
                    isLoggedIn: this.props.isLoggedIn,
                    showLoginModal: this.props.showLoginModal,
                    toggleLoginModal: this.props.toggleLoginModal },
                  'Sign In'
                )
              )
            )
          );
          break;
        case LOAD_STATUSES.failure:
          content = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'usa-alert usa-alert-error no-background-image' },
              'We\u2019re sorry. We\u2019re having some server issues and are working to fix them. Please try applying again in a few moments.'
            ),
            React.createElement(
              'div',
              { style: { marginTop: '30px' } },
              this.getBackButton(),
              React.createElement(
                'button',
                { className: 'usa-button-primary', onClick: this.reloadForm },
                'Continue Your Application'
              )
            )
          );
          break;
        case LOAD_STATUSES.clientFailure:
          content = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'usa-alert usa-alert-error no-background-image' },
              'We\u2019re sorry, but we\u2019re unable to connect to Vets.gov. Please check that you\u2019re connected to the Internet and try again.'
            ),
            React.createElement(
              'div',
              { style: { marginTop: '30px' } },
              this.getBackButton(),
              React.createElement(
                'button',
                { className: 'usa-button-primary', onClick: this.reloadForm },
                'Continue Your Application'
              )
            )
          );
          break;
        case LOAD_STATUSES.invalidData:
          content = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'usa-alert usa-alert-error no-background-image' },
              'We\u2019re sorry. Something went wrong when we tried to access your application. We\u2019re working to fix this. You can try applying again in a few moments or start your application over.'
            ),
            React.createElement(
              'div',
              { style: { marginTop: '30px' } },
              this.getBackButton(),
              React.createElement(
                'button',
                { className: 'usa-button-primary', onClick: this.reloadForm },
                'Continue Your Application'
              )
            )
          );
          break;
        case LOAD_STATUSES.notFound:
          content = React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'usa-alert usa-alert-error no-background-image' },
              'We\u2019re sorry. Something went wrong when we tried to find your application. ',
              notFound
            ),
            React.createElement(
              'div',
              { style: { marginTop: '30px' } },
              this.getBackButton(true)
            )
          )
          // <button className="usa-button-primary" onClick={this.startOver}>Start over</button>
          ;
          break;
        default:
          // Shouldn’t get here...
          content = null;
          break;
      }

      return React.createElement(
        'div',
        null,
        content
      );
    }
  }]);

  return SaveInProgressErrorPage;
}(React.Component);

SaveInProgressErrorPage.propTypes = {
  loadedStatus: PropTypes.string.isRequired,
  savedFormMessages: PropTypes.shape({
    notFound: PropTypes.string,
    noAuth: PropTypes.string
  }),

  isStartingOver: PropTypes.bool.isRequired,
  // For SignInLink
  isLoggedIn: PropTypes.bool.isRequired
};

var mapStateToProps = function mapStateToProps(store) {
  return {
    loadedStatus: store.form.loadedStatus,
    prefillStatus: store.form.prefillStatus,
    isLoggedIn: store.user.login.currentlyLoggedIn,
    showLoginModal: store.user.login.showModal,
    isStartingOver: store.form.isStartingOver
  };
};

var mapDispatchToProps = {
  fetchInProgressForm: fetchInProgressForm,
  removeInProgressForm: removeInProgressForm,
  setFetchFormStatus: setFetchFormStatus,
  toggleLoginModal: toggleLoginModal
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaveInProgressErrorPage));

export { SaveInProgressErrorPage };