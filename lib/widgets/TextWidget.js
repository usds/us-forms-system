import React from 'react';

var numberTypes = new Set(['number', 'integer']);

export default function TextWidget(props) {
  var inputType = props.options.inputType;
  if (!inputType) {
    inputType = numberTypes.has(props.schema.type) ? 'number' : props.type;
  }
  return React.createElement('input', { type: inputType,
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