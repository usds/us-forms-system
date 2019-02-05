'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

var _onlyUpdateForKeys = require('recompose/onlyUpdateForKeys');

var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processValue(_ref, value) {
  var type = _ref.type;

  if (type === 'boolean') {
    return value === 'true';
  } else if (type === 'number') {
    return (0, _utils.asNumber)(value);
  }
  return value === '' ? undefined : value;
}

function getValue(event) {
  return event.target.value;
}

function SelectWidget(_ref2) {
  var schema = _ref2.schema,
      id = _ref2.id,
      options = _ref2.options,
      value = _ref2.value,
      required = _ref2.required,
      disabled = _ref2.disabled,
      readonly = _ref2.readonly,
      multiple = _ref2.multiple,
      _onChange = _ref2.onChange,
      _onBlur = _ref2.onBlur,
      placeholder = _ref2.placeholder;
  var enumOptions = options.enumOptions,
      _options$labels = options.labels,
      labels = _options$labels === undefined ? {} : _options$labels;

  return _react2.default.createElement(
    'select',
    {
      id: id,
      name: id,
      multiple: multiple,
      className: (0, _classnames2.default)(options.widgetClassNames),
      value: value || '',
      required: required,
      disabled: disabled,
      readOnly: readonly,
      onBlur: function onBlur(event) {
        var newValue = getValue(event, multiple);
        _onBlur(id, processValue(schema, newValue));
      },
      onChange: function onChange(event) {
        var newValue = getValue(event, multiple);
        _onChange(processValue(schema, newValue));
      } },
    !schema.default && _react2.default.createElement(
      'option',
      { value: '' },
      placeholder
    ),
    enumOptions.map(function (option, i) {
      return _react2.default.createElement(
        'option',
        { key: i, value: option.value },
        labels[option.value] || option.label
      );
    })
  );
}

exports.default = (0, _onlyUpdateForKeys2.default)(['id', 'value', 'schema'])(SelectWidget);
//# sourceMappingURL=SelectWidget.js.map