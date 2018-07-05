'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _once2 = require('lodash/fp/once');

var _once3 = _interopRequireDefault(_once2);

var _merge2 = require('lodash/fp/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJsonschemaForm = require('@department-of-veterans-affairs/react-jsonschema-form');

var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

var _validation = require('../validation');

var _FieldTemplate = require('./FieldTemplate');

var _FieldTemplate2 = _interopRequireDefault(_FieldTemplate);

var _widgets = require('../review/widgets');

var reviewWidgets = _interopRequireWildcard(_widgets);

var _ReviewFieldTemplate = require('../review/ReviewFieldTemplate');

var _ReviewFieldTemplate2 = _interopRequireDefault(_ReviewFieldTemplate);

var _StringField = require('../review/StringField');

var _StringField2 = _interopRequireDefault(_StringField);

var _index = require('../widgets/index');

var _index2 = _interopRequireDefault(_index);

var _ObjectField = require('../fields/ObjectField');

var _ObjectField2 = _interopRequireDefault(_ObjectField);

var _ArrayField = require('../fields/ArrayField');

var _ArrayField2 = _interopRequireDefault(_ArrayField);

var _ReadOnlyArrayField = require('../review/ReadOnlyArrayField');

var _ReadOnlyArrayField2 = _interopRequireDefault(_ReadOnlyArrayField);

var _BasicArrayField = require('../fields/BasicArrayField');

var _BasicArrayField2 = _interopRequireDefault(_BasicArrayField);

var _TitleField = require('../fields/TitleField');

var _TitleField2 = _interopRequireDefault(_TitleField);

var _ObjectField3 = require('../review/ObjectField');

var _ObjectField4 = _interopRequireDefault(_ObjectField3);

var _ui = require('../utilities/ui');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      ObjectField: _ObjectField2.default,
      ArrayField: _ArrayField2.default,
      BasicArrayField: _BasicArrayField2.default,
      TitleField: _TitleField2.default
    };

    _this.reviewFields = {
      ObjectField: _ObjectField4.default,
      ArrayField: _ReadOnlyArrayField2.default,
      BasicArrayField: _BasicArrayField2.default,
      address: _ObjectField4.default,
      StringField: _StringField2.default
    };
    return _this;
  }

  _createClass(SchemaForm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.name !== this.props.name || newProps.pagePerItemIndex !== this.props.pagePerItemIndex) {
        this.setState(this.getEmptyState(newProps));
      } else if (newProps.title !== this.props.title) {
        this.setState({ formContext: (0, _set3.default)('pageTitle', newProps.title, this.state.formContext) });
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

      if (nextProps.reviewMode && !nextProps.editModeOnReviewPage && nextProps.reviewMode === this.props.reviewMode && (0, _utils.deepEquals)(this.state, nextState) && nextProps.schema === this.props.schema && typeof nextProps.title !== 'function' && nextProps.uiSchema === this.props.uiSchema) {
        return !Object.keys(nextProps.schema.properties).every(function (objProp) {
          return _this2.props.data[objProp] === nextProps.data[objProp];
        });
      }

      return true;
    }
  }, {
    key: 'onError',
    value: function onError() {
      var formContext = (0, _set3.default)('submitted', true, this.state.formContext);
      this.setState({ formContext: formContext });
      (0, _ui.scrollToFirstError)();
    }
  }, {
    key: 'onBlur',
    value: function onBlur(id) {
      if (!this.state.formContext.touched[id]) {
        var formContext = (0, _set3.default)(['touched', id], true, this.state.formContext);
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
          uploadFile: uploadFile,
          onError: this.onError
        }, formContext)
      };
    }
  }, {
    key: 'setTouched',
    value: function setTouched(touchedItem, setStateCallback) {
      var touched = (0, _merge3.default)(this.state.formContext.touched, touchedItem);
      var formContext = (0, _set3.default)('touched', touched, this.state.formContext);
      this.setState({ formContext: formContext }, setStateCallback);
    }

    /*
     * This gets the list of JSON Schema errors whenever validation
     * is run
     */

  }, {
    key: 'transformErrors',
    value: function transformErrors(errors) {
      return (0, _validation.transformErrors)(errors, this.props.uiSchema);
    }
  }, {
    key: 'validate',
    value: function validate(formData, errors) {
      var _props = this.props,
          schema = _props.schema,
          uiSchema = _props.uiSchema;

      if (uiSchema) {
        (0, _validation.uiSchemaValidate)(errors, uiSchema, schema, formData);
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

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactJsonschemaForm2.default,
          {
            safeRenderCompletion: safeRenderCompletion,
            FieldTemplate: useReviewMode ? _ReviewFieldTemplate2.default : _FieldTemplate2.default,
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
            validate: (0, _once3.default)(this.validate),
            showErrorList: false,
            formData: data,
            widgets: useReviewMode ? reviewWidgets : _index2.default,
            fields: useReviewMode ? this.reviewFields : this.fields,
            transformErrors: this.transformErrors },
          children
        )
      );
    }
  }]);

  return SchemaForm;
}(_react2.default.Component);

SchemaForm.propTypes = {
  name: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
  schema: _propTypes2.default.object.isRequired,
  uiSchema: _propTypes2.default.object.isRequired,
  data: _propTypes2.default.any,
  reviewMode: _propTypes2.default.bool,
  editModeOnReviewPage: _propTypes2.default.bool,
  onSubmit: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  hideTitle: _propTypes2.default.bool
};

exports.default = SchemaForm;
//# sourceMappingURL=SchemaForm.js.map