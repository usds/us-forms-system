'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _uniqueId2 = require('lodash/fp/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ProgressButton = require('../components/ProgressButton');

var _ProgressButton2 = _interopRequireDefault(_ProgressButton);

var _ui = require('../utilities/ui');

var _SchemaForm = require('../components/SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _helpers = require('../helpers');

var _ArrayField = require('./ArrayField');

var _ArrayField2 = _interopRequireDefault(_ArrayField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = _reactScroll2.default.Element;
var scroller = _reactScroll2.default.scroller;

/*
 * Displays all the pages in a chapter on the review page
 */

var ReviewCollapsibleChapter = function (_React$Component) {
  _inherits(ReviewCollapsibleChapter, _React$Component);

  function ReviewCollapsibleChapter() {
    _classCallCheck(this, ReviewCollapsibleChapter);

    var _this = _possibleConstructorReturn(this, (ReviewCollapsibleChapter.__proto__ || Object.getPrototypeOf(ReviewCollapsibleChapter)).call(this));

    _this.handleSubmit = function (formData, key) {
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      // This makes sure defaulted data on a page with no changes is saved
      // Probably safe to do this for regular pages, too, but it hasn’t been necessary
      if (path) {
        var newData = (0, _set3.default)([path, index], formData, _this.props.form.data);
        _this.props.setData(newData);
      }

      _this.handleEdit(key, false, index);
    };

    _this.handleEdit = _this.handleEdit.bind(_this);
    return _this;
  }

  _createClass(ReviewCollapsibleChapter, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.id = (0, _uniqueId3.default)();
    }
  }, {
    key: 'onChange',
    value: function onChange(formData) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var newData = formData;
      if (path) {
        newData = (0, _set3.default)([path, index], formData, this.props.form.data);
      }
      this.props.setData(newData);
    }
  }, {
    key: 'focusOnPage',
    value: function focusOnPage(key) {
      var pageDiv = document.querySelector('#' + key);
      (0, _ui.focusElement)(pageDiv);
    }
  }, {
    key: 'handleEdit',
    value: function handleEdit(key, editing) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this.props.onEdit(key, editing, index);
      this.scrollToPage('' + key + (index === null ? '' : index));
      this.focusOnPage('' + key + (index === null ? '' : index));
    }
  }, {
    key: 'scrollToPage',
    value: function scrollToPage(key) {
      scroller.scrollTo(key + 'ScrollElement', window.Forms.scroll || {
        duration: 500,
        delay: 2,
        smooth: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pageContent = null;

      var _props = this.props,
          chapterFormConfig = _props.chapterFormConfig,
          expandedPages = _props.expandedPages,
          form = _props.form,
          formContext = _props.formContext,
          pageKeys = _props.pageKeys,
          showUnviewedPageWarning = _props.showUnviewedPageWarning,
          viewedPages = _props.viewedPages;


      var ChapterDescription = chapterFormConfig.reviewDescription;
      var chapterTitle = chapterFormConfig.title;
      if (typeof chapterFormConfig.title === 'function') {
        chapterTitle = chapterFormConfig.title(true);
      }
      if (chapterFormConfig.reviewTitle) {
        chapterTitle = chapterFormConfig.reviewTitle;
      }

      if (this.props.open) {
        pageContent = _react2.default.createElement(
          'div',
          { className: 'usa-accordion-content schemaform-chapter-accordion-content', 'aria-hidden': 'false' },
          ChapterDescription && _react2.default.createElement(ChapterDescription, {
            viewedPages: viewedPages,
            pageKeys: pageKeys,
            formData: form.data }),
          expandedPages.map(function (page) {
            var pageState = form.pages[page.pageKey];
            var pageSchema = void 0;
            var pageUiSchema = void 0;
            var pageData = void 0;
            var arrayFields = void 0;
            var editing = void 0;
            var fullPageKey = void 0;

            if (page.showPagePerItem) {
              editing = pageState.editMode[page.index];
              pageSchema = pageState.schema.properties[page.arrayPath].items[page.index];
              pageUiSchema = pageState.uiSchema[page.arrayPath].items;
              pageData = (0, _get3.default)([page.arrayPath, page.index], form.data);
              arrayFields = [];
              fullPageKey = '' + page.pageKey + page.index;
            } else {
              editing = pageState.editMode;
              // TODO: support array fields inside of an array page?
              // Our pattern is to separate out array fields (growable tables) from
              // the normal page and display them separately. The review version of
              // ObjectField will hide them in the main section.
              arrayFields = (0, _helpers.getArrayFields)(pageState, page);
              // This will be undefined if there are no fields other than an array
              // in a page, in which case we won’t render the form, just the array
              pageSchema = (0, _helpers.getNonArraySchema)(pageState.schema, pageState.uiSchema);
              pageUiSchema = pageState.uiSchema;
              pageData = form.data;
              fullPageKey = page.pageKey;
            }

            var classes = (0, _classnames2.default)('form-review-panel-page', {
              'schemaform-review-page-warning': !viewedPages.has(fullPageKey)
            });

            return _react2.default.createElement(
              'div',
              { key: '' + fullPageKey, className: classes },
              _react2.default.createElement(Element, { name: fullPageKey + 'ScrollElement' }),
              pageSchema && _react2.default.createElement(
                _SchemaForm2.default,
                {
                  name: page.pageKey,
                  title: page.reviewTitle || page.title,
                  data: pageData,
                  schema: pageSchema,
                  uiSchema: pageUiSchema,
                  hideHeaderRow: page.hideHeaderRow,
                  hideTitle: expandedPages.length === 1,
                  pagePerItemIndex: page.index,
                  onBlur: _this2.props.onBlur,
                  onEdit: function onEdit() {
                    return _this2.handleEdit(page.pageKey, !editing, page.index);
                  },
                  onSubmit: function onSubmit(_ref) {
                    var formData = _ref.formData;
                    return _this2.handleSubmit(formData, page.pageKey, page.arrayPath, page.index);
                  },
                  onChange: function onChange(formData) {
                    return _this2.onChange(formData, page.arrayPath, page.index);
                  },
                  uploadFile: _this2.props.uploadFile,
                  reviewMode: !editing,
                  formContext: formContext,
                  editModeOnReviewPage: page.editModeOnReviewPage },
                !editing ? _react2.default.createElement('div', null) : _react2.default.createElement(_ProgressButton2.default, {
                  submitButton: true,
                  buttonText: 'Update Page',
                  buttonClass: 'usa-button-primary' })
              ),
              arrayFields.map(function (arrayField) {
                return _react2.default.createElement(
                  'div',
                  { key: arrayField.path, className: 'form-review-array' },
                  _react2.default.createElement(_ArrayField2.default, {
                    pageKey: page.pageKey,
                    pageTitle: page.title,
                    arrayData: (0, _get3.default)(arrayField.path, form.data),
                    formData: form.data,
                    formContext: formContext,
                    pageConfig: page,
                    onBlur: _this2.props.onBlur,
                    schema: arrayField.schema,
                    uiSchema: arrayField.uiSchema,
                    setData: _this2.props.setData,
                    path: arrayField.path })
                );
              })
            );
          })
        );
      }

      var classes = (0, _classnames2.default)('usa-accordion-bordered', 'form-review-panel', {
        'schemaform-review-chapter-warning': showUnviewedPageWarning
      });

      return _react2.default.createElement(
        'div',
        { id: this.id + '-collapsiblePanel', className: classes },
        _react2.default.createElement(Element, { name: 'chapter' + this.props.chapterKey + 'ScrollElement' }),
        _react2.default.createElement(
          'ul',
          { className: 'usa-unstyled-list' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'div',
              { className: 'accordion-header clearfix schemaform-chapter-accordion-header' },
              _react2.default.createElement(
                'button',
                {
                  className: 'usa-button-unstyled',
                  'aria-expanded': this.props.open ? 'true' : 'false',
                  'aria-controls': 'collapsible-' + this.id,
                  onClick: this.props.toggleButtonClicked },
                chapterTitle
              ),
              showUnviewedPageWarning && _react2.default.createElement('span', { className: 'schemaform-review-chapter-warning-icon' })
            ),
            _react2.default.createElement(
              'div',
              { id: 'collapsible-' + this.id },
              pageContent
            )
          )
        )
      );
    }
  }]);

  return ReviewCollapsibleChapter;
}(_react2.default.Component);

// TODO: refactor to pass form.data instead of the entire form object


exports.default = ReviewCollapsibleChapter;
ReviewCollapsibleChapter.propTypes = {
  chapterFormConfig: _propTypes2.default.object.isRequired,
  form: _propTypes2.default.object.isRequired,
  onEdit: _propTypes2.default.func.isRequired
};
//# sourceMappingURL=ReviewCollapsibleChapter.js.map