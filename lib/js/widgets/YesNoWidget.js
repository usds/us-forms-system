"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _react2.default.createElement(
    "div",
    { className: "form-radio-buttons" },
    _react2.default.createElement("input", { type: "radio",
      checked: value === yesValue,
      id: id + "Yes",
      name: "" + id,
      value: "Y",
      disabled: disabled,
      onChange: function onChange(_) {
        return _onChange(yesValue);
      } }),
    _react2.default.createElement(
      "label",
      { htmlFor: id + "Yes" },
      labels.Y || 'Yes'
    ),
    _react2.default.createElement("input", { type: "radio",
      checked: value === noValue,
      id: id + "No",
      name: "" + id,
      value: "N",
      disabled: disabled,
      onChange: function onChange(_) {
        return _onChange(noValue);
      } }),
    _react2.default.createElement(
      "label",
      { htmlFor: id + "No" },
      labels.N || 'No'
    )
  );
}
exports.default = YesNoWidget;
//# sourceMappingURL=YesNoWidget.js.map