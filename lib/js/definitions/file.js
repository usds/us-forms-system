'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileSchema = undefined;

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

exports.default = fileUiSchema;

var _FileField = require('../fields/FileField');

var _FileField2 = _interopRequireDefault(_FileField);

var _validation = require('../validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fileUiSchema(label) {
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

// An example schema so we don’t forget it for now
var fileSchema = exports.fileSchema = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    properties: {
      fileName: {
        type: 'string'
      },
      fileSize: {
        type: 'integer'
      },
      confirmationNumber: {
        type: 'string'
      },
      errorMessage: {
        type: 'string'
      },
      uploading: {
        type: 'boolean'
      }
    }
  }
};