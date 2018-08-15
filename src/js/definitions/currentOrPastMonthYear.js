import _ from 'lodash/fp';
import { validateCurrentOrPastMonthYear } from '../validation';
import { dateConfig } from './date';
import { monthYearConfig } from './monthYear';

// const schema = dateConfig.schema;

function schema() {
  return dateConfig.schema();
}

function uiSchema(title = 'Date') {
  return _.assign(monthYearConfig.uiSchema(title), {
    'ui:validations': [
      validateCurrentOrPastMonthYear
    ],
    'ui:errorMessages': {
      pattern: 'Please provide a valid current or past date'
    }
  });
}

export const currentOrPastMonthYearConfig = {
  schema,
  uiSchema
};
