import React from 'react';

/*
 * This is the template for each field (which in the schema library means label + widget)
 */

export default function ReviewFieldTemplate(props) {
  var children = props.children,
      uiSchema = props.uiSchema,
      schema = props.schema;

  var label = uiSchema['ui:title'] || props.label;
  var description = uiSchema['ui:description'];
  var textDescription = typeof description === 'string' ? description : null;
  var DescriptionField = typeof description === 'function' ? uiSchema['ui:description'] : null;

  return schema.type === 'object' || schema.type === 'array' ? children : React.createElement(
    'div',
    { className: 'review-row' },
    React.createElement(
      'dt',
      null,
      label,
      textDescription && React.createElement(
        'p',
        null,
        textDescription
      ),
      DescriptionField && React.createElement(DescriptionField, { options: uiSchema['ui:options'] }),
      !textDescription && !DescriptionField && description
    ),
    React.createElement(
      'dd',
      null,
      children
    )
  );
}