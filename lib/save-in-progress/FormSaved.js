var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import { focusElement } from '../../utils/helpers';
import { fetchInProgressForm, removeInProgressForm } from './actions';
import { formTitles } from '../../../user-profile/helpers';
import FormStartControls from './FormStartControls';

var scroller = Scroll.scroller;
var scrollToTop = function scrollToTop() {
  scroller.scrollTo('topScrollElement', window.VetsGov.scroll || {
    duration: 500,
    delay: 0,
    smooth: true
  });
};

var FormSaved = function (_React$Component) {
  _inherits(FormSaved, _React$Component);

  function FormSaved() {
    _classCallCheck(this, FormSaved);

    return _possibleConstructorReturn(this, (FormSaved.__proto__ || Object.getPrototypeOf(FormSaved)).apply(this, arguments));
  }

  _createClass(FormSaved, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // if we don’t have this then that means we’re loading the page
      // without any data and should just go back to the intro
      if (!this.props.lastSavedDate) {
        this.props.router.replace(this.props.route.pageList[0].path);
      } else {
        scrollToTop();
        focusElement('.usa-alert');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          formId = _props.formId,
          lastSavedDate = _props.lastSavedDate;
      var profile = this.props.user.profile;
      var verified = profile.verified;

      var prefillAvailable = !!(profile && profile.prefillsAvailable.includes(formId));

      var _ref = this.props.route.formConfig.savedFormMessages || {},
          success = _ref.success;

      var expirationDate = moment.unix(this.props.expirationDate).format('M/D/YYYY');

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'usa-alert usa-alert-info' },
          React.createElement(
            'div',
            { className: 'usa-alert-body' },
            React.createElement(
              'strong',
              null,
              'Your ',
              formTitles[formId],
              ' application has been saved.'
            ),
            React.createElement('br', null),
            !!lastSavedDate && !!expirationDate && React.createElement(
              'div',
              { className: 'saved-form-metadata-container' },
              React.createElement(
                'span',
                { className: 'saved-form-metadata' },
                'Last saved on ',
                moment(lastSavedDate).format('M/D/YYYY [at] h:mm a')
              ),
              React.createElement(
                'p',
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
            success,
            'If you\u2019re logged in through a public computer, please sign out of your account before you log off to keep your information secure.'
          )
        ),
        !verified && React.createElement(
          'div',
          { className: 'usa-alert usa-alert-warning' },
          React.createElement(
            'div',
            { className: 'usa-alert-body' },
            'We want to keep your information safe with the highest level of security. Please ',
            React.createElement(
              'a',
              { href: '/verify?next=' + window.location.pathname, className: 'verify-link' },
              'verify your identity'
            ),
            '.'
          )
        ),
        React.createElement('br', null),
        React.createElement(FormStartControls, {
          startPage: this.props.route.pageList[1].path,
          router: this.props.router,
          formId: this.props.formId,
          returnUrl: this.props.returnUrl,
          migrations: this.props.migrations,
          fetchInProgressForm: this.props.fetchInProgressForm,
          removeInProgressForm: this.props.removeInProgressForm,
          prefillAvailable: prefillAvailable,
          formSaved: true })
      );
    }
  }]);

  return FormSaved;
}(React.Component);

FormSaved.propTypes = {
  route: PropTypes.shape({
    pageList: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string
    })),
    formConfig: PropTypes.object.isRequired
  }),
  lastSavedDate: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    formId: state.form.formId,
    returnUrl: state.form.loadedData.metadata.returnUrl,
    lastSavedDate: state.form.lastSavedDate,
    expirationDate: state.form.expirationDate,
    migrations: state.form.migrations,
    user: state.user
  };
}

var mapDispatchToProps = {
  fetchInProgressForm: fetchInProgressForm,
  removeInProgressForm: removeInProgressForm
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormSaved));

export { FormSaved };