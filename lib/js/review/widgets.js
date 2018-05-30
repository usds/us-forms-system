import React from 'react';
import { formatReviewDate } from '../helpers';

export function TextWidget(_ref) {
  var value = _ref.value;

  return React.createElement(
    'span',
    null,
    value
  );
}

export function DateWidget(_ref2) {
  var value = _ref2.value,
      options = _ref2.options;

  return React.createElement(
    'span',
    null,
    formatReviewDate(value, options.monthYear)
  );
}

export var EmailWidget = TextWidget;
export var TextareaWidget = TextWidget;

export function SelectWidget(_ref3) {
  var options = _ref3.options,
      value = _ref3.value;
  var enumOptions = options.enumOptions,
      _options$labels = options.labels,
      labels = _options$labels === undefined ? {} : _options$labels;

  var selected = enumOptions.find(function (opt) {
    return opt.value === value;
  });
  if (selected) {
    return React.createElement(
      'span',
      null,
      labels[value] || selected.label
    );
  }

  return null;
}

export var RadioWidget = SelectWidget;

export var yesNo = function yesNo(_ref4) {
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

  return React.createElement(
    'span',
    null,
    displayValue
  );
};

export var CheckboxWidget = function CheckboxWidget(_ref5) {
  var value = _ref5.value;

  return React.createElement(
    'span',
    null,
    value === true ? 'True' : ''
  );
};