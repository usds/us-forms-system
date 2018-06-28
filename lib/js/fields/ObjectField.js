'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values2 = require('lodash/fp/values');

var _values3 = _interopRequireDefault(_values2);

var _groupBy2 = require('lodash/fp/groupBy');

var _groupBy3 = _interopRequireDefault(_groupBy2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

var _ExpandingGroup = require('../components/ExpandingGroup');

var _ExpandingGroup2 = _interopRequireDefault(_ExpandingGroup);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * This is largely copied from the react-jsonschema-form library,
 * but with the way descriptions are used changed
 */

/*
 * Add a first field class to the first actual field on the page
 * and on any "blocks", which are titled sections of the page
 */
function setFirstFields(id) {
  if (id === 'root') {
    var containers = [document].concat(Array.from(document.querySelectorAll('.schemaform-block')));
    containers.forEach(function (block) {
      var fields = Array.from(block.querySelectorAll('.form-checkbox,.schemaform-field-template'));
      if (fields.length) {
        fields[0].classList.add('schemaform-first-field');
      }
    });
  }
}

var ObjectField = function (_React$Component) {
  _inherits(ObjectField, _React$Component);

  function ObjectField(props) {
    _classCallCheck(this, ObjectField);

    var _this = _possibleConstructorReturn(this, (ObjectField.__proto__ || Object.getPrototypeOf(ObjectField)).call(this, props));

    _this.state = _this.getStateFromProps(props);
    _this.onPropertyChange = _this.onPropertyChange.bind(_this);
    _this.onPropertyBlur = _this.onPropertyBlur.bind(_this);
    _this.isRequired = _this.isRequired.bind(_this);
    _this.SchemaField = (0, _helpers.pureWithDeepEquals)(_this.props.registry.fields.SchemaField);
    _this.orderedProperties = _this.orderAndFilterProperties(props.schema, props.uiSchema);
    return _this;
  }

  _createClass(ObjectField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      setFirstFields(this.props.idSchema.$id);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.schema !== nextProps.schema || this.props.uiSchema !== nextProps.uiSchema) {
        this.orderedProperties = this.orderAndFilterProperties(nextProps.schema, nextProps.uiSchema);
      }
    }

    /*
     * This is a performance optimization to avoid extra renders. Because we mirror
     * formData in local state, each form data change will trigger two renders: one when
     * local state is updated and another when that change is reflected in formData. This check
     * skips the second render if no other props or state has changed
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _utils.deepEquals)(this.props, nextProps);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      setFirstFields(this.props.idSchema.$id);
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
    key: 'onPropertyBlur',
    value: function onPropertyBlur(name) {
      var _this3 = this;

      return function () {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _this3.props.onBlur([name].concat(path));
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

    // This runs a series of steps that order properties and then group them into
    // expandable groups. If there are no expandable groups, then the end result of this
    // will be an array of single item arrays

  }, {
    key: 'orderAndFilterProperties',
    value: function orderAndFilterProperties(schema, uiSchema) {
      var properties = Object.keys(schema.properties);
      var orderedProperties = (0, _utils.orderProperties)(properties, (0, _get3.default)('ui:order', uiSchema));
      var filteredProperties = orderedProperties.filter(function (prop) {
        return !schema.properties[prop]['ui:hidden'];
      });
      var groupedProperties = (0, _groupBy3.default)(function (item) {
        var expandUnderField = (0, _get3.default)([item, 'ui:options', 'expandUnder'], uiSchema);
        return expandUnderField || item;
      }, filteredProperties);

      return (0, _values3.default)(groupedProperties);
    }
  }, {
    key: 'isRequired',
    value: function isRequired(name) {
      var schema = this.props.schema;

      var schemaRequired = Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;

      if (schemaRequired) {
        return schemaRequired;
      }

      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          uiSchema = _props.uiSchema,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          schema = _props.schema,
          required = _props.required,
          disabled = _props.disabled,
          readonly = _props.readonly,
          onBlur = _props.onBlur;
      var _props$registry = this.props.registry,
          definitions = _props$registry.definitions,
          fields = _props$registry.fields,
          formContext = _props$registry.formContext;
      var TitleField = fields.TitleField;

      var SchemaField = this.SchemaField;
      var formData = Object.keys(this.props.formData || {}).length ? this.props.formData : (0, _utils.getDefaultFormState)(schema, {}, definitions);
      var uiOptions = uiSchema['ui:options'] || {};

      // description and title setup
      var showFieldLabel = uiOptions.showFieldLabel;
      var fieldsetClassNames = uiOptions.classNames;
      var title = uiSchema['ui:title'] || schema.title;
      var CustomTitleField = typeof title === 'function' ? title : null;

      var description = uiSchema['ui:description'];
      var textDescription = typeof description === 'string' ? description : null;
      var DescriptionField = typeof description === 'function' ? uiSchema['ui:description'] : null;

      var hasTitleOrDescription = !!title || !!description;
      var isRoot = idSchema.$id === 'root';

      var containerClassNames = (0, _classnames2.default)({
        'input-section': isRoot,
        'schemaform-field-container': true,
        'schemaform-block': title && !isRoot
      });

      var renderProp = function renderProp(propName) {
        return _react2.default.createElement(
          'div',
          { key: propName },
          _react2.default.createElement(SchemaField, {
            name: propName,
            required: _this4.isRequired(propName),
            schema: schema.properties[propName],
            uiSchema: uiSchema[propName],
            errorSchema: errorSchema[propName],
            idSchema: idSchema[propName],
            formData: formData[propName],
            onChange: _this4.onPropertyChange(propName),
            onBlur: onBlur,
            registry: _this4.props.registry,
            disabled: disabled,
            readonly: readonly })
        );
      };

      var fieldContent = _react2.default.createElement(
        'div',
        { className: containerClassNames },
        hasTitleOrDescription && _react2.default.createElement(
          'div',
          { className: 'schemaform-block-header' },
          CustomTitleField && !showFieldLabel ? _react2.default.createElement(CustomTitleField, {
            id: idSchema.$id + '__title',
            formData: formData,
            formContext: formContext,
            required: required }) : null,
          !CustomTitleField && title && !showFieldLabel ? _react2.default.createElement(TitleField, {
            id: idSchema.$id + '__title',
            title: title,
            required: required,
            formContext: formContext }) : null,
          textDescription && _react2.default.createElement(
            'p',
            null,
            textDescription
          ),
          DescriptionField && _react2.default.createElement(DescriptionField, { formData: formData, formContext: formContext, options: uiSchema['ui:options'] }),
          !textDescription && !DescriptionField && description
        ),
        this.orderedProperties.map(function (objectFields, index) {
          if (objectFields.length > 1) {
            var _objectFields = _toArray(objectFields),
                first = _objectFields[0],
                rest = _objectFields.slice(1);

            var visible = rest.filter(function (prop) {
              return !(0, _get3.default)(['properties', prop, 'ui:collapsed'], schema);
            });
            return _react2.default.createElement(
              _ExpandingGroup2.default,
              { open: visible.length > 0, key: index },
              renderProp(first),
              _react2.default.createElement(
                'div',
                { className: (0, _get3.default)([first, 'ui:options', 'expandUnderClassNames'], uiSchema) },
                visible.map(renderProp)
              )
            );
          }

          // if fields have expandUnder, but are the only item, that means the
          // field they’re expanding under is hidden, and they should be hidden, too
          return !(0, _get3.default)([objectFields[0], 'ui:options', 'expandUnder'], uiSchema) ? renderProp(objectFields[0], index) : undefined;
        })
      );

      if (title) {
        return _react2.default.createElement(
          'fieldset',
          { className: fieldsetClassNames },
          fieldContent
        );
      }

      return _react2.default.createElement(
        'div',
        { className: fieldsetClassNames },
        fieldContent
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
  onChange: _propTypes2.default.func.isRequired,
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