import _set from 'lodash/fp/set';
import _get from 'lodash/fp/get';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Scroll from 'react-scroll';

import classNames from 'classnames';

import ProgressButton from '@department-of-veterans-affairs/formation/ProgressButton';

import SchemaForm from '../components/SchemaForm';
import { setData, uploadFile } from '../actions';
import { getNextPagePath, getPreviousPagePath } from '../routing';
import { focusElement } from '../utilities/ui';

function focusForm() {
  focusElement('.nav-header');
}

var scroller = Scroll.scroller;
var scrollToTop = function scrollToTop() {
  scroller.scrollTo('topScrollElement', window.VetsGov.scroll || {
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
        newData = _set([_this.props.route.pageConfig.arrayPath, _this.props.params.index], formData, _this.props.form.data);
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
        var newData = _set([route.pageConfig.arrayPath, params.index], formData, form.data);
        _this.props.setData(newData);
      }

      var path = getNextPagePath(route.pageList, form.data, location.pathname);

      _this.props.router.push(path);
    }, _this.goBack = function () {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          pageList = _this$props2.route.pageList,
          location = _this$props2.location;

      var path = getPreviousPagePath(pageList, form.data, location.pathname);

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
      if (prevProps.route.pageConfig.pageKey !== this.props.route.pageConfig.pageKey || _get('params.index', prevProps) !== _get('params.index', this.props)) {
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
      var _form$pages$route$pag = form.pages[route.pageConfig.pageKey],
          schema = _form$pages$route$pag.schema,
          uiSchema = _form$pages$route$pag.uiSchema;


      var pageClasses = classNames('form-panel', route.pageConfig.pageClass);
      var data = form.data;

      if (route.pageConfig.showPagePerItem) {
        // Instead of passing through the schema/uiSchema to SchemaForm, the
        // current item schema for the array at arrayPath is pulled out of the page state and passed
        schema = schema.properties[route.pageConfig.arrayPath].items[params.index];
        // Similarly, the items uiSchema and the data for just that particular item are passed
        uiSchema = uiSchema[route.pageConfig.arrayPath].items;
        // And the data should be for just the item in the array
        data = _get([route.pageConfig.arrayPath, params.index], data);
      }

      return React.createElement(
        'div',
        { className: pageClasses },
        React.createElement(
          SchemaForm,
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
          React.createElement(
            'div',
            { className: 'row form-progress-buttons schemaform-buttons' },
            React.createElement(
              'div',
              { className: 'small-6 medium-5 columns' },
              React.createElement(ProgressButton, {
                onButtonClick: this.goBack,
                buttonText: 'Back',
                buttonClass: 'usa-button-secondary',
                beforeText: '\xAB' })
            ),
            React.createElement(
              'div',
              { className: 'small-6 medium-5 end columns' },
              React.createElement(ProgressButton, {
                submitButton: true,
                buttonText: 'Continue',
                buttonClass: 'usa-button-primary',
                afterText: '\xBB' })
            )
          ),
          contentAfterButtons
        )
      );
    }
  }]);

  return FormPage;
}(React.Component);

function mapStateToProps(state) {
  return {
    form: state.form,
    user: state.user
  };
}

var mapDispatchToProps = {
  setData: setData,
  uploadFile: uploadFile
};

FormPage.propTypes = {
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
  contentAfterButtons: PropTypes.element,
  setData: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormPage));

export { FormPage };