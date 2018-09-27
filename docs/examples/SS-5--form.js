import currentOrPastDateUI from 'us-forms-system/lib/js/definitions/currentOrPastDate';

const fullNameSchema = (title) => {
  return {
    type: 'object',
    title,
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
      }
    }
  };
}

const SSNSchema = (title) => {
  return {
    type: 'string',
    title: title || 'Social Security Number',
    pattern: '^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$'
  };
}

const SSNErrorMessage = () => {
  return {
    'ui:errorMessages': {
      pattern: 'Please enter a social security number in the form 000-00-0000'
    }
  };
}

const formConfig = {
  title: 'Application for Social Security Card',
  subTitle: 'SS-5',
  formId: '',
  urlPrefix: '/',
  trackingPrefix: 'form-',
  submitUrl: '',
  confirmation: '',
  defaultDefinitions: {},
  chapters: {
    CP1: {
      title: "Applicant information",
      pages: {
        PG1: {
          path: 'applicant-info',
          title: 'Applicant information',
          schema: {
            type: 'object',
            required: [ 'applicantName', 'usedOtherNames', 'dateOfBirth' ],
            properties: {
              applicantName: fullNameSchema('Applicant name'),
              usedOtherNames: {
                type: 'boolean',
                title: 'Have you used other names? (e.g., Birth name, Maiden, Previous marriage, Legal name changes)'
              },
              'view:additionalNames': {
                type: 'object',
                properties: {
                  fullBirthName: fullNameSchema('Birth name (if different than above)'),
                  otherNames: {
                    type: 'string',
                    title: 'List other names used (Last, First, Middle; one per line)'
                  }
                }
              },
              dateOfBirth: {
                type: 'string',
                title: 'Date of birth'
              },
              'view:placeOfBirth': {
                type: 'object',
                title: 'Place of birth',
                required: [ 'placeOfBirthCity', 'placeOfBirthStateOrCountry' ],
                properties: {
                  placeOfBirthCity: {
                    type: 'string',
                    title: 'City'
                  },
                  placeOfBirthStateOrCountry: {
                    type: 'string',
                    title: 'State or Country (no abbreviations)'
                  }
                }
              },
              previouslyFiledForSSN: {
                type: 'string',
                title: 'Has the applicant previously filed for a Social Security card?',
                'enum': [ 'Yes', 'No', 'Do not know' ]
              },
              'view:previouslyFiled': {
                type: 'object',
                title: 'Enter information from previous Social Security card',
                properties: {
                  previousSSN: SSNSchema(),
                  previousFullName: fullNameSchema('Name as shown on card'),
                  previousBirthDate: {
                    type: 'string'
                  }
                }
              }
            }
          },
          uiSchema: {
            dateOfBirth: currentOrPastDateUI('Date of birth'),
            usedOtherNames: {
              "ui:widget": 'yesNo',
              "ui:options": {
                expandUnderClassNames: "schemaform-expandUnder-indent"
              }
            },
            'view:additionalNames': {
              "ui:options": {
                 expandUnder: "usedOtherNames"
               },
               otherNames: {
                 'ui:widget': 'textarea',
               }
            },
            'view:previouslyFiled': {
              'ui:options': {
                expandUnder: 'previouslyFiledForSSN'
              },
              previousSSN: SSNErrorMessage(),
              previousBirthDate: currentOrPastDateUI('Date of birth (if different than entered above)')
            },
            'view:placeOfBirth': {
            }
          }
        }
      }
    },
    CP2: {
      title: "Applicant citizenship",
      pages: {
        PG2: {
          path: 'applicant-citizenship',
          title: 'Applicant citizenship',
          schema: {
            type: 'object',
            required: [ 'citizenship', 'sex', 'race' ],
            properties: {
              citizenship: {
                type: 'string',
                title: 'Citizenship',
                'enum': [
                  'U.S. Citizen',
                  'Legal alien allowed to work',
                  'Legal alien NOT allowed to work',
                  'Other'
                ]
              },
              sex: {
                type: 'string',
                title: 'Sex',
                'enum': [ 'Male', 'Female' ]
              },
              race: {
                type: 'string',
                title: 'Race',
                'enum': [
                  'White',
                  'Black/African American',
                  'Asian',
                  'American Indian',
                  'Alaska Native',
                  'Native Hawaiian',
                  'Other Pacific Islander'
                ]
              },
              hispanicOrLatino: {
                type: 'boolean',
                title: 'Are you Hispanic or Latino (Your response is optional)'
              },
              fullNameParent1: fullNameSchema('Birth Name of Parent/Mother'),
              ssnParent1: SSNSchema('Parent/Mother Social Security Number'),
              fullNameParent2: fullNameSchema('Birth Name of Parent/Father'),
              ssnParent2: SSNSchema('Parent/Father Social Security Number')
            }
          },
          uiSchema: {
            citizenship: {
              'ui:widget': 'radio'
            },
            sex: {
              'ui:widget': 'radio'
            },
            race: {
              'ui:widget': 'radio'
            },
            hispanicOrLatino: {
              'ui:widget': 'yesNo'
            },
            ssnParent1: SSNErrorMessage(),
            ssnParent2: SSNErrorMessage()
          }
        }
      }
    },
    CP3: {
      title: "Applicant contact information",
      pages: {
        PG3: {
          path: 'applicant-contact',
          title: 'Applicant contact information',
          schema: {
            type: 'object',
            required: [ 'address1', 'city', 'state', 'zip', 'phone' ],
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
              },
              phone: {
                type: 'string',
                title: 'Primary contact phone number',
                minLength: 10
              }
            }
          },
          uiSchema: {
            phone: {
              'ui:errorMessages': {
                minLength: 'Please enter a phone number, including area code'
              }
            },
            zip: {
              'ui:errorMessages': {
                pattern: 'Please enter a 5-digit zip code or 9-digit zip+4 code'
              }
            }
          }
        }
      }
    }
  }
};

export default formConfig;
