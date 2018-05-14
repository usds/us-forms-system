import _get from 'lodash/fp/get';
import _set from 'lodash/fp/set';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';

import classNames from 'classnames';
import Scroll from 'react-scroll';

import { toIdSchema, getDefaultFormState, deepEquals } from '@department-of-veterans-affairs/react-jsonschema-form/lib/utils';

var Element = Scroll.Element;

var BasicArrayField = function (_React$Component) {
  _inherits(BasicArrayField, _React$Component);

  function BasicArrayField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BasicArrayField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BasicArrayField.__proto__ || Object.getPrototypeOf(BasicArrayField)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = function (nextProps, nextState) {
      return !deepEquals(_this.props, nextProps) || nextState !== _this.state;
    }, _this.onItemChange = function (indexToChange, value) {
      var newItems = _set(indexToChange, value, _this.props.formData || []);
      _this.props.onChange(newItems);
    }, _this.getItemSchema = function (index) {
      return _this.props.schema.items[index];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BasicArrayField, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          uiSchema = _props.uiSchema,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          formData = _props.formData,
          disabled = _props.disabled,
          readonly = _props.readonly,
          registry = _props.registry,
          formContext = _props.formContext,
          onBlur = _props.onBlur,
          schema = _props.schema;

      var definitions = registry.definitions;
      var _registry$fields = registry.fields,
          TitleField = _registry$fields.TitleField,
          SchemaField = _registry$fields.SchemaField;


      var title = uiSchema['ui:title'] || schema.title;
      var hideTitle = !!_get(['ui:options', 'hideTitle'], uiSchema);
      var description = uiSchema['ui:description'];
      var textDescription = typeof description === 'string' ? description : null;
      var DescriptionField = typeof description === 'function' ? uiSchema['ui:description'] : null;
      var hasTitleOrDescription = !!title && !hideTitle || !!description;

      // if we have form data, use that, otherwise use an array with a single default object
      var items = formData && formData.length ? formData : [getDefaultFormState(schema, undefined, registry.definitions)];

      var containerClassNames = classNames({
        'schemaform-field-container': true,
        'schemaform-block': hasTitleOrDescription
      });

      return React.createElement(
        'div',
        { className: containerClassNames },
        hasTitleOrDescription && React.createElement(
          'div',
          { className: 'schemaform-block-header' },
          title && !hideTitle ? React.createElement(TitleField, {
            id: idSchema.$id + '__title',
            title: title,
            formContext: formContext }) : null,
          textDescription && React.createElement(
            'p',
            null,
            textDescription
          ),
          DescriptionField && React.createElement(DescriptionField, { options: uiSchema['ui:options'] }),
          !textDescription && !DescriptionField && description
        ),
        React.createElement(
          'div',
          null,
          items.map(function (item, index) {
            var itemSchema = _this2.getItemSchema(index);
            var itemIdPrefix = idSchema.$id + '_' + index;
            var itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, definitions);

            return React.createElement(
              'div',
              { key: index },
              React.createElement(Element, { name: 'table_' + itemIdPrefix }),
              React.createElement(
                'div',
                { className: 'row small-collapse' },
                React.createElement(
                  'div',
                  { className: 'small-12 columns' },
                  React.createElement(SchemaField, { key: index,
                    schema: itemSchema,
                    uiSchema: uiSchema.items,
                    errorSchema: errorSchema ? errorSchema[index] : undefined,
                    idSchema: itemIdSchema,
                    formData: item,
                    onChange: function onChange(value) {
                      return _this2.onItemChange(index, value);
                    },
                    onBlur: onBlur,
                    registry: _this2.props.registry,
                    required: false,
                    disabled: disabled,
                    readonly: readonly })
                )
              )
            );
          })
        )
      );
    }
  }]);

  return BasicArrayField;
}(React.Component);

BasicArrayField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  errorSchema: PropTypes.object,
  requiredSchema: PropTypes.object,
  idSchema: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  formData: PropTypes.array,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  registry: PropTypes.shape({
    widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])).isRequired,
    fields: PropTypes.objectOf(PropTypes.func).isRequired,
    definitions: PropTypes.object.isRequired,
    formContext: PropTypes.object.isRequired
  })
};

export default BasicArrayField;