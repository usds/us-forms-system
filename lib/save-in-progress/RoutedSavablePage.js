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


import SaveFormLink from './SaveFormLink';
import SaveStatus from './SaveStatus';
import { setData, uploadFile } from '../actions';
import { saveErrors, autoSaveForm, saveAndRedirectToReturnUrl } from './actions';
import { getFormContext } from './selectors';
import { toggleLoginModal } from '../../../login/actions';
import { FormPage } from '../containers/FormPage';

var RoutedSavablePage = function (_React$Component) {
  _inherits(RoutedSavablePage, _React$Component);

  function RoutedSavablePage(props) {
    _classCallCheck(this, RoutedSavablePage);

    var _this = _possibleConstructorReturn(this, (RoutedSavablePage.__proto__ || Object.getPrototypeOf(RoutedSavablePage)).call(this, props));

    _this.onChange = function (formData) {
      _this.props.setData(formData);
      _this.debouncedAutoSave();
    };

    _this.debouncedAutoSave = _debounce(1000, _this.autoSave);
    return _this;
  }

  _createClass(RoutedSavablePage, [{
    key: 'autoSave',
    value: function autoSave() {
      var _props = this.props,
          form = _props.form,
          user = _props.user;

      if (user.login.currentlyLoggedIn) {
        var data = form.data;
        var formId = form.formId,
            version = form.version;

        var returnUrl = this.props.location.pathname;

        this.props.autoSaveForm(formId, data, version, returnUrl);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          user = _props2.user,
          form = _props2.form;

      var contentAfterButtons = React.createElement(
        'div',
        null,
        React.createElement(SaveStatus, {
          isLoggedIn: user.login.currentlyLoggedIn,
          showLoginModal: user.login.showModal,
          toggleLoginModal: this.props.toggleLoginModal,
          form: form }),
        React.createElement(SaveFormLink, {
          locationPathname: this.props.location.pathname,
          form: form,
          user: user,
          saveAndRedirectToReturnUrl: this.props.saveAndRedirectToReturnUrl,
          toggleLoginModal: this.props.toggleLoginModal })
      );

      return React.createElement(FormPage, _extends({}, this.props, {
        blockScrollOnMount: saveErrors.has(form.savedStatus),
        setData: this.onChange,
        formContext: getFormContext({ user: user, form: form }),
        contentAfterButtons: contentAfterButtons }));
    }
  }]);

  return RoutedSavablePage;
}(React.Component);

function mapStateToProps(state) {
  return {
    form: state.form,
    user: state.user
  };
}

var mapDispatchToProps = {
  setData: setData,
  saveAndRedirectToReturnUrl: saveAndRedirectToReturnUrl,
  autoSaveForm: autoSaveForm,
  toggleLoginModal: toggleLoginModal,
  uploadFile: uploadFile
};

RoutedSavablePage.propTypes = {
  form: PropTypes.object.isRequired,
  route: PropTypes.shape({
    pageConfig: PropTypes.shape({
      pageKey: PropTypes.string.isRequired,
      schema: PropTypes.object.isRequired,
      uiSchema: PropTypes.object.isRequired
    }),
    pageList: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired
    }))
  }),
  setData: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutedSavablePage));

export { RoutedSavablePage };