import { validateDateRange } from '../validation';
import { dateConfig, schema as ssnSchema } from './date';

const schema = {
  type: 'object',
  properties: {
    from: ssnSchema,
    to: ssnSchema
  }
};

function uiSchema(from = 'From', to = 'To', rangeError = 'To date must be after From date') {
  return {
    'ui:validations': [
      validateDateRange
    ],
    'ui:errorMessages': {
      pattern: rangeError,
    },
    from: dateConfig.uiSchema(from),
    to: dateConfig.uiSchema(to)
  };
}

export const dateRangeConfig = {
  schema,
  uiSchema
};
