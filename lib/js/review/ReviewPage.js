var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { focusElement } from '../utilities/ui';
import ReviewChapters from '../review/ReviewChapters';
import SubmitController from '../review/SubmitController';

var scroller = Scroll.scroller;

var scrollToTop = function scrollToTop() {
  scroller.scrollTo('topScrollElement', window.Forms.scroll || {
    duration: 500,
    delay: 0,
    smooth: true
  });
};

var ReviewPage = function (_React$Component) {
  _inherits(ReviewPage, _React$Component);

  function ReviewPage() {
    _classCallCheck(this, ReviewPage);

    return _possibleConstructorReturn(this, (ReviewPage.__proto__ || Object.getPrototypeOf(ReviewPage)).apply(this, arguments));
  }

  _createClass(ReviewPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      scrollToTop();
      focusElement('h4');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          formConfig = _props.formConfig,
          pageList = _props.pageList,
          path = _props.path;


      return React.createElement(
        'div',
        null,
        React.createElement(ReviewChapters, {
          formConfig: formConfig,
          pageList: pageList }),
        React.createElement(SubmitController, {
          formConfig: formConfig,
          pageList: pageList,
          path: path })
      );
    }
  }]);

  return ReviewPage;
}(React.Component);

function mapStateToProps(state, ownProps) {
  var route = ownProps.route;
  var formConfig = route.formConfig,
      pageList = route.pageList,
      path = route.path;


  return {
    formConfig: formConfig,
    pageList: pageList,
    path: path,
    route: route
  };
}

var mapDispatchToProps = {};

ReviewPage.propTypes = {
  pageList: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  route: PropTypes.shape({
    formConfig: PropTypes.object.isRequired
  }).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewPage));

export { ReviewPage };