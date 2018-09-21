import Introduction from '../components/Introduction.jsx';

import ssn from 'us-forms-system/lib/js/definitions/ssn';
import phoneUI from 'us-forms-system/lib/js/definitions/phone';
import dateUI from 'us-forms-system/lib/js/definitions/date';

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

const addressConfig = {
  schema: (isRequired = false) => {
    const requiredFields = ['address', 'city', 'state', 'zip'];
    return {
      type: 'object',
      required: isRequired ? requiredFields : [],
      properties: {
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
        state: {
          type: 'string',
          title: 'State',
          enum: [
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
          title: 'ZIP Code',
          pattern: '[0-9]{5}((-)?[0-9]{4})?'
        },
      }
    }
  },
  uiSchema: (label = 'Address') => {
    return {
      'ui:title': label,
      zip: {
        'ui:errorMessages': {
          pattern: 'Please enter a 5-digit zip code or 9-digit zip+4 code'
        }
      },
    }
  }
}

const dateSchema = {
  pattern: '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
  type: 'string'
}

const formConfig = {
  title: 'Request for Transcript of Tax Return',
  subTitle: 'Form 4506-T',
  formId: '',
  urlPrefix: '/',
  trackingPrefix: 'form-',
  transformForSubmit: '',
  submitUrl: '',
  introduction: Introduction,
  confirmation: '',
  defaultDefinitions: {
    fullNameConfig
  },
  chapters: {
    firstSection: {
      title: 'Personal Information',
      pages: {
        firstPerson: {
          path: 'personal-information/first-person',
          title: 'First Page',
          uiSchema: {
            firstFullName: Object.assign({}, fullNameConfig.uiSchema(), {
              'ui:title': 'Enter the name shown on your tax return.'
            }),
            firstSSN: ssn,
            'view:isJointReturn': {
              'ui:title': 'Did you file a joint return?',
              'ui:widget': 'yesNo'
            }
          },
          schema: {
            type: 'object',
            required: ['firstFullName', 'firstSSN'],
            properties: {
              firstFullName: fullNameConfig.schema(),
              firstSSN: {
                type: 'string',
                pattern: '^[0-9]{9}$'
              },
              'view:isJointReturn': {
                type: 'boolean'
              }
            }
          }
        },
        secondPerson: {
          path: 'personal-information/second-person',
          title: 'Second Person',
          depends: (formData) => formData['view:isJointReturn'],
          uiSchema: {
            secondFullName: Object.assign({}, fullNameConfig.uiSchema(), {
              'ui:title': 'Enter the second name shown on the joint return.',
            }),
            secondSSN: Object.assign({}, ssn, {
              'ui:title': 'Enter the second Social Security number on the joint return'
            })
          },
          schema: {
            type: 'object',
            required: ['secondFullName', 'secondSSN'],
            properties: {
              secondFullName: fullNameConfig.schema(),
              secondSSN: {
                type: 'string',
                pattern: '^[0-9]{9}$'
              }
            }
          }
        },
        currentAddress: {
          path: 'personal-information/current-address',
          title: 'Current Address',
          uiSchema: {
            currentAddress: addressConfig.uiSchema('Current address')
          },
          schema: {
            type: 'object',
            properties: {
              currentAddress: addressConfig.schema(true)
            }
          }
        },
        previousAddress: {
          path: 'personal-information/previous-address',
          title: 'Previous Address',
          uiSchema: {
            sameAddress: {
              'ui:title': 'Is your current address the same as the address on your last tax return?',
              'ui:widget': 'yesNo'
            },
            'view:previousAddressInformation': {
              'ui:options': {
                expandUnder: 'sameAddress',
                expandUnderCondition: false
              },
              previousAddress: addressConfig.uiSchema('Previous address')
            }
          },
          schema: {
            type: 'object',
            properties: {
              sameAddress: {
                type: 'boolean'
              },
              'view:previousAddressInformation': {
                type: 'object',
                properties: {
                  previousAddress: addressConfig.schema()
                }
              }
            }
          }
        }
      }
    },
    secondSection: {
      title: 'Third Party Information',
      pages: {
        sendingInformation: {
          path: 'third-party-information/sending-information',
          title: 'Are you sending information to a third party?',
          uiSchema: {
            sendingToThirdParty: {
              'ui:title': 'Is the transcript or tax information being sent to a third party?',
              'ui:description': 'Sometimes you may need to send your tax information to a third party, such as a mortgage company.',
              'ui:widget': 'yesNo'
            },
            'view:infoForThirdParty': {
              'ui:options': {
                expandUnder: 'sendingToThirdParty'
              },
              thirdPartyName: {
                'ui:title': 'Name of third party'
              },
              thirdPartyAddress: addressConfig.uiSchema('Third party address'),
              thirdPartyPhone: phoneUI('Third party phone number')
            }
          },
          schema: {
            type: 'object',
            properties: {
              sendingToThirdParty: {
                type: 'boolean'
              },
              'view:infoForThirdParty': {
                type: 'object',
                properties: {
                  thirdPartyName: {
                    type: 'string'
                  },
                  thirdPartyAddress: addressConfig.schema(true),
                  thirdPartyPhone: {
                    type: 'string',
                    minLength: 10
                  }
                }
              }
            }
          }
        },
        transcriptInformation: {
          path: 'third-party-information/transcript-information',
          title: 'Transcript information',
          depends: (formData) => formData['sendingToThirdParty'],
          uiSchema: {
            'ui:description': 'Once the IRS discloses your tax transcript to the third party, the IRS has no control over what the third party does with the information. If you would like to limit the third party’s authority to disclose your transcript information, you can specify this limitation in your written agreement with the third party.',
            taxFormNumber: {
              'ui:title': 'Enter the tax form number of the transcript you are requesting'
            },
            transcriptType: {
              'ui:title': 'Select the type of transcript you are requesting',
              'ui:widget': 'radio',
              'ui:options': {
                labels: {
                  returnTranscript: 'Return Transcript',
                  accountTranscript: 'Account Transcript',
                  recordOfAccount: 'Record of Account',
                  verificationOfNonfilling: 'Verification of Nonfilling',
                  otherFormSeriesTranscript: 'Form W-2, Form 1099 series, Form 1098 series, or Form 5498 series transcript'
                }
              }
            },
            requestingQuarterlyReturns: {
              'ui:title': 'Are you requesting a transcript related to quarterly tax returns (such as Form 941)?',
              'ui:widget': 'yesNo'
            },
            dateOfReturn: Object.assign({}, dateUI('End date of return'), {
              'ui:options': {
                expandUnder: 'requestingQuarterlyReturns',
                expandUnderCondition: false
              }
            }),
            quarterlyDatesOfReturn: {
              'ui:title': 'End dates of each quarter of the period of return',
              'ui:options': {
                expandUnder: 'requestingQuarterlyReturns'
              },
              firstQuarterDateOfReturn: Object.assign({}, dateUI('First quarter date of return')),
              secondQuarterDateOfReturn: Object.assign({}, dateUI('Second quarter date of return')),
              thirdQuarterDateOfReturn: Object.assign({}, dateUI('Third quarter date of return')),
              fourthQuarterDateOfReturn: Object.assign({}, dateUI('Fourth quarter date of return'))
            }
          },
          schema: {
            type: 'object',
            properties: {
              taxFormNumber: {
                type: 'string'
              },
              transcriptType: {
                type: 'string',
                enum: ['returnTranscript', 'accountTranscript', 'recordOfAccount', 'verificationOfNonfilling', 'otherFormSeriesTranscript']
              },
              requestingQuarterlyReturns: {
                type: 'boolean'
              },
              dateOfReturn: dateSchema,
              quarterlyDatesOfReturn: {
                type: 'object',
                properties: {
                  firstQuarterDateOfReturn: dateSchema,
                  secondQuarterDateOfReturn: dateSchema,
                  thirdQuarterDateOfReturn: dateSchema,
                  fourthQuarterDateOfReturn: dateSchema
                }
              }
            }
          }
        }
      }
    }
  }
};

export default formConfig;
