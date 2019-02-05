'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = EmailWidget;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextWidget = require('./TextWidget');

var _TextWidget2 = _interopRequireDefault(_TextWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EmailWidget(props) {
  return _react2.default.createElement(_TextWidget2.default, _extends({ type: 'email' }, props));
}
//# sourceMappingURL=EmailWidget.js.map