const formConfig = {
  title: 'Application for enrollment in Medicare Part B (medical insurance)',
  subTitle: 'CMS40B-E',
  formId: '',
  urlPrefix: '/',
  submitUrl: '',
  confirmation: '',
  defaultDefinitions: {},
  chapters: {
    CP1: {
      title: 'Medicare enrollment information',
      pages: {
        PG1: {
          path: 'verification',
          title: 'Enrollment verification',
          uiSchema: {
            signUp: {
              'ui:title': 'I wish to apply for Medicare Part B',
              'ui:options': {
                expandUnderClassNames: 'schemaform-expandUnder-indent'
              }
            },
            'view:preQualification': {
              'ui:description': 'To apply for Medicare Part B, you must have already applied for and recieved Medicare Part A. If you do not have Part A and want to sign up, please contact Social Security at 1-800-772-1213. TTY users should call 1-800-325-0778.',
              'ui:options': {
                expandUnder: 'signUp'
              }
            },
            medicareNumber: {
              'ui:title': 'Medicare Number',
              'ui:description': 'Your Part A paperwork has a Medicare number in the form XXXX-XXX-XXXX consisting only of letters and digits, please enter it below.',
              'ui:errorMessages': {
                pattern: 'Your Medicare number should be in the form XXXX-XXX-XXXX, letters and digits separated by dashes'
              }
            }
          },
          schema: {
            type: 'object',
            required: [ 'signUp', 'medicareNumber' ],
            properties: {
              signUp: {
                type: 'boolean'
              },
              'view:preQualification': {
                type: 'object',
                properties: {}
              },
              medicareNumber: {
                type: 'string',
                pattern: '[0-9a-zA-z]{4}-[0-9a-zA-z]{3}-[0-9a-zA-z]{4}'
              }
            }
          }
        },
        PG2: {
          path: 'enrollee-info',
          title: 'Enrollee information',
          uiSchema: {
            zip: {
              'ui:errorMessages': {
                pattern: 'Please enter a 5-digit zip code or 9-digit zip+4 code'
              }
            },
            phone: {
              'ui:errorMessages': {
                minLength: 'Please enter a phone number, including area code'
              }
            }
          },
          schema: {
            type: 'object',
            required: [ 'name', 'address', 'city', 'state', 'zip', 'phone' ],
            properties: {
              name: {
                type: 'string',
                title: 'Full name (Last, First, Middle)',
                minLength: 5
              },
              address: {
                type: 'string',
                title: 'Address',
                minLength: 5
              },
              city: {
                type: 'string',
                title: 'City',
                minLength: 2
              },
              'state': {
                  type: 'string',
                  title: 'State',
                  'enum': [
                    'AL', 'AK', 'AS', 'AZ', 'AR', 'AA', 'AE', 'AP', 'CA', 'CO',
                    'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL',
                    'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI',
                    'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
                    'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI',
                    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV',
                    'WI', 'WY'
                  ]
              },
              zip: {
                type: 'string',
                title: 'Zip Code',
                pattern: '[0-9]{5}((-)?[0-9]{4})?'
              },
              phone: {
                type: 'string',
                title: 'Phone',
                minLength: 10
              }
            }
          }
        }
      }
    }
  }
};

export default formConfig;
