import _get from 'lodash/fp/get';
import _set from 'lodash/fp/set';
import _uniqueId from 'lodash/fp/uniqueId';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import Scroll from 'react-scroll';

import classNames from 'classnames';

import ProgressButton from '@department-of-veterans-affairs/formation/ProgressButton';

import { focusElement } from '../utilities/ui';
import SchemaForm from '../components/SchemaForm';
import { getArrayFields, getNonArraySchema } from '../helpers';
import ArrayField from './ArrayField';

var Element = Scroll.Element;
var scroller = Scroll.scroller;

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
        var newData = _set([path, index], formData, _this.props.form.data);
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
      this.id = _uniqueId();
    }
  }, {
    key: 'onChange',
    value: function onChange(formData) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var newData = formData;
      if (path) {
        newData = _set([path, index], formData, this.props.form.data);
      }
      this.props.setData(newData);
    }
  }, {
    key: 'focusOnPage',
    value: function focusOnPage(key) {
      var pageDiv = document.querySelector('#' + key);
      focusElement(pageDiv);
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
      scroller.scrollTo(key + 'ScrollElement', window.VetsGov.scroll || {
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
        pageContent = React.createElement(
          'div',
          { className: 'usa-accordion-content schemaform-chapter-accordion-content', 'aria-hidden': 'false' },
          ChapterDescription && React.createElement(ChapterDescription, {
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
              pageData = _get([page.arrayPath, page.index], form.data);
              arrayFields = [];
              fullPageKey = '' + page.pageKey + page.index;
            } else {
              editing = pageState.editMode;
              // TODO: support array fields inside of an array page?
              // Our pattern is to separate out array fields (growable tables) from
              // the normal page and display them separately. The review version of
              // ObjectField will hide them in the main section.
              arrayFields = getArrayFields(pageState, page);
              // This will be undefined if there are no fields other than an array
              // in a page, in which case we won’t render the form, just the array
              pageSchema = getNonArraySchema(pageState.schema, pageState.uiSchema);
              pageUiSchema = pageState.uiSchema;
              pageData = form.data;
              fullPageKey = page.pageKey;
            }

            var classes = classNames('form-review-panel-page', {
              'schemaform-review-page-warning': !viewedPages.has(fullPageKey)
            });

            return React.createElement(
              'div',
              { key: '' + fullPageKey, className: classes },
              React.createElement(Element, { name: fullPageKey + 'ScrollElement' }),
              pageSchema && React.createElement(
                SchemaForm,
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
                !editing ? React.createElement('div', null) : React.createElement(ProgressButton, {
                  submitButton: true,
                  buttonText: 'Update Page',
                  buttonClass: 'usa-button-primary' })
              ),
              arrayFields.map(function (arrayField) {
                return React.createElement(
                  'div',
                  { key: arrayField.path, className: 'form-review-array' },
                  React.createElement(ArrayField, {
                    pageKey: page.pageKey,
                    pageTitle: page.title,
                    arrayData: _get(arrayField.path, form.data),
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

      var classes = classNames('usa-accordion-bordered', 'form-review-panel', {
        'schemaform-review-chapter-warning': showUnviewedPageWarning
      });

      return React.createElement(
        'div',
        { id: this.id + '-collapsiblePanel', className: classes },
        React.createElement(Element, { name: 'chapter' + this.props.chapterKey + 'ScrollElement' }),
        React.createElement(
          'ul',
          { className: 'usa-unstyled-list' },
          React.createElement(
            'li',
            null,
            React.createElement(
              'div',
              { className: 'accordion-header clearfix schemaform-chapter-accordion-header' },
              React.createElement(
                'button',
                {
                  className: 'usa-button-unstyled',
                  'aria-expanded': this.props.open ? 'true' : 'false',
                  'aria-controls': 'collapsible-' + this.id,
                  onClick: this.props.toggleButtonClicked },
                chapterTitle
              ),
              showUnviewedPageWarning && React.createElement('span', { className: 'schemaform-review-chapter-warning-icon' })
            ),
            React.createElement(
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
}(React.Component);

// TODO: refactor to pass form.data instead of the entire form object


export default ReviewCollapsibleChapter;
ReviewCollapsibleChapter.propTypes = {
  chapterFormConfig: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
};