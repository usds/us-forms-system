import { validateMonthYear } from '../validation';
import { dateConfig } from './date';

function schema() {
  return dateConfig.schema();
}

function uiSchema(title = 'Date') {
  return {
    'ui:title': title,
    'ui:widget': 'date',
    'ui:options': {
      monthYear: true
    },
    'ui:validations': [
      validateMonthYear
    ],
    'ui:errorMessages': {
      pattern: 'Please provide a valid date'
    }
  };
}

export const monthYearConfig = {
  schema,
  uiSchema
};
