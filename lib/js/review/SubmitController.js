'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitController = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _SubmitButtons = require('./SubmitButtons');

var _SubmitButtons2 = _interopRequireDefault(_SubmitButtons);

var _PreSubmitSection = require('../components/PreSubmitSection');

var _validation = require('../validation');

var _helpers = require('../helpers');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubmitController = function (_React$Component) {
  _inherits(SubmitController, _React$Component);

  function SubmitController() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SubmitController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SubmitController.__proto__ || Object.getPrototypeOf(SubmitController)).call.apply(_ref, [this].concat(args))), _this), _this.getPreSubmit = function (formConfig) {
      return _extends({
        required: false,
        field: 'AGREED',
        label: 'I agree to the terms and conditions.',
        error: 'You must accept the agreement before submitting.'
      }, formConfig.preSubmitInfo);
    }, _this.goBack = function () {
      var _this$props = _this.props,
          form = _this$props.form,
          pageList = _this$props.pageList,
          router = _this$props.router;


      var expandedPageList = (0, _helpers.getActiveExpandedPages)(pageList, form.data);

      // TODO: Fix this bug that assumes there is a confirmation page.
      // Actually, it assumes the app also doesn't add routes at the end!
      // A component at this level should not need to know these things!
      router.push(expandedPageList[expandedPageList.length - 2].path);
    }, _this.handleSubmit = function () {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          formConfig = _this$props2.formConfig,
          pagesByChapter = _this$props2.pagesByChapter;

      // If a pre-submit agreement is required, make sure it was accepted

      var preSubmit = _this.getPreSubmit(formConfig);
      if (preSubmit.required && !form.data[preSubmit.field]) {
        _this.props.setSubmission('hasAttemptedSubmit', true);
        // <PreSubmitSection/> is displaying an error for this case
        return;
      }

      // Validation errors in this situation are not visible, so we’d
      // like to know if they’re common

      var _isValidForm = (0, _validation.isValidForm)(form, pagesByChapter),
          isValid = _isValidForm.isValid,
          errors = _isValidForm.errors;

      if (!isValid) {
        var recordEvent = formConfig.recordEvent ? formConfig.recordEvent : console.log.bind(console); // eslint-disable-line no-console

        recordEvent({ event: 'validation-failed-on-submit', errors: errors });
        _this.props.setSubmission('status', 'validationError');
        _this.props.setSubmission('hasAttemptedSubmit', true);
        return;
      }

      // User accepted if required, and no errors, so submit
      _this.props.submitForm(formConfig, form);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SubmitController, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextStatus = nextProps.form.submission.status;
      var previousStatus = this.props.form.submission.status;
      if (nextStatus !== previousStatus && nextStatus === 'applicationSubmitted') {
        var newRoute = nextProps.formConfig.urlPrefix + 'confirmation';
        this.props.router.push(newRoute);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          form = _props.form,
          formConfig = _props.formConfig,
          showPreSubmitError = _props.showPreSubmitError,
          renderErrorMessage = _props.renderErrorMessage;

      var preSubmit = this.getPreSubmit(formConfig);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_PreSubmitSection.PreSubmitSection, {
          preSubmitInfo: preSubmit,
          onChange: function onChange(event) {
            return _this2.props.setPreSubmit(preSubmit.field, event.target.value);
          },
          checked: form.data[preSubmit.field],
          showError: showPreSubmitError }),
        _react2.default.createElement(_SubmitButtons2.default, {
          onBack: this.goBack,
          onSubmit: this.handleSubmit,
          submission: form.submission,
          renderErrorMessage: renderErrorMessage })
      );
    }
  }]);

  return SubmitController;
}(_react2.default.Component);

function mapStateToProps(state, ownProps) {
  var formConfig = ownProps.formConfig,
      pageList = ownProps.pageList,
      renderErrorMessage = ownProps.renderErrorMessage;

  var router = ownProps.router;

  var form = state.form;
  var pagesByChapter = (0, _helpers.createPageListByChapter)(formConfig);
  var submission = form.submission;
  var showPreSubmitError = submission.hasAttemptedSubmit;

  return {
    form: form,
    formConfig: formConfig,
    pagesByChapter: pagesByChapter,
    pageList: pageList,
    renderErrorMessage: renderErrorMessage,
    router: router,
    submission: submission,
    showPreSubmitError: showPreSubmitError
  };
}

var mapDispatchToProps = {
  setPreSubmit: _actions.setPreSubmit,
  setSubmission: _actions.setSubmission,
  submitForm: _actions.submitForm
};

SubmitController.propTypes = {
  form: _propTypes2.default.object.isRequired,
  formConfig: _propTypes2.default.object.isRequired,
  pagesByChapter: _propTypes2.default.object.isRequired,
  pageList: _propTypes2.default.array.isRequired,
  renderErrorMessage: _propTypes2.default.func,
  router: _propTypes2.default.object.isRequired,
  setPreSubmit: _propTypes2.default.func.isRequired,
  setSubmission: _propTypes2.default.func.isRequired,
  submitForm: _propTypes2.default.func.isRequired,
  submission: _propTypes2.default.object.isRequired
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SubmitController));

// for tests

exports.SubmitController = SubmitController;
//# sourceMappingURL=SubmitController.js.map