'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ExpandingGroup;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Component that expands to show a hidden child element with a fade in/slide down animation
 *
 * Props:
 * children - expects 2 children, the first is always shown, the second is shown if open is true
 * open - determines if the second child is displayed
 * additionalClass - A string added as a class to the parent element of the second child
 * showPlus - Boolean to display a "+" or "-" icon based on open status
 */
function ExpandingGroup(_ref) {
  var children = _ref.children,
      open = _ref.open,
      showPlus = _ref.showPlus,
      additionalClass = _ref.additionalClass,
      expandedContentId = _ref.expandedContentId;

  var classNames = (0, _classnames2.default)('form-expanding-group', { 'form-expanding-group-open': open }, { 'form-expanding-group-plus': showPlus });

  return _react2.default.createElement(
    'div',
    { className: classNames },
    children[0],
    _react2.default.createElement(
      _CSSTransitionGroup2.default,
      { id: expandedContentId, transitionName: 'form-expanding-group-inner', transitionEnterTimeout: 700, transitionLeave: false },
      open ? _react2.default.createElement(
        'div',
        { key: 'removable-group', className: additionalClass },
        children[1]
      ) : null
    )
  );
}

ExpandingGroup.propTypes = {
  /**
   * show second child
   */
  open: _propTypes2.default.bool.isRequired,
  /**
   * class added to parent element second child component
   */
  additionalClass: _propTypes2.default.string,
  /**
   * show a + or - icon indicating second child's visibility
   */
  showPlus: _propTypes2.default.bool,
  /**
   * id for ReactCSSTransitionGroup
   */
  expandedContentId: _propTypes2.default.string
};
//# sourceMappingURL=ExpandingGroup.js.map