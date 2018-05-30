export { CheckboxWidget as default };
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

function CheckboxWidget(_ref) {
  var id = _ref.id,
      value = _ref.value,
      required = _ref.required,
      disabled = _ref.disabled,
      label = _ref.label,
      _onChange = _ref.onChange,
      options = _ref.options;

  var requiredSpan = required ? React.createElement(
    'span',
    { className: 'form-required-span' },
    '*'
  ) : null;
  var widgetClasses = classNames('form-checkbox', options.widgetClassNames);
  return React.createElement(
    'div',
    { className: widgetClasses },
    React.createElement('input', { type: 'checkbox',
      id: id,
      name: id,
      checked: typeof value === 'undefined' ? false : value,
      required: required,
      disabled: disabled,
      onChange: function onChange(event) {
        return _onChange(event.target.checked);
      } }),
    React.createElement(
      'label',
      { className: 'schemaform-label', htmlFor: id },
      options.title || label,
      requiredSpan
    )
  );
}

CheckboxWidget.defaultProps = {
  autofocus: false
};

CheckboxWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};