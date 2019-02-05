"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormTitle;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormTitle(_ref) {
  var title = _ref.title,
      subTitle = _ref.subTitle;

  return _react2.default.createElement(
    "div",
    { className: "schemaform-title" },
    _react2.default.createElement(
      "h1",
      null,
      title
    ),
    subTitle && _react2.default.createElement(
      "div",
      { className: "schemaform-subtitle" },
      subTitle
    )
  );
}
//# sourceMappingURL=FormTitle.js.map