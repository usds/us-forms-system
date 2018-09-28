import * as ReviewWidget from '../review/widgets';

function schema() {
  return {
    type: 'integer',
    minimum: 1900,
    maximum: 2100
  };
}

function uiSchema(title = 'Year') {
  return {
    'ui:title': title,
    'ui:reviewWidget': ReviewWidget.TextWidget,
    'ui:options': {
      widgetClassNames: 'usa-input-medium'
    }
  };
}

export const yearConfig = {
  schema,
  uiSchema
};
