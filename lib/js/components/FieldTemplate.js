'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

exports.default = FieldTemplate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This is the template for each field (which in the schema library means label + widget)
 */

function FieldTemplate(props) {
  var id = props.id,
      schema = props.schema,
      help = props.help,
      required = props.required,
      rawErrors = props.rawErrors,
      children = props.children,
      formContext = props.formContext,
      uiSchema = props.uiSchema;


  var isTouched = formContext.touched[id] || Object.keys(formContext.touched).some(function (touched) {
    return id.startsWith(touched);
  });
  var hasErrors = (formContext.submitted || isTouched) && rawErrors && rawErrors.length;
  var requiredSpan = required ? _react2.default.createElement(
    'span',
    { className: 'schemaform-required-span' },
    '(*Required)'
  ) : null;
  var label = uiSchema['ui:title'] || props.label;
  var isDateField = uiSchema['ui:widget'] === 'date';
  var showFieldLabel = uiSchema['ui:options'] && uiSchema['ui:options'].showFieldLabel;
  var hideLabelText = uiSchema['ui:options'] && uiSchema['ui:options'].hideLabelText;
  var useLabelElement = showFieldLabel === 'label';

  var description = uiSchema['ui:description'];
  var textDescription = typeof description === 'string' ? description : null;
  var DescriptionField = typeof description === 'function' ? uiSchema['ui:description'] : null;
  var isFieldGroup = isDateField || uiSchema['ui:widget'] === 'yesNo' || uiSchema['ui:widget'] === 'radio';

  var errorSpanId = void 0;
  var errorSpan = void 0;
  var errorClass = void 0;
  if (hasErrors) {
    errorClass = isDateField ? 'input-error-date' : 'usa-input-error';
    errorSpanId = id + '-error-message';
    errorSpan = _react2.default.createElement(
      'span',
      { className: 'usa-input-error-message', role: 'alert', id: errorSpanId },
      _react2.default.createElement(
        'span',
        { className: 'sr-only' },
        'Error'
      ),
      ' ',
      rawErrors[0]
    );
  }

  var containerClassNames = (0, _classnames2.default)('schemaform-field-template', (0, _get3.default)(['ui:options', 'classNames'], uiSchema));
  var labelClassNames = (0, _classnames2.default)({
    'usa-input-error-label': hasErrors && !isDateField,
    'schemaform-label': true
  });

  var inputWrapperClassNames = (0, _classnames2.default)('schemaform-widget-wrapper', {
    'usa-input-error form-error-date': isDateField && hasErrors
  });

  var noWrapperContent = !showFieldLabel && (schema.type === 'object' || schema.type === 'array' || schema.type === 'boolean' && !uiSchema['ui:widget']);

  if (noWrapperContent) {
    return children;
  }

  var useFieldsetLegend = (isFieldGroup || !!showFieldLabel) && !useLabelElement;

  var labelElement = useFieldsetLegend ? _react2.default.createElement(
    'legend',
    { id: id + '-label', className: labelClassNames },
    label,
    requiredSpan
  ) : _react2.default.createElement(
    'label',
    { id: id + '-label', className: labelClassNames, htmlFor: id },
    label,
    requiredSpan
  );

  var content = _react2.default.createElement(
    'div',
    { className: errorClass },
    !hideLabelText && labelElement,
    textDescription && _react2.default.createElement(
      'p',
      null,
      textDescription
    ),
    DescriptionField && _react2.default.createElement(DescriptionField, { options: uiSchema['ui:options'] }),
    !textDescription && !DescriptionField && description,
    errorSpan,
    _react2.default.createElement(
      'div',
      { className: inputWrapperClassNames },
      children
    ),
    help
  );

  if (useFieldsetLegend) {
    return _react2.default.createElement(
      'fieldset',
      { className: containerClassNames },
      content
    );
  }

  return _react2.default.createElement(
    'div',
    { className: containerClassNames },
    content
  );
}
//# sourceMappingURL=FieldTemplate.js.map