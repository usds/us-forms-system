var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import FormNav from '../components/FormNav';
import FormTitle from '../components/FormTitle';
import AskVAQuestions from '../components/AskVAQuestions';

var Element = Scroll.Element;

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
      var isConfirmationPage = trimmedPathname.endsWith('confirmation');
      var GetFormHelp = formConfig.getHelp;
      var saveEnabled = !formConfig.disableSave;

      var formTitle = void 0;
      var formNav = void 0;
      var renderedChildren = children;
      if (!isIntroductionPage) {
        // Show nav only if we're not on the intro or confirmation page
        if (!isConfirmationPage) {
          formNav = React.createElement(FormNav, { formData: formData, formConfig: formConfig, currentPath: trimmedPathname });
        }
        // Show title only if we're not on the intro page and if there is a title
        // specified in the form config
        if (formConfig.title) {
          formTitle = React.createElement(FormTitle, { title: formConfig.title, subTitle: formConfig.subTitle });
        }

        renderedChildren = React.createElement(
          'div',
          { className: 'progress-box progress-box-schemaform' },
          children
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'usa-width-two-thirds medium-8 columns' },
            React.createElement(Element, { name: 'topScrollElement' }),
            formTitle,
            formNav,
            renderedChildren
          )
        ),
        !isConfirmationPage && React.createElement(
          AskVAQuestions,
          null,
          !!GetFormHelp && React.createElement(GetFormHelp, null)
        ),
        React.createElement('span', { className: 'js-test-location hidden', 'data-location': trimmedPathname, hidden: true })
      );
    }
  }]);

  return FormApp;
}(React.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    formData: state.form.data
  };
};

export default connect(mapStateToProps)(FormApp);

export { FormApp };