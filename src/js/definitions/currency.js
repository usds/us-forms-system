import CurrencyWidget from '../widgets/CurrencyWidget';
import CurrencyReviewWidget from '../review/CurrencyWidget';
import { validateCurrency } from '../validation';

function schema() {
  return {
    type: 'number'
  };
}

function uiSchema(title = 'Dollar amount') {
  return {
    'ui:widget': CurrencyWidget,
    'ui:reviewWidget': CurrencyReviewWidget,
    'ui:title': title,
    'ui:options': {
      classNames: 'schemaform-currency-input'
    },
    'ui:validations': [
      validateCurrency
    ],
    'ui:errorMessages': {
      type: 'Please enter a valid dollar amount'
    }
  };
}

export const currencyConfig = {
  schema,
  uiSchema
};
