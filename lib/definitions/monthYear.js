import { validateMonthYear } from '../validation';

export default function uiSchema() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Date';

  return {
    'ui:title': title,
    'ui:widget': 'date',
    'ui:options': {
      monthYear: true
    },
    'ui:validations': [validateMonthYear],
    'ui:errorMessages': {
      pattern: 'Please provide a valid date'
    }
  };
}