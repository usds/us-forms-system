var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import TextWidget from './TextWidget';

export default function EmailWidget(props) {
  return React.createElement(TextWidget, _extends({ type: 'email' }, props));
}