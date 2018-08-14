import CurrencyWidget from '../widgets/CurrencyWidget';
import CurrencyReviewWidget from '../review/CurrencyWidget';

const schema = {
  type: 'number'
};

function uiSchema(title) {
  return {
    'ui:widget': CurrencyWidget,
    'ui:reviewWidget': CurrencyReviewWidget,
    'ui:title': title,
    'ui:options': {
      classNames: 'schemaform-currency-input'
    },
    'ui:errorMessages': {
      type: 'Please enter a valid dollar amount'
    }
  };
}

export const currencyConfig = {
  schema,
  uiSchema
};
