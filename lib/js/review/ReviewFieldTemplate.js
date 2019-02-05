'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReviewFieldTemplate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This is the template for each field (which in the schema library means label + widget)
 */

function ReviewFieldTemplate(props) {
  var children = props.children,
      uiSchema = props.uiSchema,
      schema = props.schema;

  var label = uiSchema['ui:title'] || props.label;
  var description = uiSchema['ui:description'];
  var textDescription = typeof description === 'string' ? description : null;
  var DescriptionField = typeof description === 'function' ? uiSchema['ui:description'] : null;

  return schema.type === 'object' || schema.type === 'array' ? children : _react2.default.createElement(
    'div',
    { className: 'review-row' },
    _react2.default.createElement(
      'dt',
      null,
      label,
      textDescription && _react2.default.createElement(
        'p',
        null,
        textDescription
      ),
      DescriptionField && _react2.default.createElement(DescriptionField, { options: uiSchema['ui:options'] }),
      !textDescription && !DescriptionField && description
    ),
    _react2.default.createElement(
      'dd',
      null,
      children
    )
  );
}
//# sourceMappingURL=ReviewFieldTemplate.js.map