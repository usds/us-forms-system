'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewPage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _ui = require('../utilities/ui');

var _ReviewChapters = require('../review/ReviewChapters');

var _ReviewChapters2 = _interopRequireDefault(_ReviewChapters);

var _SubmitController = require('../review/SubmitController');

var _SubmitController2 = _interopRequireDefault(_SubmitController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scroller = _reactScroll2.default.scroller;

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
      (0, _ui.focusElement)('h4');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          formConfig = _props.formConfig,
          pageList = _props.pageList,
          path = _props.path;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ReviewChapters2.default, {
          formConfig: formConfig,
          pageList: pageList }),
        _react2.default.createElement(_SubmitController2.default, {
          formConfig: formConfig,
          pageList: pageList,
          path: path })
      );
    }
  }]);

  return ReviewPage;
}(_react2.default.Component);

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
  pageList: _propTypes2.default.array.isRequired,
  path: _propTypes2.default.string.isRequired,
  route: _propTypes2.default.shape({
    formConfig: _propTypes2.default.object.isRequired
  }).isRequired
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReviewPage));
exports.ReviewPage = ReviewPage;
//# sourceMappingURL=ReviewPage.js.map