'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormPage = undefined;

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ProgressButton = require('../components/ProgressButton');

var _ProgressButton2 = _interopRequireDefault(_ProgressButton);

var _SchemaForm = require('../components/SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _actions = require('../actions');

var _routing = require('../routing');

var _ui = require('../utilities/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function focusForm() {
  (0, _ui.focusElement)('.nav-header');
}

var scroller = _reactScroll2.default.scroller;
var scrollToTop = function scrollToTop() {
  scroller.scrollTo('topScrollElement', window.Forms.scroll || {
    duration: 500,
    delay: 0,
    smooth: true
  });
};

var FormPage = function (_React$Component) {
  _inherits(FormPage, _React$Component);

  function FormPage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormPage.__proto__ || Object.getPrototypeOf(FormPage)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (formData) {
      var newData = formData;
      if (_this.props.route.pageConfig.showPagePerItem) {
        // If this is a per item page, the formData object will have data for a particular
        // row in an array, so we need to update the full form data object and then call setData
        newData = (0, _set3.default)([_this.props.route.pageConfig.arrayPath, _this.props.params.index], formData, _this.props.form.data);
      }
      _this.props.setData(newData);
    }, _this.onSubmit = function (_ref2) {
      var formData = _ref2.formData;
      var _this$props = _this.props,
          form = _this$props.form,
          params = _this$props.params,
          route = _this$props.route,
          location = _this$props.location;

      // This makes sure defaulted data on a page with no changes is saved
      // Probably safe to do this for regular pages, too, but it hasn’t been necessary

      if (route.pageConfig.showPagePerItem) {
        var newData = (0, _set3.default)([route.pageConfig.arrayPath, params.index], formData, form.data);
        _this.props.setData(newData);
      }

      var path = (0, _routing.getNextPagePath)(route.pageList, form.data, location.pathname);

      _this.props.router.push(path);
    }, _this.goBack = function () {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          pageList = _this$props2.route.pageList,
          location = _this$props2.location;

      var path = (0, _routing.getPreviousPagePath)(pageList, form.data, location.pathname);

      _this.props.router.push(path);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.blockScrollOnMount) {
        scrollToTop();
        focusForm();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.route.pageConfig.pageKey !== this.props.route.pageConfig.pageKey || (0, _get3.default)('params.index', prevProps) !== (0, _get3.default)('params.index', this.props)) {
        scrollToTop();
        focusForm();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          route = _props.route,
          params = _props.params,
          form = _props.form,
          contentAfterButtons = _props.contentAfterButtons,
          formContext = _props.formContext;
      var hideNavArrows = route.hideNavArrows;
      var _form$pages$route$pag = form.pages[route.pageConfig.pageKey],
          schema = _form$pages$route$pag.schema,
          uiSchema = _form$pages$route$pag.uiSchema;


      var pageClasses = (0, _classnames2.default)('form-panel', route.pageConfig.pageClass);
      var data = form.data;

      if (route.pageConfig.showPagePerItem) {
        // Instead of passing through the schema/uiSchema to SchemaForm, the
        // current item schema for the array at arrayPath is pulled out of the page state and passed
        schema = schema.properties[route.pageConfig.arrayPath].items[params.index];
        // Similarly, the items uiSchema and the data for just that particular item are passed
        uiSchema = uiSchema[route.pageConfig.arrayPath].items;
        // And the data should be for just the item in the array
        data = (0, _get3.default)([route.pageConfig.arrayPath, params.index], data);
      }
      // It should be "safe" to check that this is the first page because it is
      // always eligible and enabled, no need to call getPreviousPagePath.
      var isFirstRoutePage = route.pageList[0].path === this.props.location.pathname;

      return _react2.default.createElement(
        'div',
        { className: pageClasses },
        _react2.default.createElement(
          _SchemaForm2.default,
          {
            name: route.pageConfig.pageKey,
            title: route.pageConfig.title,
            data: data,
            schema: schema,
            uiSchema: uiSchema,
            pagePerItemIndex: params ? params.index : undefined,
            formContext: formContext,
            uploadFile: this.props.uploadFile,
            onChange: this.onChange,
            onSubmit: this.onSubmit },
          _react2.default.createElement(
            'div',
            { className: 'row form-progress-buttons schemaform-buttons' },
            _react2.default.createElement(
              'div',
              { className: 'small-6 medium-5 columns' },
              !isFirstRoutePage && _react2.default.createElement(_ProgressButton2.default, {
                onButtonClick: this.goBack,
                buttonText: 'Back',
                buttonClass: 'usa-button-secondary',
                beforeText: hideNavArrows ? '' : '«' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'small-6 medium-5 end columns' },
              _react2.default.createElement(_ProgressButton2.default, {
                submitButton: true,
                buttonText: 'Continue',
                buttonClass: 'usa-button-primary',
                afterText: hideNavArrows ? '' : '»' })
            )
          ),
          contentAfterButtons
        )
      );
    }
  }]);

  return FormPage;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    form: state.form,
    user: state.user
  };
}

var mapDispatchToProps = {
  setData: _actions.setData,
  uploadFile: _actions.uploadFile
};

FormPage.propTypes = {
  form: _propTypes2.default.object.isRequired,
  route: _propTypes2.default.shape({
    pageConfig: _propTypes2.default.shape({
      pageKey: _propTypes2.default.string.isRequired,
      schema: _propTypes2.default.object.isRequired,
      uiSchema: _propTypes2.default.object.isRequired
    }),
    pageList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      path: _propTypes2.default.string.isRequired
    }))
  }),
  contentAfterButtons: _propTypes2.default.element,
  setData: _propTypes2.default.func
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FormPage));
exports.FormPage = FormPage;
//# sourceMappingURL=FormPage.js.map