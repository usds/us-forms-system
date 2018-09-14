'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewChapters = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _ReviewCollapsibleChapter = require('./ReviewCollapsibleChapter');

var _ReviewCollapsibleChapter2 = _interopRequireDefault(_ReviewCollapsibleChapter);

var _helpers = require('../helpers');

var _selectors = require('../state/selectors');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scroller = _reactScroll2.default.scroller;

var ReviewChapters = function (_React$Component) {
  _inherits(ReviewChapters, _React$Component);

  function ReviewChapters() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReviewChapters);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReviewChapters.__proto__ || Object.getPrototypeOf(ReviewChapters)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReviewChapters, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          formData = _props.formData,
          pageList = _props.pageList;

      var viewedPages = new Set((0, _helpers.getPageKeys)(pageList, formData));
      this.props.setViewedPages(viewedPages);
    }
  }, {
    key: 'handleToggleChapter',
    value: function handleToggleChapter(_ref2) {
      var name = _ref2.name,
          open = _ref2.open,
          pageKeys = _ref2.pageKeys;

      if (open) {
        this.props.closeReviewChapter(name, pageKeys);
      } else {
        this.props.openReviewChapter(name);
        this.scrollToChapter(name);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          chapters = _props2.chapters,
          form = _props2.form,
          formContext = _props2.formContext,
          setValid = _props2.setValid,
          viewedPages = _props2.viewedPages;


      return _react2.default.createElement(
        'div',
        { className: 'input-section' },
        _react2.default.createElement(
          'div',
          null,
          chapters.map(function (chapter) {
            return _react2.default.createElement(_ReviewCollapsibleChapter2.default, {
              expandedPages: chapter.expandedPages,
              chapterFormConfig: chapter.formConfig,
              chapterKey: chapter.name,
              form: form,
              formContext: formContext,
              key: chapter.name,
              onEdit: _this2.handleEdit,
              open: chapter.open,
              pageKeys: chapter.pageKeys,
              setData: function setData() {
                return _this2.handleSetData.apply(_this2, arguments);
              },
              setValid: setValid,
              showUnviewedPageWarning: chapter.showUnviewedPageWarning,
              toggleButtonClicked: function toggleButtonClicked() {
                return _this2.handleToggleChapter(chapter);
              },
              uploadFile: _this2.props.uploadFile,
              viewedPages: viewedPages });
          })
        )
      );
    }
  }]);

  return ReviewChapters;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.scrollToChapter = function (chapterKey) {
    scroller.scrollTo('chapter' + chapterKey + 'ScrollElement', window.Forms.scroll || {
      duration: 500,
      delay: 2,
      smooth: true
    });
  };

  this.handleEdit = function (pageKey, editing) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var fullPageKey = '' + pageKey + (index === null ? '' : index);
    if (editing) {
      _this3.props.setViewedPages([fullPageKey]);
    }
    _this3.props.setEditMode(pageKey, editing, index);
  };

  this.handleSetData = function () {
    var _props3;

    (_props3 = _this3.props).setData.apply(_props3, arguments);
    if (_this3.props.onSetData) {
      _this3.props.onSetData();
    }
  };
};

function mapStateToProps(state, ownProps) {
  // from ownprops
  var formConfig = ownProps.formConfig,
      formContext = ownProps.formContext,
      pageList = ownProps.pageList;

  // from redux state

  var form = state.form;
  var formData = state.form.data;
  var openChapters = (0, _selectors.getReviewPageOpenChapters)(state);
  var viewedPages = (0, _selectors.getViewedPages)(state);

  var chapterNames = (0, _helpers.getActiveChapters)(formConfig, formData);
  var pagesByChapter = (0, _helpers.createPageListByChapter)(formConfig);
  var chapters = chapterNames.map(function (chapterName) {
    var pages = pagesByChapter[chapterName];

    var expandedPages = (0, _helpers.getActiveExpandedPages)(pages, formData);
    var chapterFormConfig = formConfig.chapters[chapterName];
    var open = openChapters.includes(chapterName);
    var pageKeys = (0, _helpers.getPageKeys)(pages, formData);
    var showUnviewedPageWarning = pageKeys.some(function (key) {
      return !viewedPages.has(key);
    });

    return {
      expandedPages: expandedPages,
      formConfig: chapterFormConfig,
      name: chapterName,
      open: open,
      pageKeys: pageKeys,
      showUnviewedPageWarning: showUnviewedPageWarning
    };
  });

  return {
    chapters: chapters,
    form: form,
    formData: formData,
    formConfig: formConfig,
    formContext: formContext,
    pageList: pageList,
    viewedPages: viewedPages
  };
}

var mapDispatchToProps = {
  closeReviewChapter: _actions.closeReviewChapter,
  openReviewChapter: _actions.openReviewChapter,
  setData: _actions.setData,
  setEditMode: _actions.setEditMode,
  setViewedPages: _actions.setViewedPages,
  uploadFile: _actions.uploadFile
};

ReviewChapters.propTypes = {
  chapters: _propTypes2.default.array.isRequired,
  closeReviewChapter: _propTypes2.default.func.isRequired,
  form: _propTypes2.default.object.isRequired,
  formData: _propTypes2.default.object.isRequired,
  formConfig: _propTypes2.default.object.isRequired,
  formContext: _propTypes2.default.object,
  onSetData: _propTypes2.default.func,
  openReviewChapter: _propTypes2.default.func.isRequired,
  pageList: _propTypes2.default.array.isRequired,
  setData: _propTypes2.default.func.isRequired,
  setEditMode: _propTypes2.default.func.isRequired,
  setViewedPages: _propTypes2.default.func.isRequired,
  uploadFile: _propTypes2.default.func.isRequired,
  viewedPages: _propTypes2.default.object.isRequired
};

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReviewChapters));

// for tests

exports.ReviewChapters = ReviewChapters;
//# sourceMappingURL=ReviewChapters.js.map