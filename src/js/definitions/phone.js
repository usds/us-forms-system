import PhoneNumberWidget from '../widgets/PhoneNumberWidget';
import PhoneNumberReviewWidget from '../review/PhoneNumberWidget';

function schema() {
  return {
    type: 'string',
    minLength: 10
  };
}

/*
 * Phone uiSchema
 *
 * @param {string} title - The field label, defaults to Phone
 */
function uiSchema(title = 'Phone') {
  return {
    'ui:widget': PhoneNumberWidget,
    'ui:reviewWidget': PhoneNumberReviewWidget,
    'ui:title': title,
    'ui:errorMessages': {
      pattern: 'Phone numbers must be 10 digits'
    },
    'ui:options': {
      widgetClassNames: 'home-phone va-input-medium-large',
      inputType: 'tel'
    }
  };
}

export const phoneConfig = {
  schema,
  uiSchema
};
