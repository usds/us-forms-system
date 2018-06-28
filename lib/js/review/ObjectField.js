'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _values2 = require('lodash/fp/values');

var _values3 = _interopRequireDefault(_values2);

var _groupBy2 = require('lodash/fp/groupBy');

var _groupBy3 = _interopRequireDefault(_groupBy2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _flow2 = require('lodash/fp/flow');

var _flow3 = _interopRequireDefault(_flow2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * This is largely copied from the react-jsonschema-form library,
 * but with the way descriptions are used changed
 */

var ObjectField = function (_React$Component) {
  _inherits(ObjectField, _React$Component);

  function ObjectField() {
    _classCallCheck(this, ObjectField);

    var _this = _possibleConstructorReturn(this, (ObjectField.__proto__ || Object.getPrototypeOf(ObjectField)).call(this));

    _this.isRequired = _this.isRequired.bind(_this);
    _this.orderAndFilterProperties = (0, _flow3.default)(function (properties) {
      return (0, _utils.orderProperties)(properties, (0, _get3.default)('ui:order', _this.props.uiSchema));
    }, (0, _groupBy3.default)(function (item) {
      var expandUnderField = (0, _get3.default)([item, 'ui:options', 'expandUnder'], _this.props.uiSchema);
      return expandUnderField || item;
    }), _values3.default);
    return _this;
  }

  _createClass(ObjectField, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: 'onPropertyChange',
    value: function onPropertyChange(name) {
      var _this2 = this;

      return function (value) {
        var formData = Object.keys(_this2.props.formData || {}).length ? _this2.props.formData : (0, _utils.getDefaultFormState)(_this2.props.schema, undefined, _this2.props.registry.definitions);
        _this2.props.onChange((0, _set3.default)(name, value, formData));
      };
    }
  }, {
    key: 'getStateFromProps',
    value: function getStateFromProps(props) {
      var schema = props.schema,
          formData = props.formData,
          registry = props.registry;

      return (0, _utils.getDefaultFormState)(schema, formData, registry.definitions) || {};
    }
  }, {
    key: 'isRequired',
    value: function isRequired(name) {
      var schema = this.props.schema;
      return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          uiSchema = _props.uiSchema,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          schema = _props.schema,
          formContext = _props.formContext;

      var SchemaField = this.props.registry.fields.SchemaField;

      var properties = Object.keys(schema.properties);
      var isRoot = idSchema.$id === 'root';
      var formData = this.props.formData || {};

      var renderField = function renderField(propName) {
        return _react2.default.createElement(SchemaField, { key: propName,
          name: propName,
          schema: schema.properties[propName],
          uiSchema: uiSchema[propName],
          errorSchema: errorSchema[propName],
          idSchema: idSchema[propName],
          onChange: _this3.onPropertyChange(propName),
          onBlur: _this3.props.onBlur,
          required: _this3.isRequired(propName),
          formData: formData[propName],
          registry: _this3.props.registry });
      };

      var showField = function showField(propName) {
        var hiddenOnSchema = schema.properties[propName]['ui:hidden'];
        var collapsedOnSchema = schema.properties[propName]['ui:collapsed'];
        var hideOnReviewIfFalse = (0, _get3.default)([propName, 'ui:options', 'hideOnReviewIfFalse'], uiSchema) === true;
        var hideOnReview = (0, _get3.default)([propName, 'ui:options', 'hideOnReview'], uiSchema) === true;
        return (!hideOnReviewIfFalse || !!formData[propName]) && !hideOnReview && !hiddenOnSchema && !collapsedOnSchema;
      };

      var renderedProperties = this.orderAndFilterProperties(properties).map(function (objectFields, index) {
        var _objectFields = _toArray(objectFields),
            first = _objectFields[0],
            rest = _objectFields.slice(1);
        // expand under functionality is controlled in the reducer by setting ui:collapsed, so
        // we can check if its expanded by seeing if there are any visible "children"


        var visible = rest.filter(function (prop) {
          return !(0, _get3.default)(['properties', prop, 'ui:collapsed'], schema);
        });
        if (objectFields.length > 1 && visible.length > 0) {
          return objectFields.filter(showField).map(renderField);
        }
        return showField(first) ? renderField(first, index) : null;
      });

      if (isRoot) {
        var title = formContext.pageTitle;
        if (!formContext.hideTitle && typeof title === 'function') {
          title = title(formData, formContext);
        }
        return _react2.default.createElement(
          'div',
          null,
          !formContext.hideHeaderRow && _react2.default.createElement(
            'div',
            { className: 'form-review-panel-page-header-row' },
            _react2.default.createElement(
              'h5',
              { className: 'form-review-panel-page-header' },
              !formContext.hideTitle ? title : null
            ),
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'edit-btn primary-outline', onClick: function onClick() {
                  return formContext.onEdit();
                } },
              'Edit'
            )
          ),
          _react2.default.createElement(
            'dl',
            { className: 'review' },
            renderedProperties
          )
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        renderedProperties
      );
    }
  }]);

  return ObjectField;
}(_react2.default.Component);

ObjectField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  registry: (0, _utils.getDefaultRegistry)(),
  required: false,
  disabled: false,
  readonly: false
};


ObjectField.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  uiSchema: _propTypes2.default.object,
  errorSchema: _propTypes2.default.object,
  idSchema: _propTypes2.default.object,
  formData: _propTypes2.default.object,
  required: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  registry: _propTypes2.default.shape({
    widgets: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object])).isRequired,
    fields: _propTypes2.default.objectOf(_propTypes2.default.func).isRequired,
    definitions: _propTypes2.default.object.isRequired,
    formContext: _propTypes2.default.object.isRequired
  })
};

exports.default = ObjectField;
//# sourceMappingURL=ObjectField.js.map