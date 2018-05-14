import _get from 'lodash/fp/get';
import React from 'react';

import classNames from 'classnames';

/*
 * This is the template for each field (which in the schema library means label + widget)
 */

export default function FieldTemplate(props) {
  var id = props.id,
      schema = props.schema,
      help = props.help,
      required = props.required,
      rawErrors = props.rawErrors,
      children = props.children,
      formContext = props.formContext,
      uiSchema = props.uiSchema;


  var isTouched = formContext.touched[id] || Object.keys(formContext.touched).some(function (touched) {
    return id.startsWith(touched);
  });
  var hasErrors = (formContext.submitted || isTouched) && rawErrors && rawErrors.length;
  var requiredSpan = required ? React.createElement(
    'span',
    { className: 'schemaform-required-span' },
    '(*Required)'
  ) : null;
  var label = uiSchema['ui:title'] || props.label;
  var isDateField = uiSchema['ui:widget'] === 'date';
  var showFieldLabel = uiSchema['ui:options'] && uiSchema['ui:options'].showFieldLabel;
  var hideLabelText = uiSchema['ui:options'] && uiSchema['ui:options'].hideLabelText;
  var useLabelElement = showFieldLabel === 'label';

  var description = uiSchema['ui:description'];
  var textDescription = typeof description === 'string' ? description : null;
  var DescriptionField = typeof description === 'function' ? uiSchema['ui:description'] : null;
  var isFieldGroup = isDateField || uiSchema['ui:widget'] === 'yesNo' || uiSchema['ui:widget'] === 'radio';

  var errorSpanId = void 0;
  var errorSpan = void 0;
  var errorClass = void 0;
  if (hasErrors) {
    errorClass = isDateField ? 'input-error-date' : 'usa-input-error';
    errorSpanId = id + '-error-message';
    errorSpan = React.createElement(
      'span',
      { className: 'usa-input-error-message', role: 'alert', id: errorSpanId },
      React.createElement(
        'span',
        { className: 'sr-only' },
        'Error'
      ),
      ' ',
      rawErrors[0]
    );
  }

  var containerClassNames = classNames('schemaform-field-template', _get(['ui:options', 'classNames'], uiSchema));
  var labelClassNames = classNames({
    'usa-input-error-label': hasErrors && !isDateField,
    'schemaform-label': true
  });

  var inputWrapperClassNames = classNames('schemaform-widget-wrapper', {
    'usa-input-error form-error-date': isDateField && hasErrors
  });

  var noWrapperContent = !showFieldLabel && (schema.type === 'object' || schema.type === 'array' || schema.type === 'boolean' && !uiSchema['ui:widget']);

  if (noWrapperContent) {
    return children;
  }

  var useFieldsetLegend = (isFieldGroup || !!showFieldLabel) && !useLabelElement;

  var labelElement = useFieldsetLegend ? React.createElement(
    'legend',
    { id: id + '-label', className: labelClassNames },
    label,
    requiredSpan
  ) : React.createElement(
    'label',
    { id: id + '-label', className: labelClassNames, htmlFor: id },
    label,
    requiredSpan
  );

  var content = React.createElement(
    'div',
    { className: errorClass },
    !hideLabelText && labelElement,
    textDescription && React.createElement(
      'p',
      null,
      textDescription
    ),
    DescriptionField && React.createElement(DescriptionField, { options: uiSchema['ui:options'] }),
    !textDescription && !DescriptionField && description,
    errorSpan,
    React.createElement(
      'div',
      { className: inputWrapperClassNames },
      children
    ),
    help
  );

  if (useFieldsetLegend) {
    return React.createElement(
      'fieldset',
      { className: containerClassNames },
      content
    );
  }

  return React.createElement(
    'div',
    { className: containerClassNames },
    content
  );
}