import { validateSSN } from '../validation';
import SSNWidget from '../widgets/SSNWidget';
import SSNReviewWidget from '../review/SSNWidget';

const schema = {
  type: 'string',
  pattern: '^[0-9]{9}$'
};

const uiSchema = {
  'ui:widget': SSNWidget,
  'ui:reviewWidget': SSNReviewWidget,
  'ui:title': 'Social Security number',
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

export const ssnConfig = {
  schema,
  uiSchema
};
