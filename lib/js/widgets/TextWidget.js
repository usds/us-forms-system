'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextWidget;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberTypes = new Set(['number', 'integer']);

function TextWidget(props) {
  var inputType = props.options.inputType;
  if (!inputType) {
    inputType = numberTypes.has(props.schema.type) ? 'number' : props.type;
  }
  return _react2.default.createElement('input', {
    autoComplete: props.options.autocomplete,
    type: inputType,
    id: props.id,
    name: props.id,
    disabled: props.disabled,
    maxLength: props.schema.maxLength,
    className: (0, _classnames2.default)(props.options.widgetClassNames),
    value: typeof props.value === 'undefined' ? '' : props.value,
    onBlur: function onBlur() {
      return props.onBlur(props.id);
    },
    onChange: function onChange(event) {
      return props.onChange(event.target.value ? event.target.value : undefined);
    } });
}
TextWidget.propTypes = {
  /**
   * ui:options from uiSchema
   */
  options: _propTypes2.default.shape({
    /*
    * input's autocomplete attribute value
    */
    autocomplete: _propTypes2.default.string
  })
};

TextWidget.defaultProps = {
  options: {},
  type: 'text'
};
//# sourceMappingURL=TextWidget.js.map