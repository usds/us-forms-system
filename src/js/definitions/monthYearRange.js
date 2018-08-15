import { validateDateRange } from '../validation';
import { monthYearConfig } from './monthYear';
import { dateRangeConfig } from './dateRange';

function schema() {
  return dateRangeConfig.schema();
}

function uiSchema(from = 'From', to = 'To', rangeError = 'To date must be after From date') {
  return {
    'ui:validations': [
      validateDateRange
    ],
    'ui:errorMessages': {
      pattern: rangeError,
    },
    from: monthYearConfig.uiSchema(from),
    to: monthYearConfig.uiSchema(to)
  };
}

export const monthYearRangeConfig = {
  schema,
  uiSchema
};
