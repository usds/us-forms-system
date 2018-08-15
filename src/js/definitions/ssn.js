import { validateSSN } from '../validation';
import SSNWidget from '../widgets/SSNWidget';
import SSNReviewWidget from '../review/SSNWidget';

function schema() {
  return {
    type: 'string',
    pattern: '^[0-9]{9}$'
  };
}

function uiSchema(title = 'Social Security Number') {
  return {
    'ui:widget': SSNWidget,
    'ui:reviewWidget': SSNReviewWidget,
    'ui:title': title,
    'ui:options': {
      widgetClassNames: 'usa-input-medium'
    },
    'ui:validations': [
      validateSSN
    ],
    'ui:errorMessages': {
      pattern: 'Please enter a valid 9 digit SSN (dashes allowed)'
    }
  };
}

export const ssnConfig = {
  schema,
  uiSchema
};
