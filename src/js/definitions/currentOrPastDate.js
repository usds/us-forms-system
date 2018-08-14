import { validateCurrentOrPastDate } from '../validation';
import { dateConfig } from './date';

const schema = dateConfig.schema;

function uiSchema(title = 'Date') {
  return {
    'ui:title': title,
    'ui:widget': 'date',
    'ui:validations': [
      validateCurrentOrPastDate
    ],
    'ui:errorMessages': {
      pattern: 'Please provide a valid current or past date'
    }
  };
}

export const currentOrPastDateConfig = {
  schema,
  uiSchema
};
