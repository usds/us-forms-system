'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TextWidget = require('./TextWidget');

var _TextWidget2 = _interopRequireDefault(_TextWidget);

var _SelectWidget = require('./SelectWidget');

var _SelectWidget2 = _interopRequireDefault(_SelectWidget);

var _DateWidget = require('./DateWidget');

var _DateWidget2 = _interopRequireDefault(_DateWidget);

var _EmailWidget = require('./EmailWidget');

var _EmailWidget2 = _interopRequireDefault(_EmailWidget);

var _RadioWidget = require('./RadioWidget');

var _RadioWidget2 = _interopRequireDefault(_RadioWidget);

var _CheckboxWidget = require('./CheckboxWidget');

var _CheckboxWidget2 = _interopRequireDefault(_CheckboxWidget);

var _YesNoWidget = require('./YesNoWidget');

var _YesNoWidget2 = _interopRequireDefault(_YesNoWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widgets = {
  TextWidget: _TextWidget2.default,
  SelectWidget: _SelectWidget2.default,
  DateWidget: _DateWidget2.default,
  EmailWidget: _EmailWidget2.default,
  RadioWidget: _RadioWidget2.default,
  CheckboxWidget: _CheckboxWidget2.default,
  yesNo: _YesNoWidget2.default
};

exports.default = widgets;
//# sourceMappingURL=index.js.map