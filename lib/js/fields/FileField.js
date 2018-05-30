import _get from 'lodash/fp/get';
import _unset from 'lodash/fp/unset';
import _set from 'lodash/fp/set';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import PropTypes from 'prop-types';
import React from 'react';

import classNames from 'classnames';
import ProgressBar from '@department-of-veterans-affairs/formation/ProgressBar';

import { focusElement } from '../utilities/ui';

var FileField = function (_React$Component) {
  _inherits(FileField, _React$Component);

  function FileField(props) {
    _classCallCheck(this, FileField);

    var _this = _possibleConstructorReturn(this, (FileField.__proto__ || Object.getPrototypeOf(FileField)).call(this, props));

    _this.onAddFile = function (event) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (event.target.files && event.target.files.length) {
        var files = _this.props.formData || [];
        var idx = index;
        if (idx === null) {
          idx = files.length === 0 ? 0 : files.length;
        }
        _this.uploadRequest = _this.props.formContext.uploadFile(event.target.files[0], _this.props.uiSchema['ui:options'], _this.updateProgress, function (file) {
          _this.props.onChange(_set(idx, file, _this.props.formData || []));
          _this.uploadRequest = null;
        }, function () {
          _this.uploadRequest = null;
        });
      }
    };

    _this.onAttachmentIdChange = function (index, value) {
      if (!value) {
        _this.props.onChange(_unset([index, 'attachmentId'], _this.props.formData));
      } else {
        _this.props.onChange(_set([index, 'attachmentId'], value, _this.props.formData));
      }
    };

    _this.onAttachmentNameChange = function (index, value) {
      if (!value) {
        _this.props.onChange(_unset([index, 'name'], _this.props.formData));
      } else {
        _this.props.onChange(_set([index, 'name'], value, _this.props.formData));
      }
    };

    _this.updateProgress = function (progress) {
      _this.setState({ progress: progress });
    };

    _this.cancelUpload = function (index) {
      if (_this.uploadRequest) {
        _this.uploadRequest.abort();
      }
      _this.removeFile(index);
    };

    _this.removeFile = function (index) {
      var newFileList = _this.props.formData.filter(function (file, idx) {
        return index !== idx;
      });
      if (!newFileList.length) {
        _this.props.onChange();
      } else {
        _this.props.onChange(newFileList);
      }
    };

    _this.state = {
      progress: 0
    };
    return _this;
  }

  _createClass(FileField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var newFiles = newProps.formData || [];
      var files = this.props.formData || [];
      if (newFiles.length !== files.length) {
        focusElement('#' + newProps.idSchema.$id + '_add_label');
      }

      var isUploading = newFiles.some(function (file) {
        return file.uploading;
      });
      var wasUploading = files.some(function (file) {
        return file.uploading;
      });
      if (isUploading && !wasUploading) {
        this.setState({ progress: 0 });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          uiSchema = _props.uiSchema,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          formData = _props.formData,
          schema = _props.schema,
          formContext = _props.formContext,
          onBlur = _props.onBlur;


      var uiOptions = uiSchema['ui:options'];
      var files = formData || [];
      var maxItems = schema.maxItems || Infinity;
      var SchemaField = this.props.registry.fields.SchemaField;
      var attachmentIdRequired = schema.additionalItems.required ? schema.additionalItems.required.includes('attachmentId') : false;

      var isUploading = files.some(function (file) {
        return file.uploading;
      });
      var _uiOptions$buttonText = uiOptions.buttonText,
          buttonText = _uiOptions$buttonText === undefined ? 'Upload' : _uiOptions$buttonText;

      if (files.length > 0) buttonText = uiOptions.addAnotherLabel;

      return React.createElement(
        'div',
        { className: formContext.reviewMode ? 'schemaform-file-upload-review' : undefined },
        files.length > 0 && React.createElement(
          'ul',
          { className: 'schemaform-file-list' },
          files.map(function (file, index) {
            var errors = _get([index, '__errors'], errorSchema) || [];
            var hasErrors = errors.length > 0;
            var itemClasses = classNames('va-growable-background', {
              'schemaform-file-error usa-input-error': hasErrors && !file.uploading
            });
            var itemSchema = schema.items[index];
            var attachmentIdSchema = {
              $id: idSchema.$id + '_' + index + '_atachmentId'
            };
            var attachmentNameSchema = {
              $id: idSchema.$id + '_' + index + '_atachmentName'
            };
            var attachmentIdErrors = _get([index, 'attachmentId'], errorSchema);
            var attachmentNameErrors = _get([index, 'name'], errorSchema);

            return React.createElement(
              'li',
              { key: index, id: idSchema.$id + '_file_' + index, className: itemClasses },
              file.uploading && React.createElement(
                'div',
                { className: 'schemaform-file-uploading' },
                React.createElement(
                  'span',
                  null,
                  file.name
                ),
                React.createElement('br', null),
                React.createElement(ProgressBar, { percent: _this2.state.progress }),
                React.createElement(
                  'button',
                  { type: 'button', className: 'va-button-link', onClick: function onClick() {
                      _this2.cancelUpload(index);
                    } },
                  'Cancel'
                )
              ),
              !file.uploading && React.createElement(
                'p',
                null,
                uiOptions.itemDescription
              ),
              !file.uploading && React.createElement(
                'span',
                null,
                React.createElement(
                  'strong',
                  null,
                  file.name
                )
              ),
              !hasErrors && _get('properties.attachmentId', itemSchema) && React.createElement(
                'div',
                { className: 'schemaform-file-attachment' },
                React.createElement(SchemaField, {
                  name: 'attachmentId',
                  required: attachmentIdRequired,
                  schema: itemSchema.properties.attachmentId,
                  uiSchema: uiOptions.attachmentSchema,
                  errorSchema: attachmentIdErrors,
                  idSchema: attachmentIdSchema,
                  formData: formData[index].attachmentId,
                  onChange: function onChange(value) {
                    return _this2.onAttachmentIdChange(index, value);
                  },
                  onBlur: onBlur,
                  registry: _this2.props.registry,
                  disabled: _this2.props.disabled,
                  readonly: _this2.props.readonly })
              ),
              !hasErrors && uiOptions.attachmentName && React.createElement(
                'div',
                { className: 'schemaform-file-attachment' },
                React.createElement(SchemaField, {
                  name: 'attachmentName',
                  required: true,
                  schema: itemSchema.properties.name,
                  uiSchema: uiOptions.attachmentName,
                  errorSchema: attachmentNameErrors,
                  idSchema: attachmentNameSchema,
                  formData: formData[index].name,
                  onChange: function onChange(value) {
                    return _this2.onAttachmentNameChange(index, value);
                  },
                  onBlur: onBlur,
                  registry: _this2.props.registry,
                  disabled: _this2.props.disabled,
                  readonly: _this2.props.readonly })
              ),
              !file.uploading && hasErrors && React.createElement(
                'span',
                { className: 'usa-input-error-message' },
                errors[0]
              ),
              !file.uploading && React.createElement(
                'div',
                null,
                React.createElement(
                  'button',
                  { type: 'button', className: 'va-button-link', onClick: function onClick() {
                      _this2.removeFile(index);
                    } },
                  'Delete file'
                )
              )
            );
          })
        ),
        (maxItems === null || files.length < maxItems) && !isUploading && React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            {
              role: 'button',
              onKeyPress: function onKeyPress(e) {
                if (e.key === 'Enter') {
                  document.getElementById(idSchema.$id).click();
                }
              },
              tabIndex: '0',
              id: idSchema.$id + '_add_label',
              htmlFor: idSchema.$id,
              className: 'usa-button usa-button-secondary' },
            buttonText
          ),
          React.createElement('input', {
            type: 'file',
            accept: uiOptions.fileTypes.map(function (item) {
              return '.' + item;
            }).join(','),
            style: { display: 'none' },
            id: idSchema.$id,
            name: idSchema.$id,
            onChange: this.onAddFile })
        )
      );
    }
  }]);

  return FileField;
}(React.Component);

export default FileField;


FileField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  errorSchema: PropTypes.object,
  requiredSchema: PropTypes.object,
  idSchema: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  formData: PropTypes.array,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool
};