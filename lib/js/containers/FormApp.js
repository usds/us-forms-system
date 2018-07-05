'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormApp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _FormNav = require('../components/FormNav');

var _FormNav2 = _interopRequireDefault(_FormNav);

var _FormTitle = require('../components/FormTitle');

var _FormTitle2 = _interopRequireDefault(_FormTitle);

var _helpers = require('../helpers');

var _ui = require('../utilities/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = _reactScroll2.default.Element;

/*
 * Primary component for a schema generated form app.
 */

var FormApp = function (_React$Component) {
  _inherits(FormApp, _React$Component);

  function FormApp() {
    _classCallCheck(this, FormApp);

    return _possibleConstructorReturn(this, (FormApp.__proto__ || Object.getPrototypeOf(FormApp)).apply(this, arguments));
  }

  _createClass(FormApp, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _ui.setGlobalScroll)();

      if (window.History) {
        window.History.scrollRestoration = 'manual';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocation = _props.currentLocation,
          formConfig = _props.formConfig,
          children = _props.children,
          formData = _props.formData;

      var trimmedPathname = currentLocation.pathname.replace(/\/$/, '');
      var isIntroductionPage = trimmedPathname.endsWith('introduction');
      var Footer = formConfig.footerContent;

      var formTitle = void 0;
      var formNav = void 0;
      var renderedChildren = children;
      if (!isIntroductionPage) {
        // Show title only if we're not on the intro page and if there is a title
        // specified in the form config
        if (formConfig.title) {
          formTitle = _react2.default.createElement(_FormTitle2.default, { title: formConfig.title, subTitle: formConfig.subTitle });
        }
      }

      // Show nav only if we're not on the intro, form-saved, error, or confirmation page
      // Also add form classes only if on an actual form page
      if ((0, _helpers.isInProgress)(trimmedPathname)) {
        formNav = _react2.default.createElement(_FormNav2.default, { formData: formData, formConfig: formConfig, currentPath: trimmedPathname });

        renderedChildren = _react2.default.createElement(
          'div',
          { className: 'progress-box progress-box-schemaform' },
          children
        );
      }

      var footer = void 0;
      if (Footer) {
        footer = _react2.default.createElement(Footer, {
          formConfig: formConfig,
          currentLocation: currentLocation });
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'usa-width-two-thirds medium-8 columns' },
            _react2.default.createElement(Element, { name: 'topScrollElement' }),
            formTitle,
            formNav,
            renderedChildren
          )
        ),
        footer,
        _react2.default.createElement('span', { className: 'js-test-location hidden', 'data-location': trimmedPathname, hidden: true })
      );
    }
  }]);

  return FormApp;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    formData: state.form.data
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FormApp);
exports.FormApp = FormApp;
//# sourceMappingURL=FormApp.js.map