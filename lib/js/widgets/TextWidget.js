'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextWidget;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberTypes = new Set(['number', 'integer']);

function TextWidget(props) {
  var inputType = props.options.inputType;
  if (!inputType) {
    inputType = numberTypes.has(props.schema.type) ? 'number' : props.type;
  }
  return _react2.default.createElement('input', { type: inputType,
    id: props.id,
    name: props.id,
    disabled: props.disabled,
    maxLength: props.schema.maxLength,
    autoComplete: props.options.autocomplete || false,
    className: props.options.widgetClassNames,
    value: typeof props.value === 'undefined' ? '' : props.value,
    onBlur: function onBlur() {
      return props.onBlur(props.id);
    },
    onChange: function onChange(event) {
      return props.onChange(event.target.value ? event.target.value : undefined);
    } });
}

TextWidget.defaultProps = {
  type: 'text'
};