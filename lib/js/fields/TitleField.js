'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TitleField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TitleField(_ref) {
  var id = _ref.id,
      title = _ref.title;

  var isRoot = id === 'root__title';

  var classes = (0, _classnames2.default)('schemaform-block-title', {
    'schemaform-block-subtitle': !isRoot
  });

  return _react2.default.createElement(
    'legend',
    { className: classes, id: id },
    title
  );
}
//# sourceMappingURL=TitleField.js.map