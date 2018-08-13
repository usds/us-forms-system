import { validateCurrentOrPastYear } from '../validation';
import * as ReviewWidget from '../review/widgets';

const schema = {
  type: 'integer',
  minimum: 1900
};

const uiSchema = {
  'ui:title': 'Year',
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

export const yearConfig = {
  schema,
  uiSchema
};
