import React from 'react';
import classnames from 'classnames';

const numberTypes = new Set(['number', 'integer']);

export default function TextWidget(props) {
  let inputType = props.options.inputType;
  if (!inputType) {
    inputType = numberTypes.has(props.schema.type) ? 'number' : props.type;
  }
  const widgetClasses = classnames(props.options.widgetClassNames);
  return (
    <input type={inputType}
      id={props.id}
      name={props.id}
      disabled={props.disabled}
      maxLength={props.schema.maxLength}
      autoComplete={props.options.autocomplete || false}
      className={widgetClasses}
      value={typeof props.value === 'undefined' ? '' : props.value}
      onBlur={() => props.onBlur(props.id)}
      onChange={(event) => props.onChange(event.target.value ? event.target.value : undefined)}/>
  );
}

TextWidget.defaultProps = {
  type: 'text'
};
