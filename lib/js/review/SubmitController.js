'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmitController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ravenJs = require('raven-js');

var _ravenJs2 = _interopRequireDefault(_ravenJs);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SubmitController.__proto__ || Object.getPrototypeOf(SubmitController)).call.apply(_ref, [this].concat(args))), _this), _this.goBack = function () {
      var _this$props = _this.props,
          form = _this$props.form,
          pageList = _this$props.pageList,
          router = _this$props.router;


      var expandedPageList = (0, _helpers.getActiveExpandedPages)(pageList, form.data);

      router.push(expandedPageList[expandedPageList.length - 2].path);
    }, _this.handleSubmit = function () {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          formConfig = _this$props2.formConfig,
          pagesByChapter = _this$props2.pagesByChapter,
          trackingPrefix = _this$props2.trackingPrefix;


      var isValid = void 0;
      var errors = void 0;

      // If a pre-submit agreement was specified, it has to be accepted first
      var preSubmitField = formConfig.preSubmitInfo && formConfig.preSubmitInfo.required && (formConfig.preSubmitInfo.field || 'AGREED');
      if (preSubmitField && !form.data[preSubmitField]) {
        isValid = false;
      } else {
        var _isValidForm = (0, _validation.isValidForm)(form, pagesByChapter);

        isValid = _isValidForm.isValid;
        errors = _isValidForm.errors;
      }

      if (isValid) {
        _this.props.submitForm(formConfig, form);
      } else {
        // validation errors in this situation are not visible, so we’d
        // like to know if they’re common
        if (preSubmitField && form.data[preSubmitField]) {
          (0, _helpers.recordEvent)({
            event: trackingPrefix + '-validation-failed'
          });
          _ravenJs2.default.captureMessage('Validation issue not displayed', {
            extra: {
              errors: errors,
              prefix: trackingPrefix
            }
          });
          _this.props.setSubmission('status', 'validationError');
        }
        _this.props.setSubmission('hasAttemptedSubmit', true);
      }
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
          renderErrorMessage = _props.renderErrorMessage,
          submission = _props.submission;

      return _react2.default.createElement(
        'div',
        null,
        this.preSubmitInfo && _react2.default.createElement(_PreSubmitSection.PreSubmitSection, {
          required: true,
          preSubmitInfo: formConfig.preSubmitInfo,
          onChange: function onChange() {
            return _this2.props.setPreSubmit(formConfig.preSubmitInfo.field, _this2.value);
          },
          form: form,
          showError: showPreSubmitError }),
        _react2.default.createElement(_SubmitButtons2.default, {
          onBack: this.goBack,
          onSubmit: this.handleSubmit,
          submission: submission,
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
  var trackingPrefix = formConfig.trackingPrefix;
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
    showPreSubmitError: showPreSubmitError,
    trackingPrefix: trackingPrefix
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
  submission: _propTypes2.default.object.isRequired,
  trackingPrefix: _propTypes2.default.string.isRequired
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SubmitController));

// for tests

exports.SubmitController = SubmitController;
//# sourceMappingURL=SubmitController.js.map