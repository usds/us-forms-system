'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReadOnlyArrayField = function (_React$Component) {
  _inherits(ReadOnlyArrayField, _React$Component);

  function ReadOnlyArrayField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReadOnlyArrayField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReadOnlyArrayField.__proto__ || Object.getPrototypeOf(ReadOnlyArrayField)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = function (nextProps) {
      return !(0, _utils.deepEquals)(_this.props, nextProps);
    }, _this.getItemSchema = function (index) {
      return _this.props.schema.items[index];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReadOnlyArrayField, [{
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
          registry = _props.registry;

      var definitions = registry.definitions;
      var SchemaField = registry.fields.SchemaField;

      var uiOptions = uiSchema['ui:options'] || {};

      var items = formData || [];

      return _react2.default.createElement(
        'div',
        { className: 'schemaform-field-container' },
        _react2.default.createElement(
          'div',
          null,
          items.map(function (item, index) {
            var itemSchema = _this2.getItemSchema(index);
            var itemIdPrefix = idSchema.$id + '_' + index;
            var itemIdSchema = (0, _utils.toIdSchema)(itemSchema, itemIdPrefix, definitions);

            return _react2.default.createElement(
              'div',
              { key: index, className: 'usfs-growable-background' },
              _react2.default.createElement(
                'div',
                { className: 'row small-collapse' },
                _react2.default.createElement(
                  'div',
                  { className: 'small-12 columns' },
                  _react2.default.createElement(
                    'h5',
                    { className: 'schemaform-array-readonly-header' },
                    uiOptions.itemName
                  ),
                  _react2.default.createElement(SchemaField, { key: index,
                    schema: itemSchema,
                    uiSchema: uiSchema.items,
                    errorSchema: errorSchema ? errorSchema[index] : undefined,
                    idSchema: itemIdSchema,
                    formData: item,
                    onChange: function onChange(f) {
                      return f;
                    },
                    onBlur: function onBlur(f) {
                      return f;
                    },
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

  return ReadOnlyArrayField;
}(_react2.default.Component);

ReadOnlyArrayField.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  uiSchema: _propTypes2.default.object,
  errorSchema: _propTypes2.default.object,
  idSchema: _propTypes2.default.object,
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

exports.default = ReadOnlyArrayField;
//# sourceMappingURL=ReadOnlyArrayField.js.map