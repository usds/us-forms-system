import React from 'react';

export default function YesNoWidget({
  id,
  value,
  disabled,
  onChange,
  options = {}
}) {
  const { yesNoReverse = false, labels = {} } = options;
  const yesValue = !yesNoReverse;
  const noValue = !yesValue;
  return (
    <div className="usa-radio">
      <input type="radio"
        checked={value === yesValue}
        className="usa-radio__input"
        id={`${id}Yes`}
        name={`${id}`}
        value="Y"
        disabled={disabled}
        onChange={_ => onChange(yesValue)}/>
      <label className="usa-radio__label" htmlFor={`${id}Yes`}>
        {labels.Y || 'Yes'}
      </label>
      <input type="radio"
        checked={value === noValue}
        className="usa-radio__input"
        id={`${id}No`}
        name={`${id}`}
        value="N"
        disabled={disabled}
        onChange={_ => onChange(noValue)}/>
      <label className="usa-radio__label" htmlFor={`${id}No`}>
        {labels.N || 'No'}
      </label>
    </div>
  );
}
