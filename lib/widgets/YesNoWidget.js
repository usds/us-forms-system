export { YesNoWidget as default };
import React from 'react';

function YesNoWidget(_ref) {
  var id = _ref.id,
      value = _ref.value,
      disabled = _ref.disabled,
      _onChange = _ref.onChange,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? {} : _ref$options;
  var _options$yesNoReverse = options.yesNoReverse,
      yesNoReverse = _options$yesNoReverse === undefined ? false : _options$yesNoReverse,
      _options$labels = options.labels,
      labels = _options$labels === undefined ? {} : _options$labels;

  var yesValue = !yesNoReverse;
  var noValue = !yesValue;
  return React.createElement(
    "div",
    { className: "form-radio-buttons" },
    React.createElement("input", { type: "radio",
      autoComplete: "false",
      checked: value === yesValue,
      id: id + "Yes",
      name: "" + id,
      value: "Y",
      disabled: disabled,
      onChange: function onChange(_) {
        return _onChange(yesValue);
      } }),
    React.createElement(
      "label",
      { htmlFor: id + "Yes" },
      labels.Y || 'Yes'
    ),
    React.createElement("input", { type: "radio",
      autoComplete: "false",
      checked: value === noValue,
      id: id + "No",
      name: "" + id,
      value: "N",
      disabled: disabled,
      onChange: function onChange(_) {
        return _onChange(noValue);
      } }),
    React.createElement(
      "label",
      { htmlFor: id + "No" },
      labels.N || 'No'
    )
  );
}