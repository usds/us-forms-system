import _once from 'lodash/fp/once';
import _merge from 'lodash/fp/merge';
import _set from 'lodash/fp/set';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';

import Form from '@department-of-veterans-affairs/react-jsonschema-form';
import { deepEquals } from '@department-of-veterans-affairs/react-jsonschema-form/lib/utils';

import { uiSchemaValidate, transformErrors as _transformErrors } from '../validation';
import { scrollToFirstError } from '../helpers';
import FieldTemplate from './FieldTemplate';
import * as reviewWidgets from '../review/widgets';
import ReviewFieldTemplate from '../review/ReviewFieldTemplate';
import StringField from '../review/StringField';
import widgets from '../widgets/index';
import ObjectField from '../fields/ObjectField';
import ArrayField from '../fields/ArrayField';
import ReadOnlyArrayField from '../review/ReadOnlyArrayField';
import BasicArrayField from '../fields/BasicArrayField';
import TitleField from '../fields/TitleField';
import ReviewObjectField from '../review/ObjectField';

/*
 * Each page uses this component and passes in config. This is where most of the page level
 * form logic should live.
 */

var SchemaForm = function (_React$Component) {
  _inherits(SchemaForm, _React$Component);

  function SchemaForm(props) {
    _classCallCheck(this, SchemaForm);

    var _this = _possibleConstructorReturn(this, (SchemaForm.__proto__ || Object.getPrototypeOf(SchemaForm)).call(this, props));

    _this.validate = _this.validate.bind(_this);
    _this.onError = _this.onError.bind(_this);
    _this.getEmptyState = _this.getEmptyState.bind(_this);
    _this.transformErrors = _this.transformErrors.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.setTouched = _this.setTouched.bind(_this);
    _this.state = _this.getEmptyState(props);
    _this.fields = {
      ObjectField: ObjectField,
      ArrayField: ArrayField,
      BasicArrayField: BasicArrayField,
      TitleField: TitleField
    };

    _this.reviewFields = {
      ObjectField: ReviewObjectField,
      ArrayField: ReadOnlyArrayField,
      BasicArrayField: BasicArrayField,
      address: ReviewObjectField,
      StringField: StringField
    };
    return _this;
  }

  _createClass(SchemaForm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.name !== this.props.name || newProps.pagePerItemIndex !== this.props.pagePerItemIndex) {
        this.setState(this.getEmptyState(newProps));
      } else if (newProps.title !== this.props.title) {
        this.setState({ formContext: _set('pageTitle', newProps.title, this.state.formContext) });
      } else if (!!newProps.reviewMode !== !!this.state.formContext.reviewMode) {
        this.setState(this.getEmptyState(newProps));
      } else if (newProps.formContext !== this.props.formContext) {
        this.setState(this.getEmptyState(newProps));
      }
    }

    /*
     * If we’re in review mode, we can short circuit updating
     * by making sure the schemas are the same and the data
     * displayed on this particular page hasn’t changed
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this2 = this;

      if (nextProps.reviewMode && !nextProps.editModeOnReviewPage && nextProps.reviewMode === this.props.reviewMode && deepEquals(this.state, nextState) && nextProps.schema === this.props.schema && typeof nextProps.title !== 'function' && nextProps.uiSchema === this.props.uiSchema) {
        return !Object.keys(nextProps.schema.properties).every(function (objProp) {
          return _this2.props.data[objProp] === nextProps.data[objProp];
        });
      }

      return true;
    }
  }, {
    key: 'onError',
    value: function onError() {
      var formContext = _set('submitted', true, this.state.formContext);
      this.setState({ formContext: formContext });
      scrollToFirstError();
    }
  }, {
    key: 'onBlur',
    value: function onBlur(id) {
      if (!this.state.formContext.touched[id]) {
        var formContext = _set(['touched', id], true, this.state.formContext);
        this.setState({ formContext: formContext });
      }
    }
  }, {
    key: 'getEmptyState',
    value: function getEmptyState(props) {
      var onEdit = props.onEdit,
          hideTitle = props.hideTitle,
          title = props.title,
          reviewMode = props.reviewMode,
          reviewTitle = props.reviewTitle,
          pagePerItemIndex = props.pagePerItemIndex,
          uploadFile = props.uploadFile,
          hideHeaderRow = props.hideHeaderRow,
          formContext = props.formContext;

      return {
        formContext: Object.assign({
          touched: {},
          submitted: false,
          onEdit: onEdit,
          hideTitle: hideTitle,
          setTouched: this.setTouched,
          reviewTitle: reviewTitle,
          pageTitle: title,
          pagePerItemIndex: pagePerItemIndex,
          reviewMode: reviewMode,
          hideHeaderRow: hideHeaderRow,
          uploadFile: uploadFile
        }, formContext)
      };
    }
  }, {
    key: 'setTouched',
    value: function setTouched(touchedItem, setStateCallback) {
      var touched = _merge(this.state.formContext.touched, touchedItem);
      var formContext = _set('touched', touched, this.state.formContext);
      this.setState({ formContext: formContext }, setStateCallback);
    }

    /*
     * This gets the list of JSON Schema errors whenever validation
     * is run
     */

  }, {
    key: 'transformErrors',
    value: function transformErrors(errors) {
      return _transformErrors(errors, this.props.uiSchema);
    }
  }, {
    key: 'validate',
    value: function validate(formData, errors) {
      var _props = this.props,
          schema = _props.schema,
          uiSchema = _props.uiSchema;

      if (uiSchema) {
        uiSchemaValidate(errors, uiSchema, schema, formData);
      }
      return errors;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          data = _props2.data,
          schema = _props2.schema,
          uiSchema = _props2.uiSchema,
          reviewMode = _props2.reviewMode,
          editModeOnReviewPage = _props2.editModeOnReviewPage,
          children = _props2.children,
          onSubmit = _props2.onSubmit,
          _onChange = _props2.onChange,
          safeRenderCompletion = _props2.safeRenderCompletion;


      var useReviewMode = reviewMode && !editModeOnReviewPage;

      return React.createElement(
        'div',
        null,
        React.createElement(
          Form,
          {
            safeRenderCompletion: safeRenderCompletion,
            FieldTemplate: useReviewMode ? ReviewFieldTemplate : FieldTemplate,
            formContext: this.state.formContext,
            liveValidate: true,
            noHtml5Validate: true,
            onError: this.onError,
            onBlur: this.onBlur,
            onChange: function onChange(_ref) {
              var formData = _ref.formData;
              return _onChange(formData);
            },
            onSubmit: onSubmit,
            schema: schema,
            uiSchema: uiSchema,
            validate: _once(this.validate),
            showErrorList: false,
            formData: data,
            widgets: useReviewMode ? reviewWidgets : widgets,
            fields: useReviewMode ? this.reviewFields : this.fields,
            transformErrors: this.transformErrors },
          children
        )
      );
    }
  }]);

  return SchemaForm;
}(React.Component);

SchemaForm.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  data: PropTypes.any,
  reviewMode: PropTypes.bool,
  editModeOnReviewPage: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  hideTitle: PropTypes.bool
};

export default SchemaForm;