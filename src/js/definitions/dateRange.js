import { validateDateRange } from '../validation';
import { dateConfig } from './date';

// const schema = {
//   type: 'object',
//   properties: {
//     from: dateConfig.schema,
//     to: dateConfig.schema
//   }
// };

function schema() {
  return {
    type: 'object',
    properties: {
      from: dateConfig.schema(),
      to: dateConfig.schema()
    }
  };
}

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
