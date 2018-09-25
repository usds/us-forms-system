import currentOrPastDateUI from 'us-forms-system/lib/js/definitions/currentOrPastDate';

const formConfig = {
  title: 'US Passport Renewal Application',
  subTitle: 'DS-82',
  formId: '',
  urlPrefix: '/',
  trackingPrefix: 'form-',
  submitUrl: '',
  confirmation: '',
  defaultDefinitions: {},
  chapters: {
    CP1: {
      title: "Can you use this form?",
      pages: {
        PG1: {
          path: 'eligibility',
          title: 'Can you use this form?',
          uiSchema: {
            'view:prequal': {
              'ui:title': 'To use this form, all of the following must be true. Check the box next to each item to confirm that it applies to your case.'
            },
            PQ1: {
              'ui:title': 'I can submit my most recent U.S. passport book and/or U.S. passport card with this application.',
            },
            PQ2: {
              'ui:title': 'I was at least 16 years old when my most recent U.S. passport book and/or passport card was issued.',
            },
            PQ3: {
              'ui:title': 'I was issued my most recent U.S. passport book and/or passport card less than 15 years ago.',
            },
            PQ4: {
              'ui:title': 'The U.S. passport book and/or U.S. passport card that I am renewing has not been mutilated, damaged, lost, stolen or subsequently found.',
            },
            PQ5: {
              'ui:title': 'My U.S. passport has not been limited from the normal ten year validity period due to passport damage/mutilation, multiple passport thefts/losses, or non-compliance with 22 C.F.R. 51.41. (Please refer to the back pages of your U.S. passport book for endorsement information).',
            },
            PQ6: {
              'ui:title': 'I use the same name as on my most recent U.S. passport book and/or U.S. passport card; OR I have had my name changed by marriage or court order and can submit proper certified documentation to reflect my name change.',
            }
          },
          schema: {
            type: 'object',
            required: [ 'PQ1', 'PQ2', 'PQ3', 'PQ4', 'PQ5', 'PQ6'  ],
            properties: {
              'view:prequal': { type: 'object', properties: {} },
              PQ1: { type: 'boolean' },
              PQ2: { type: 'boolean' },
              PQ3: { type: 'boolean' },
              PQ4: { type: 'boolean' },
              PQ5: { type: 'boolean' },
              PQ6: { type: 'boolean' }
            }
          }
        }
      }
    },
    CP2: {
      title: "Passport types",
      pages: {
        PG2: {
          path: 'passport-types',
          title: 'Passport types',
          uiSchema: {
            'view:bookInstructions': {
              'ui:description': 'Please indicate the type of passport documents for which you are applying. You may choose either or both:'
            },
            'view:book': {
              'ui:options': {
                expandUnderClassNames: 'schemaform-expandUnder-indent'
              }
            },
            'view:bookType': {
              'ui:options': {
                expandUnder: 'view:book'
              },
              'ui:description': 'Please choose the passport book type. The large book option is for those who frequently travel abroad during the passport validity period, and is recommended for applicants who have previously required the addition of visa pages.'
            },
            'card': {
              'ui:options': {
                expandUnderClassNames: 'schemaform-expandUnder-indent'
              }
            },
            'view:cardWarning': {
              'ui:options': {
                expandUnder: 'card'
              },
              'ui:description': 'Note that a U.S. passport card is only valid for land or sea travel to and from Canada, Mexico, and the Carribean. For international air travel you must use a passport book.'
            }
          },
          schema: {
            type: 'object',
            required: [ ],
            properties: {
              'view:bookInstructions': {
                type: 'object',
                properties: {}
              },
              'view:book': {
                type: 'boolean',
                title: 'U.S. passport book'
              },
              'view:bookType': {
                type: 'object',
                properties: {
                  book: {
                    type: 'string',
                    title: 'Passport book type',
                    'enum': [ 'Regular (standard) book', 'Large (non-standard) book']
                  },
                }
              },
              card: {
                type: 'boolean',
                title: 'U.S. passport card'
              },
              'view:cardWarning': {
                type: 'object',
                properties: {}
              }
            }
          }
        }
      }
    },
    CP3: {
      title: "Applicant information",
      pages: {
        PG3: {
          path: 'applicant-info',
          title: 'Applicant information',
          uiSchema: {
            usedOtherNames: {
              "ui:options": {
                expandUnderClassNames: "schemaform-expandUnder-indent"
              }
            },
            otherNames: {
              'ui:widget': 'textarea',
              "ui:options": {
                 expandUnder: "usedOtherNames"
               }
            },
            phone: {
              'ui:errorMessages': {
                minLength: 'Please enter a phone number, including area code'
              }
            },
            ssn: {
              'ui:errorMessages': {
                pattern: 'Please enter a social security number in the form 000-00-0000'
              }
            },
            dob: currentOrPastDateUI('Date of birth')
          },
          schema: {
            type: 'object',
            required: [ 'lastName', 'firstName', 'ssn', 'phone' ],
            properties: {
              lastName: {
                type: 'string',
                title: 'Last name',
                minLength: 2
              },
              firstName: {
                type: 'string',
                title: 'First name',
                minLength: 1
              },
              middleName: {
                type: 'string',
                title: 'Middle name',
              },
              usedOtherNames: {
                type: 'boolean',
                title: 'Have you used other names? (e.g., Birth name, Maiden, Previous marriage, Legal name changes)'
              },
              otherNames: {
                type: 'string',
                title: 'List other names used (one per line)'
              },
              ssn: {
                type: 'string',
                title: 'Social security number',
                pattern: '[0-9]{3}-?[0-9]{2}-?[0-9]{4}'
              },
              dob: {
                type: 'string',
                title: 'Date of birth'
              },
              phone: {
                type: 'string',
                title: 'Primary contact phone number',
                minLength: 10
              }
            }
          }
        }
      }
    },
    CP4: {
      title: "Applicant address",
      pages: {
        PG4: {
          path: 'applicant-address',
          title: 'Applicant address',
          uiSchema: {
            zip: {
              'ui:errorMessages': {
                pattern: 'Please enter a 5-digit zip code or 9-digit zip+4 code'
              }
            }
          },
          schema: {
            type: 'object',
            required: [ 'address1', 'city', 'state', 'zip' ],
            properties: {
              address1: {
                type: 'string',
                title: 'Address line 1',
                minLength: 5
              },
              address2: {
                type: 'string',
                title: 'Address line 2'
              },
              city: {
                type: 'string',
                title: 'City',
                minLength: 2
              },
              state: {
                  type: 'string',
                  title: 'State',
                  'enum': [
                    'Outside the US',
                    'AL', 'AK', 'AS', 'AZ', 'AR', 'AA', 'AE', 'AP', 'CA', 'CO',
                    'CT', 'DC', 'DE', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL',
                    'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI',
                    'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
                    'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI',
                    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV',
                    'WI', 'WY'
                  ]
              },
              zip: {
                type: 'string',
                title: 'Zip/Postal code'
              },
              country: {
                type: 'string',
                title: 'Country (if not in the U.S.)'
              }
            }
          }
        }
      }
    }
  }
};

export default formConfig;
