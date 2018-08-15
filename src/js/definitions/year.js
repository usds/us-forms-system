import { validateCurrentOrPastYear } from '../validation';
import * as ReviewWidget from '../review/widgets';

function schema() {
  return {
    type: 'integer',
    minimum: 1900
  };
}

function uiSchema(title = 'Year') {
  return {
    'ui:title': title,
    'ui:reviewWidget': ReviewWidget.TextWidget,
    'ui:validations': [
      validateCurrentOrPastYear
    ],
    'ui:errorMessages': {
      type: 'Please provide a valid year'
    },
    'ui:options': {
      widgetClassNames: 'usa-input-medium'
    }
  };
}

export const yearConfig = {
  schema,
  uiSchema
};
