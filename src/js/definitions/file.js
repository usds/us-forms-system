import _ from 'lodash/fp';

import FileField from '../fields/FileField';
import { validateFileField } from '../validation';

// const schema = {
//   type: 'array',
//   items: {
//     type: 'object',
//     properties: {
//       name: {
//         type: 'string'
//       },
//       size: {
//         type: 'integer'
//       },
//       confirmationCode: {
//         type: 'string'
//       }
//     }
//   }
// };

function schema() {
  return {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        size: {
          type: 'integer'
        },
        confirmationCode: {
          type: 'string'
        }
      }
    }
  };
}

function uiSchema(label, userOptions = {}) {
  return {
    'ui:title': label,
    'ui:field': FileField,
    'ui:options': _.assign({
      fileTypes: ['pdf', 'jpg', 'jpeg', 'png'],
      maxSize: 20971520,
      minSize: 1024,
      createPayload: (file, formId) => {
        const payload = new FormData();
        payload.append('file', file);
        payload.append('form_id', formId);

        return payload;
      },
      parseResponse: (fileInfo) => {
        return {
          name: fileInfo.data.attributes.name,
          size: fileInfo.data.attributes.size,
          confirmationCode: fileInfo.data.attributes.confirmationCode
        };
      },
      addAnotherLabel: 'Add Another',
      showFieldLabel: true,
      keepInPageOnReview: true,
      classNames: 'schemaform-file-upload'
    }, userOptions),
    'ui:errorMessages': {
      required: 'You must upload a file',
      minItems: 'You must upload a file'
    },
    'ui:validations': [
      validateFileField
    ]
  };
}

export const fileConfig = {
  schema,
  uiSchema
};
