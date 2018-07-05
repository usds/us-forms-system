'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = _reactScroll2.default.Element;

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
      return !(0, _utils.deepEquals)(_this.props, nextProps) || nextState !== _this.state;
    }, _this.onItemChange = function (indexToChange, value) {
      var newItems = (0, _set3.default)(indexToChange, value, _this.props.formData || []);
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
      var hideTitle = !!(0, _get3.default)(['ui:options', 'hideTitle'], uiSchema);
      var description = uiSchema['ui:description'];
      var textDescription = typeof description === 'string' ? description : null;
      var DescriptionField = typeof description === 'function' ? uiSchema['ui:description'] : null;
      var hasTitleOrDescription = !!title && !hideTitle || !!description;

      // if we have form data, use that, otherwise use an array with a single default object
      var items = formData && formData.length ? formData : [(0, _utils.getDefaultFormState)(schema, undefined, registry.definitions)];

      var containerClassNames = (0, _classnames2.default)({
        'schemaform-field-container': true,
        'schemaform-block': hasTitleOrDescription
      });

      return _react2.default.createElement(
        'div',
        { className: containerClassNames },
        hasTitleOrDescription && _react2.default.createElement(
          'div',
          { className: 'schemaform-block-header' },
          title && !hideTitle ? _react2.default.createElement(TitleField, {
            id: idSchema.$id + '__title',
            title: title,
            formContext: formContext }) : null,
          textDescription && _react2.default.createElement(
            'p',
            null,
            textDescription
          ),
          DescriptionField && _react2.default.createElement(DescriptionField, { options: uiSchema['ui:options'] }),
          !textDescription && !DescriptionField && description
        ),
        _react2.default.createElement(
          'div',
          null,
          items.map(function (item, index) {
            var itemSchema = _this2.getItemSchema(index);
            var itemIdPrefix = idSchema.$id + '_' + index;
            var itemIdSchema = (0, _utils.toIdSchema)(itemSchema, itemIdPrefix, definitions);

            return _react2.default.createElement(
              'div',
              { key: index },
              _react2.default.createElement(Element, { name: 'table_' + itemIdPrefix }),
              _react2.default.createElement(
                'div',
                { className: 'row small-collapse' },
                _react2.default.createElement(
                  'div',
                  { className: 'small-12 columns' },
                  _react2.default.createElement(SchemaField, { key: index,
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
}(_react2.default.Component);

BasicArrayField.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  uiSchema: _propTypes2.default.object,
  errorSchema: _propTypes2.default.object,
  requiredSchema: _propTypes2.default.object,
  idSchema: _propTypes2.default.object,
  onChange: _propTypes2.default.func.isRequired,
  onBlur: _propTypes2.default.func,
  formData: _propTypes2.default.array,
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  registry: _propTypes2.default.shape({
    widgets: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object])).isRequired,
    fields: _propTypes2.default.objectOf(_propTypes2.default.func).isRequired,
    definitions: _propTypes2.default.object.isRequired,
    formContext: _propTypes2.default.object.isRequired
  })
};

exports.default = BasicArrayField;
//# sourceMappingURL=BasicArrayField.js.map