import PhoneNumberWidget from 'us-forms-system/lib/js/widgets/PhoneNumberWidget';
import PhoneNumberReviewWidget from 'us-forms-system/lib/js/review/PhoneNumberWidget';

import Introduction from '../components/Introduction.jsx';

const fullNameConfig = {
  schema: () => {
    return {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          pattern: '^.*\\S.*',
          minLength: 1,
          maxLength: 30
        },
        middle: {
          type: 'string'
        },
        last: {
          type: 'string',
          pattern: '^.*\\S.*',
          minLength: 2,
          maxLength: 30
        },
      },
      required: [
        'first',
        'last'
      ]
    }
  },
  uiSchema: () => {
    return {
      first: {
        'ui:title': 'Applicant/petitioner full first name'
      },
      last: {
        'ui:title': 'Applicant/petitioner full last name'
      },
      middle: {
        'ui:title': 'Applicant/petitioner full middle name'
      }
    }
  }
}

const formConfig = {
  title: 'Form',
  subTitle: 'Test',
  formId: '',
  urlPrefix: '/',
  trackingPrefix: 'form-',
  transformForSubmit: '',
  submitUrl: '',
  defaultDefinitions: {
    fullNameConfig
  },
  chapters: {
    firstSection: {
      title: 'First Section',
      pages: {
        firstPage: {
          path: 'first-section/first-page',
          title: 'First Page',
          uiSchema: {
            fullName: fullNameConfig.uiSchema()
          },
          schema: {
            type: 'object',
            properties: {
              fullName: fullNameConfig.schema()
            }
          }
        },
        secondPage: {
          path: 'first-section/second-page',
          title: 'Second Page',
          uiSchema: {
            email: {
              'ui:title': 'Email address',
              'ui:errorMessages': {
                pattern: 'Please put your email in this format x@x.xxx'
              }
            },
            phone: {
              'ui:title': 'Mobile phone number (text message)',
              'ui:errorMessages': {
                pattern: 'Phone numbers must be 10 digits'
              },
              'ui:widget': PhoneNumberWidget,
              'ui:reviewWidget': PhoneNumberReviewWidget
            }
          },
          schema: {
            type: 'object',
            required: ['email', 'phone'],
            properties: {
              email: {
                type: 'string',
                pattern: '^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
              },
              phone: {
                type: 'string',
                pattern: '^[0-9]{10}$'
              }
            }
          }
        }
      }
    },
  }
};

export default formConfig;
