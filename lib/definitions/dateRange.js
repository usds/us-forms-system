import { validateDateRange } from '../validation';
import dateUI from './date';

export default function uiSchema() {
  var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'From';
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'To';
  var rangeError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'To date must be after From date';

  return {
    'ui:validations': [validateDateRange],
    'ui:errorMessages': {
      pattern: rangeError
    },
    from: dateUI(from),
    to: dateUI(to)
  };
}