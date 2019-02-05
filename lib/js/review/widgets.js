'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxWidget = exports.yesNo = exports.RadioWidget = exports.TextareaWidget = exports.EmailWidget = undefined;
exports.TextWidget = TextWidget;
exports.DateWidget = DateWidget;
exports.SelectWidget = SelectWidget;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextWidget(_ref) {
  var value = _ref.value;

  return _react2.default.createElement(
    'span',
    null,
    value
  );
}

function DateWidget(_ref2) {
  var value = _ref2.value,
      options = _ref2.options;

  return _react2.default.createElement(
    'span',
    null,
    (0, _helpers.formatReviewDate)(value, options.monthYear)
  );
}

var EmailWidget = exports.EmailWidget = TextWidget;
var TextareaWidget = exports.TextareaWidget = TextWidget;

function SelectWidget(_ref3) {
  var options = _ref3.options,
      value = _ref3.value;
  var enumOptions = options.enumOptions,
      _options$labels = options.labels,
      labels = _options$labels === undefined ? {} : _options$labels;

  var selected = enumOptions.find(function (opt) {
    return opt.value === value;
  });
  if (selected) {
    return _react2.default.createElement(
      'span',
      null,
      labels[value] || selected.label
    );
  }

  return null;
}

var RadioWidget = exports.RadioWidget = SelectWidget;

var yesNo = exports.yesNo = function yesNo(_ref4) {
  var value = _ref4.value,
      _ref4$options = _ref4.options,
      options = _ref4$options === undefined ? {} : _ref4$options;
  var _options$yesNoReverse = options.yesNoReverse,
      yesNoReverse = _options$yesNoReverse === undefined ? false : _options$yesNoReverse,
      _options$labels2 = options.labels,
      labels = _options$labels2 === undefined ? {} : _options$labels2;

  var yesValue = !yesNoReverse;
  var noValue = !yesValue;

  var displayValue = void 0;
  if (value === yesValue) {
    displayValue = labels.Y || 'Yes';
  } else if (value === noValue) {
    displayValue = labels.N || 'No';
  }

  return _react2.default.createElement(
    'span',
    null,
    displayValue
  );
};

var CheckboxWidget = exports.CheckboxWidget = function CheckboxWidget(_ref5) {
  var value = _ref5.value;

  return _react2.default.createElement(
    'span',
    null,
    value === true ? 'True' : ''
  );
};
//# sourceMappingURL=widgets.js.map