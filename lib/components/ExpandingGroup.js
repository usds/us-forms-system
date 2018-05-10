import PropTypes from 'prop-types';
import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import classnames from 'classnames';

/*
 * Component that expands to show a hidden child element with a fade in/slide down animation
 *
 * Props:
 * children - expects 2 children, the first is always shown, the second is shown if open is true
 * open - determines if the second child is displayed
 * additionalClass - A string added as a class to the parent element of the second child
 * showPlus - Boolean to display a "+" or "-" icon based on open status
 */
export default function ExpandingGroup(_ref) {
  var children = _ref.children,
      open = _ref.open,
      showPlus = _ref.showPlus,
      additionalClass = _ref.additionalClass,
      expandedContentId = _ref.expandedContentId;

  var classNames = classnames('form-expanding-group', { 'form-expanding-group-open': open }, { 'form-expanding-group-plus': showPlus });

  return React.createElement(
    'div',
    { className: classNames },
    children[0],
    React.createElement(
      ReactCSSTransitionGroup,
      { id: expandedContentId, transitionName: 'form-expanding-group-inner', transitionEnterTimeout: 700, transitionLeave: false },
      open ? React.createElement(
        'div',
        { key: 'removable-group', className: additionalClass },
        children[1]
      ) : null
    )
  );
}

ExpandingGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  additionalClass: PropTypes.string,
  showPlus: PropTypes.bool,
  expandedContentId: PropTypes.string
};