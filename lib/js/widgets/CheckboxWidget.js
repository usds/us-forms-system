'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CheckboxWidget(_ref) {
  var id = _ref.id,
      value = _ref.value,
      required = _ref.required,
      disabled = _ref.disabled,
      label = _ref.label,
      _onChange = _ref.onChange,
      options = _ref.options;

  var requiredSpan = required ? _react2.default.createElement(
    'span',
    { className: 'form-required-span' },
    '*'
  ) : null;
  var widgetClasses = (0, _classnames2.default)('form-checkbox', options.widgetClassNames);
  return _react2.default.createElement(
    'div',
    { className: widgetClasses },
    _react2.default.createElement('input', {
      type: 'checkbox',
      id: id,
      name: id,
      checked: typeof value === 'undefined' ? false : value,
      required: required,
      disabled: disabled,
      onChange: function onChange(event) {
        return _onChange(event.target.checked);
      } }),
    _react2.default.createElement(
      'label',
      { className: 'schemaform-label', htmlFor: id },
      options.title || label,
      requiredSpan
    )
  );
}

exports.default = CheckboxWidget;
CheckboxWidget.defaultProps = {
  autofocus: false
};

CheckboxWidget.propTypes = {
  id: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  options: _propTypes2.default.object,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};
//# sourceMappingURL=CheckboxWidget.js.map