import { validateCurrentOrPastDate } from '../validation';

export default function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';

  return {
    'ui:title': title,
    'ui:widget': 'date',
    'ui:validations': [validateCurrentOrPastDate],
    'ui:errorMessages': {
      pattern: 'Please provide a valid current or past date'
    }
  };
}