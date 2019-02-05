'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ExpandingGroup = require('../components/ExpandingGroup');

var _ExpandingGroup2 = _interopRequireDefault(_ExpandingGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RadioWidget(_ref) {
  var options = _ref.options,
      value = _ref.value,
      disabled = _ref.disabled,
      _onChange = _ref.onChange,
      id = _ref.id;
  var enumOptions = options.enumOptions,
      _options$labels = options.labels,
      labels = _options$labels === undefined ? {} : _options$labels,
      _options$nestedConten = options.nestedContent,
      nestedContent = _options$nestedConten === undefined ? {} : _options$nestedConten;

  // nested content could be a component or just jsx/text

  var content = nestedContent[value];
  if (typeof content === 'function') {
    var NestedContent = content;
    content = _react2.default.createElement(NestedContent, null);
  }

  return _react2.default.createElement(
    'div',
    null,
    enumOptions.map(function (option, i) {
      var checked = option.value === value;
      var radioButton = _react2.default.createElement(
        'div',
        { className: 'form-radio-buttons', key: option.value },
        _react2.default.createElement('input', { type: 'radio',
          checked: checked,
          id: id + '_' + i,
          name: '' + id,
          value: option.value,
          disabled: disabled,
          onChange: function onChange(_) {
            return _onChange(option.value);
          } }),
        _react2.default.createElement(
          'label',
          { htmlFor: id + '_' + i },
          labels[option.value] || option.label
        )
      );

      if (nestedContent[option.value]) {
        return _react2.default.createElement(
          _ExpandingGroup2.default,
          { open: checked, key: option.value },
          radioButton,
          _react2.default.createElement(
            'div',
            { className: 'schemaform-radio-indent' },
            content
          )
        );
      }

      return radioButton;
    })
  );
}
exports.default = RadioWidget;
//# sourceMappingURL=RadioWidget.js.map