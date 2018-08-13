import { validateDateRange } from '../validation';
import monthYearUI from './monthYear';
import { dateRangeConfig } from './dateRange';

const schema = dateRangeConfig.schema;

function uiSchema(from = 'From', to = 'To', rangeError = 'To date must be after From date') {
  return {
    'ui:validations': [
      validateDateRange
    ],
    'ui:errorMessages': {
      pattern: rangeError,
    },
    from: monthYearUI(from),
    to: monthYearUI(to)
  };
}

export const monthYearRangeConfig = {
  schema,
  uiSchema
};
