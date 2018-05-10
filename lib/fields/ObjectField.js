import _values from 'lodash/fp/values';
import _groupBy from 'lodash/fp/groupBy';
import _get from 'lodash/fp/get';
import _set from 'lodash/fp/set';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { pureWithDeepEquals } from '../helpers';

import { deepEquals, getDefaultFormState, orderProperties, getDefaultRegistry } from '@department-of-veterans-affairs/react-jsonschema-form/lib/utils';

import ExpandingGroup from '../components/ExpandingGroup';

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
    _this.SchemaField = pureWithDeepEquals(_this.props.registry.fields.SchemaField);
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
      return !deepEquals(this.props, nextProps);
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
        var formData = Object.keys(_this2.props.formData || {}).length ? _this2.props.formData : getDefaultFormState(_this2.props.schema, undefined, _this2.props.registry.definitions);
        _this2.props.onChange(_set(name, value, formData));
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

      return getDefaultFormState(schema, formData, registry.definitions) || {};
    }

    // This runs a series of steps that order properties and then group them into
    // expandable groups. If there are no expandable groups, then the end result of this
    // will be an array of single item arrays

  }, {
    key: 'orderAndFilterProperties',
    value: function orderAndFilterProperties(schema, uiSchema) {
      var properties = Object.keys(schema.properties);
      var orderedProperties = orderProperties(properties, _get('ui:order', uiSchema));
      var filteredProperties = orderedProperties.filter(function (prop) {
        return !schema.properties[prop]['ui:hidden'];
      });
      var groupedProperties = _groupBy(function (item) {
        var expandUnderField = _get([item, 'ui:options', 'expandUnder'], uiSchema);
        return expandUnderField || item;
      }, filteredProperties);

      return _values(groupedProperties);
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
      var formData = Object.keys(this.props.formData || {}).length ? this.props.formData : getDefaultFormState(schema, {}, definitions);
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

      var containerClassNames = classNames({
        'input-section': isRoot,
        'schemaform-field-container': true,
        'schemaform-block': title && !isRoot
      });

      var renderProp = function renderProp(propName) {
        return React.createElement(
          'div',
          { key: propName },
          React.createElement(SchemaField, {
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

      var fieldContent = React.createElement(
        'div',
        { className: containerClassNames },
        hasTitleOrDescription && React.createElement(
          'div',
          { className: 'schemaform-block-header' },
          CustomTitleField && !showFieldLabel ? React.createElement(CustomTitleField, {
            id: idSchema.$id + '__title',
            formData: formData,
            formContext: formContext,
            required: required }) : null,
          !CustomTitleField && title && !showFieldLabel ? React.createElement(TitleField, {
            id: idSchema.$id + '__title',
            title: title,
            required: required,
            formContext: formContext }) : null,
          textDescription && React.createElement(
            'p',
            null,
            textDescription
          ),
          DescriptionField && React.createElement(DescriptionField, { formData: formData, formContext: formContext, options: uiSchema['ui:options'] }),
          !textDescription && !DescriptionField && description
        ),
        this.orderedProperties.map(function (objectFields, index) {
          if (objectFields.length > 1) {
            var _objectFields = _toArray(objectFields),
                first = _objectFields[0],
                rest = _objectFields.slice(1);

            var visible = rest.filter(function (prop) {
              return !_get(['properties', prop, 'ui:collapsed'], schema);
            });
            return React.createElement(
              ExpandingGroup,
              { open: visible.length > 0, key: index },
              renderProp(first),
              React.createElement(
                'div',
                { className: _get([first, 'ui:options', 'expandUnderClassNames'], uiSchema) },
                visible.map(renderProp)
              )
            );
          }

          // if fields have expandUnder, but are the only item, that means the
          // field they’re expanding under is hidden, and they should be hidden, too
          return !_get([objectFields[0], 'ui:options', 'expandUnder'], uiSchema) ? renderProp(objectFields[0], index) : undefined;
        })
      );

      if (title) {
        return React.createElement(
          'fieldset',
          { className: fieldsetClassNames },
          fieldContent
        );
      }

      return React.createElement(
        'div',
        { className: fieldsetClassNames },
        fieldContent
      );
    }
  }]);

  return ObjectField;
}(React.Component);

ObjectField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false
};


ObjectField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  errorSchema: PropTypes.object,
  idSchema: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  formData: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  registry: PropTypes.shape({
    widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])).isRequired,
    fields: PropTypes.objectOf(PropTypes.func).isRequired,
    definitions: PropTypes.object.isRequired,
    formContext: PropTypes.object.isRequired
  })
};

export default ObjectField;