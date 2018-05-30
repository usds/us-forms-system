var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Scroll from 'react-scroll';

import ReviewCollapsibleChapter from './ReviewCollapsibleChapter';
import { createPageListByChapter, expandArrayPages, getActiveChapters, getActivePages, getPageKeys } from '../helpers';
import { getReviewPageOpenChapters, getViewedPages } from '../state/selectors';
import { closeReviewChapter, openReviewChapter, setData, setEditMode, setViewedPages, uploadFile } from '../actions';

var scroller = Scroll.scroller;

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

      var viewedPages = new Set(getPageKeys(pageList, formData));
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


      return React.createElement(
        'div',
        { className: 'input-section' },
        React.createElement(
          'div',
          null,
          chapters.map(function (chapter) {
            return React.createElement(ReviewCollapsibleChapter, {
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
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.scrollToChapter = function (chapterKey) {
    scroller.scrollTo('chapter' + chapterKey + 'ScrollElement', window.VetsGov.scroll || {
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
  var openChapters = getReviewPageOpenChapters(state);
  var viewedPages = getViewedPages(state);

  var chapterNames = getActiveChapters(formConfig, formData);
  var pagesByChapter = createPageListByChapter(formConfig);
  var chapters = chapterNames.map(function (chapterName) {
    var pages = pagesByChapter[chapterName];

    var activePages = getActivePages(pages, formData);
    var expandedPages = expandArrayPages(activePages, formData);
    var chapterFormConfig = formConfig.chapters[chapterName];
    var open = openChapters.includes(chapterName);
    var pageKeys = getPageKeys(pages, formData);
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
  closeReviewChapter: closeReviewChapter,
  openReviewChapter: openReviewChapter,
  setData: setData,
  setEditMode: setEditMode,
  setViewedPages: setViewedPages,
  uploadFile: uploadFile
};

ReviewChapters.propTypes = {
  chapters: PropTypes.array.isRequired,
  closeReviewChapter: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  formConfig: PropTypes.object.isRequired,
  formContext: PropTypes.object,
  onSetData: PropTypes.func,
  openReviewChapter: PropTypes.func.isRequired,
  pageList: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  setViewedPages: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  viewedPages: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewChapters));

// for tests
export { ReviewChapters };