import _assign from 'lodash/fp/assign';
import _get from 'lodash/fp/get';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';


import { getUiOptions, getWidget, optionsList } from '@department-of-veterans-affairs/react-jsonschema-form/lib/utils';

/*
 * This is a minimal string field implementation for the
 * review page, so we can pass custom review widgets
 * in the config
 */
export default function StringField(props) {
  var registry = props.registry,
      schema = props.schema,
      uiSchema = props.uiSchema,
      formData = props.formData;

  var uiOptions = getUiOptions(uiSchema);
  var labels = uiOptions.labels || {};
  var enumOptions = Array.isArray(schema.enum) && optionsList(schema);

  var Widget = _get('ui:reviewWidget', uiSchema);
  if (!Widget) {
    var defaultWidget = schema.format || (enumOptions ? 'select' : 'text');
    Widget = getWidget(schema, uiOptions.widget || defaultWidget, registry.widgets);
  }

  return React.createElement(Widget, _extends({
    options: _assign(uiOptions, { enumOptions: enumOptions, labels: labels }),
    value: formData
  }, props));
}