'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileConfig = undefined;

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _FileField = require('../fields/FileField');

var _FileField2 = _interopRequireDefault(_FileField);

var _validation = require('../validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function uiSchema(label) {
  var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    'ui:title': label,
    'ui:field': _FileField2.default,
    'ui:options': (0, _assign3.default)({
      fileTypes: ['pdf', 'jpg', 'jpeg', 'png'],
      maxSize: 20971520,
      minSize: 1024,
      createPayload: function createPayload(file, formId) {
        var payload = new FormData();
        payload.append('file', file);
        payload.append('form_id', formId);

        return payload;
      },
      parseResponse: function parseResponse(fileInfo) {
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
    'ui:validations': [_validation.validateFileField]
  };
}

var fileConfig = exports.fileConfig = {
  schema: schema,
  uiSchema: uiSchema
};
//# sourceMappingURL=file.js.map