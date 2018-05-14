var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import ProgressButton from '../components/ProgressButton';
import Modal from '../components/Modal';

var FormStartControls = function (_React$Component) {
  _inherits(FormStartControls, _React$Component);

  function FormStartControls(props) {
    _classCallCheck(this, FormStartControls);

    var _this = _possibleConstructorReturn(this, (FormStartControls.__proto__ || Object.getPrototypeOf(FormStartControls)).call(this, props));

    _this.componentWillReceiveProps = function (newProps) {
      if (!_this.props.returnUrl && newProps.returnUrl) {
        // Navigate to the last page they were on
        _this.props.router.push(newProps.returnUrl);
      }
    };

    _this.goToBeginning = function () {
      _this.props.router.push(_this.props.startPage);
    };

    _this.handleLoadPrefill = function () {
      if (_this.props.prefillAvailable) {
        _this.props.fetchInProgressForm(_this.props.formId, _this.props.migrations, true, _this.props.prefillTransformer);
      } else {
        _this.goToBeginning();
      }
    };

    _this.handleLoadForm = function () {
      // If successful, this will set form.loadedData.metadata.returnUrl and will
      //  trickle down to this.props to be caught in componentWillReceiveProps
      _this.props.fetchInProgressForm(_this.props.formId, _this.props.migrations);
    };

    _this.toggleModal = function () {
      _this.setState({ modalOpen: !_this.state.modalOpen });
    };

    _this.startOver = function () {
      _this.toggleModal();
      _this.props.removeInProgressForm(_this.props.formId, _this.props.migrations);
    };

    _this.state = { modalOpen: false };
    return _this;
  }

  _createClass(FormStartControls, [{
    key: 'render',
    value: function render() {

      if (this.props.formSaved) {
        return React.createElement(
          'div',
          null,
          React.createElement(ProgressButton, {
            onButtonClick: this.handleLoadForm,
            buttonText: 'Continue Your Application',
            buttonClass: 'usa-button-primary no-text-transform' }),
          !this.props.resumeOnly && React.createElement(ProgressButton, {
            onButtonClick: this.toggleModal,
            buttonText: 'Start Over',
            buttonClass: 'usa-button-secondary' }),
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
              onButtonClick: this.startOver,
              buttonText: 'Start Over',
              buttonClass: 'usa-button-primary' }),
            React.createElement(ProgressButton, {
              onButtonClick: this.toggleModal,
              buttonText: 'Cancel',
              buttonClass: 'usa-button-secondary' })
          )
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement(ProgressButton, {
          onButtonClick: this.handleLoadPrefill,
          buttonText: this.props.startText || 'Get Started',
          buttonClass: 'usa-button-primary schemaform-start-button',
          afterText: '\xBB' })
      );
    }
  }]);

  return FormStartControls;
}(React.Component);

FormStartControls.propTypes = {
  formId: PropTypes.string.isRequired,
  migrations: PropTypes.array,
  returnUrl: PropTypes.string,
  fetchInProgressForm: PropTypes.func.isRequired,
  removeInProgressForm: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  formSaved: PropTypes.bool.isRequired,
  prefillAvailable: PropTypes.bool.isRequired,
  startPage: PropTypes.string.isRequired,
  startText: PropTypes.string,
  resumeOnly: PropTypes.bool
};

export default withRouter(FormStartControls);

export { FormStartControls };