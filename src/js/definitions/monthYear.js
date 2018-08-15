import { validateMonthYear } from '../validation';
import { dateConfig } from './date';

// const schema = dateConfig.schema;

function schema() {
  dateConfig.schema();
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
